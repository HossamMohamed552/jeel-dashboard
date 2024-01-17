<template>
  <validation-observer v-slot="{ invalid }" ref="addEditContentForm">
    <form @submit.prevent="goToMissionContentStep" class="mt-5">
      <b-row v-for="learnPath in learnPathsVideoPaperWokQuiz" :key="learnPath.id"
             class="hold-path">
        <b-col lg="12" class="mb-3">
          <h3>{{ learnPath.name }}</h3>
        </b-col>
        <b-col lg="6">
          <SelectSearch
            v-model="learnPath.videoIds"
            :label="$t('MISSIONS.videos')"
            :name="$t('MISSIONS.videos')"
            :options="learnPath.videos"
            :reduce="(option) => option.id"
            :get-option-label="(option) => option.title"
            :rules="'required'"
            :deselectFromDropdown="true"
            multiple
          ></SelectSearch>
        </b-col>
        <b-col lg="6">
          <SelectSearch
            v-model="learnPath.paperWorkIds"
            :label="$t('MISSIONS.paperWork')"
            :name="$t('MISSIONS.paperWork')"
            :options="learnPath.paperWorks"
            :reduce="(option) => option.id"
            :get-option-label="(option) => option.name"
            :rules="'required'"
            :deselectFromDropdown="true"
            multiple
          ></SelectSearch>
        </b-col>
        <b-col class="mt-3" lg="6">
          <SelectSearch
            v-model="learnPath.quizzesIds"
            :label="$t('MISSIONS.quizzes')"
            :name="$t('MISSIONS.quizzes')"
            :options="learnPath.quizzes"
            :reduce="(option) => option.id"
            :get-option-label="(option) => option.name"
            :rules="'required'"
            :deselectFromDropdown="true"
            multiple
          ></SelectSearch>
        </b-col>
        <b-col class="mt-3" lg="6">
          <SelectSearch
            v-model="learnPath.tasksIds"
            :label="$t('MISSIONS.tasks')"
            :name="$t('MISSIONS.tasks')"
            :options="learnPath.tasks"
            :reduce="(option) => option.id"
            :get-option-label="(option) => option.name"
            :rules="'required'"
            :deselectFromDropdown="true"
            multiple
          ></SelectSearch>
        </b-col>
      </b-row>
      <b-row>
        <div class="action-holder">
          <div>
            <Button
              type="submit"
              :loading="loading"
              :disabled="invalid"
              :custom-class="'submit-btn'"
            >
              {{ $t("GLOBAL_NEXT") }}
            </Button>
            <Button
              class="mx-3"
              @click="handleBack"
              custom-class="submit-btn back-btn"
            >
              {{ $t("GLOBAL_BACK") }}
            </Button>
          </div>
          <Button @click="handleCancel" :custom-class="'cancel-btn margin'">
            {{ $t("GLOBAL_CANCEL") }}
          </Button>
        </div>
      </b-row>
    </form>
  </validation-observer>
</template>
<script>
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import {getVideoPerLevelPathRequest} from "@/api/videos";
import {getPaperWorkPerLevelPathRequest} from "@/api/paperWork";
import {getQuizLevelPathRequest} from "@/api/quiz";
import {getAudioPerLevelPathRequest} from "@/api/audios";
import Button from "@/components/Shared/Button/index.vue";
import {getSingleMissionsRequest} from "@/api/missios";

export default {
  name: "index",
  components: {
    Button,
    SelectSearch,
  },
  props: {
    learningPathSelected: {
      type: Array,
      default() {
        return []
      }
    },
    level: {
      type: Number,
      default: 0
    },
    term: {
      type: Number,
      default: 0
    },
    lessonsSelected: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      collectArray: [],
      loading: false,
      watchLearningPathSelected: [],
      learnPathsVideoPaperWokQuiz: [],
      filterWith: {}
    }
  },
  methods: {
    goToMissionContentStep() {
      this.$emit("goToMissionContentStep", this.learnPathsVideoPaperWokQuiz)
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    handleBack() {
      this.$emit("handleBack");
    },
  },
  mounted() {
    if (this.$route.params.id) {
      this.watchLearningPathSelected = this.learningPathSelected
      this.ApiService(getSingleMissionsRequest(this.$route.params.id)).then((response) => {
        this.learnPathsVideoPaperWokQuiz = response.data.data.learningpaths
        this.levelMission = response.data.data.level
      }).finally(() => {
        let learnPathsVideoPaperWokQuizWithFilter = this.learnPathsVideoPaperWokQuiz.filter(item => this.watchLearningPathSelected.map(itemMap => itemMap.id).includes(item.id))
        learnPathsVideoPaperWokQuizWithFilter.forEach((item) => {
          this.ApiService(getVideoPerLevelPathRequest({
            // levelId: this.levelMission.id,
            learnPathId: item.id,
            // termId: this.term
          })).then((response) => {
            Object.assign(item, {
              videos: response.data.data.filter(itemData => this.lessonsSelected.includes(itemData.lesson.id)),
              videoIds: [...item.videos.filter(itemData => this.lessonsSelected.includes(itemData.lesson.id)).map(item => item.id)]
            })
          })
          this.ApiService(getPaperWorkPerLevelPathRequest({
            // levelId: this.levelMission.id,
            learnPathId: item.id,
            // termId: this.term
          })).then((response) => {
            Object.assign(item, {
              paperWorks: response.data.data.filter(itemData => this.lessonsSelected.includes(itemData.lesson.id)),
              paperWorkIds: [...item.papersWork.filter(itemData => this.lessonsSelected.includes(itemData.lesson.id)).map(item => item.id)]
            })
          })
          this.ApiService(getQuizLevelPathRequest({
            // levelId: this.levelMission.id,
            learnPathId: item.id,
            // termId: this.term
          })).then((response) => {
            Object.assign(item, {
              quizzes: response.data.data.filter(itemData => this.lessonsSelected.includes(itemData?.lesson?.id)),
              quizzesIds: [...item.quizzes.filter(itemData => this.lessonsSelected.includes(itemData?.lesson?.id)).map(item => item.id)]
            })
          })
          this.ApiService(getAudioPerLevelPathRequest({
            // levelId: this.levelMission.id,
            learnPathId: item.id,
            // termId: this.term
          })).then((response) => {
            Object.assign(item, {
              tasks: response.data.data.filter(itemData => this.lessonsSelected.includes(itemData?.lesson?.id)),
              tasksIds: [...item.tasks.filter(itemData => this.lessonsSelected.includes(itemData?.lesson?.id)).map(item => item.id)]
            })
          })
          // this.ApiService(getAudioPerLevelPathRequest({
          //   // levelId: this.levelMission.id,
          //   learnPathId: item.id,
          //   // termId: this.term
          // })).then((response) => {
          //   Object.assign(item, {
          //     audio: response.data.data,
          //     tasksIds: [...item.quizzes.map(item => item.id)]
          //   })
          // })
        })
        let learnPathsVideoPaperWokQuizWithOutFilter = this.watchLearningPathSelected.filter(item => !this.learnPathsVideoPaperWokQuiz.map(itemMap => itemMap.id).includes(item.id))
        learnPathsVideoPaperWokQuizWithOutFilter.forEach((item) => {
          this.ApiService(getVideoPerLevelPathRequest({
            // levelId: this.level,
            learnPathId: item.id,
            // termId: this.term
          })).then((response) => {
            Object.assign(item, {
              videos: response.data.data.filter(itemData => this.lessonsSelected.includes(itemData.lesson.id)),
              videoIds: []
            })
          })
          this.ApiService(getPaperWorkPerLevelPathRequest({
            // levelId: this.level,
            learnPathId: item.id,
            // termId: this.term
          })).then((response) => {
            Object.assign(item, {
              paperWorks: response.data.data.filter(itemData => this.lessonsSelected.includes(itemData.lesson.id)),
              paperWorkIds: []
            })
          })
          this.ApiService(getQuizLevelPathRequest({
            // levelId: this.level,
            learnPathId: item.id,
            // termId: this.term
          })).then((response) => {
            Object.assign(item, {
              quizzes: response.data.data.filter(itemData => this.lessonsSelected.includes(itemData?.lesson?.id)),
              quizzesIds: []
            })
          })
          this.ApiService(getAudioPerLevelPathRequest({
            // levelId: this.level,
            learnPathId: item.id,
            // termId: this.term
          })).then((response) => {
            Object.assign(item, {
              quizzes: response.data.data.filter(itemData => this.lessonsSelected.includes(itemData?.lesson?.id)),
              tasksIds: []
            })
          })
          this.ApiService(getAudioPerLevelPathRequest({
            // levelId: this.level,
            learnPathId: item.id,
            // termId: this.term
          })).then((response) => {
            Object.assign(item, {quizzes: response.data.data, tasksIds: []})
          })
        })
        this.learnPathsVideoPaperWokQuiz = [...learnPathsVideoPaperWokQuizWithFilter, ...learnPathsVideoPaperWokQuizWithOutFilter]
      })
    } else {
      this.watchLearningPathSelected = this.learningPathSelected
      let collectArray = []
      for (let lesson = 0; lesson < this.lessonsSelected.length; lesson++) {
        this.filterWith[`lessons[${lesson}]`] = this.lessonsSelected[lesson]
      }
      this.watchLearningPathSelected.forEach((item) => {
        this.ApiService(getVideoPerLevelPathRequest({
          // levelId: this.level,
          learnPathId: item.id,
          ...this.filterWith,
          'list_all': 'true'
          // termId: this.term
        })).then((response) => {
          Object.assign(item, {
            videos: response.data.data,
            videoIds: []
          })
        })
        this.ApiService(getPaperWorkPerLevelPathRequest({
          // levelId: this.level,
          learnPathId: item.id,
          ...this.filterWith,
          'list_all': 'true'
          // termId: this.term
        })).then((response) => {
          Object.assign(item, {
            paperWorks: response.data.data,
            paperWorkIds: []
          })
        })
        this.ApiService(getQuizLevelPathRequest({
          // levelId: this.level,
          learnPathId: item.id,
          ...this.filterWith,
          'list_all': 'true'
          // termId: this.term
        })).then((response) => {
          // let lessonsId = response.data.data.map((item)=>{
          //   return item.lessons.map((ids)=>{
          //     return ids.id
          //   })
          // })
          Object.assign(item, {
            quizzes: response.data.data,
            quizzesIds: []
          })
        })
        this.ApiService(getAudioPerLevelPathRequest({
          // levelId: this.level,
          learnPathId: item.id,
          ...this.filterWith,
          'list_all': 'true'
          // termId: this.term
        })).then((response) => {
          Object.assign(item, {
            tasks: response.data.data,
            tasksIds: []
          })
        })
        // this.ApiService(getAudioPerLevelPathRequest({
        //   // levelId: this.level,
        //   learnPathId: item.id,
        //   // termId: this.term
        // })).then((response) => {
        //   Object.assign(item, {tasks: response.data.data, tasksIds: []})
        // })
        collectArray.push(item)
      })
      this.learnPathsVideoPaperWokQuiz = collectArray
    }
  }
}
</script>
<style scoped lang="scss">
@import "./index";

::v-deep {
  .vs__dropdown-option--deselect, .vs__dropdown-option--selected {
    background: #76236C !important;
    color: #fff;
  }
}
</style>
