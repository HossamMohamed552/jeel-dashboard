<template>
  <validation-observer v-slot="{ invalid }" ref="addEditContentForm">
    <form @submit.prevent="goToMissionContentStep" class="mt-5">
      <b-row v-for="(learnPath,index) in learnPathsVideoPaperWokQuiz" :key="learnPath.id"
             class="hold-path">
        <b-col lg="12" class="mb-3">
          <h3>{{ learnPath.name }}</h3>
        </b-col>
        <b-col lg="6">
          <SelectSearch
            v-model="learnPath.videoIds"
            :label="$t('MISSIONS.videos')"
            :name="`${$t('MISSIONS.videos')}${index}`"
            :options="learnPath.videos"
            :reduce="(option) => option.id"
            :get-option-label="(option) => option.title"
            :rules="learnPath.slug !== 'behavior' ? 'required' : ''"
            :deselectFromDropdown="true"
            multiple
          ></SelectSearch>
        </b-col>
        <b-col lg="6">
          <SelectSearch
            v-model="learnPath.paperWorkIds"
            :label="$t('MISSIONS.paperWork')"
            :name="`${$t('MISSIONS.paperWork')}${index}`"
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
            :name="`${$t('MISSIONS.quizzes')}${index}`"
            :options="learnPath.quizzes"
            :reduce="(option) => option.id"
            :get-option-label="(option) => option.name"
            :rules="learnPath.slug !== 'behavior' ? 'required' : ''"
            :deselectFromDropdown="true"
            multiple
          ></SelectSearch>
        </b-col>
        <b-col class="mt-3" lg="6">
          <SelectSearch
            v-model="learnPath.tasksIds"
            :label="$t('MISSIONS.tasks')"
            :name="`${$t('MISSIONS.tasks')}${index}`"
            :options="learnPath.tasks"
            :reduce="(option) => option.id"
            :get-option-label="(option) => option.name"
            :rules="learnPath.slug !== 'behavior' ? 'required' : ''"
            :deselectFromDropdown="true"
            multiple
          ></SelectSearch>
        </b-col>
      </b-row>
      <b-row>
        <div class="action-holder">
          <Button @click="handleCancel" :custom-class="'cancel-btn margin'">
            {{ $t("GLOBAL_CANCEL") }}
          </Button>
          <div>
            <Button
              @click="handleBack"
              custom-class="submit-btn back-btn"
            >
              {{ $t("GLOBAL_BACK") }}
            </Button>
            <Button
              class="mx-3"
              type="submit"
              :loading="loading"
              :disabled="invalid"
              :custom-class="'submit-btn'"
            >
              {{ $t("GLOBAL_NEXT") }}
            </Button>
          </div>
        </div>
      </b-row>
    </form>
  </validation-observer>
</template>
<script>
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import {getVideoPerLevelPathMissionRequest, getVideoPerLevelPathRequest} from "@/api/videos";
import {getPaperWorkPerLevelPathRequest} from "@/api/paperWork";
import {getQuizLevelPathMissionRequest, getQuizLevelPathRequest} from "@/api/quiz";
import {getAudioPerLevelPathRequest} from "@/api/audios";
import Button from "@/components/Shared/Button/index.vue";
import {getSingleMissionsRequest} from "@/api/missios";
import {log} from "video.js";
import {mapGetters} from "vuex";

export default {
  name:"missionStepTwo",
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
      filterWith: {},
      lessonsSelectedWithEdit: []
    }
  },
  computed:{
    ...mapGetters(['learnPathsVideoPaperWokQuizStored','storedData'])
  },
  methods: {
    goToMissionContentStep() {
      this.$store.commit('SET_MISSION_STEP_ONE',[this.learnPathsVideoPaperWokQuiz,true])
      this.$emit("goToMissionContentStep", this.learnPathsVideoPaperWokQuiz)
    },
    handleCancel() {
      this.$store.commit('SET_MISSION_STEP_ONE', [null,false])
      this.$emit("handleCancel");
    },
    handleBack() {
      this.$emit("handleBack");
    },
  },
  async mounted() {
    if (this.$route.params.id) {
      this.watchLearningPathSelected = this.learningPathSelected
      this.ApiService(getSingleMissionsRequest(this.$route.params.id)).then((response) => {
        this.learnPathsVideoPaperWokQuiz = response.data.data.learningPaths
        this.lessonsSelectedWithEdit = this.lessonsSelected
        for (let lesson = 0; lesson < this.lessonsSelectedWithEdit.length; lesson++) {
          this.filterWith[`lessons[${lesson}]`] = this.lessonsSelectedWithEdit[lesson]
        }
      }).finally(() => {
        let learnPathsVideoPaperWokQuizWithFilter = this.learnPathsVideoPaperWokQuiz.filter(item => this.watchLearningPathSelected.map(itemMap => itemMap.id).includes(item.id))
        learnPathsVideoPaperWokQuizWithFilter.forEach((item) => {
          this.ApiService(getVideoPerLevelPathMissionRequest({
            learning_path_id: item.id,
            ...this.filterWith,
            'list_all': 'true'
          })).then((response) => {
            Object.assign(item, {
              videos: response.data.data,
              videoIds: [
                ...item.videos.map(item=> item.id)
                // ...item.videos.filter(itemData => this.lessonsSelectedWithEdit.includes(itemData?.lesson?.id)).map(item => item.id)
              ]
            })
          })
          this.ApiService(getPaperWorkPerLevelPathRequest({
            learning_path_id: item.id,
            ...this.filterWith,
            'list_all': 'true'

          })).then((response) => {
            Object.assign(item, {
              paperWorks: response.data.data,
              paperWorkIds: [
                ...item.papersWork.map(item=> item.id)
                // ...item.papersWork.filter(itemData => this.lessonsSelectedWithEdit.includes(itemData?.lesson?.id)).map(item => item.id)
              ]
            })
          })
          this.ApiService(getQuizLevelPathMissionRequest({
            learning_path_id: item.id,
            ...this.filterWith,
            'list_all': 'true'
          })).then((response) => {
            Object.assign(item, {
              quizzes: response.data.data,
              quizzesIds: [
                ...item.quizzes.map(item=> item.id)
                // ...item.quizzes.filter(itemData => {
                //   this.lessonsSelectedWithEdit.includes(...itemData.lessons)
                //   console.log('...itemData.lessons',...itemData.lessons)
                // }).map(item => item.id)
              ]
            })
          })
          this.ApiService(getAudioPerLevelPathRequest({
            learning_path_id: item.id,
            ...this.filterWith,
            'list_all': 'true'
          })).then((response) => {
            Object.assign(item, {
              tasks: response.data.data,
              tasksIds: [
                ...item.tasks.map(item=> item.id)
                // ...item.tasks.filter(itemData => this.lessonsSelectedWithEdit.includes(itemData?.lesson?.id)).map(item => item.id)
              ]
            })
          })
        })
        let learnPathsVideoPaperWokQuizWithOutFilter = this.watchLearningPathSelected.filter(item => !this.learnPathsVideoPaperWokQuiz.map(itemMap => itemMap.id).includes(item.id))
        learnPathsVideoPaperWokQuizWithOutFilter.forEach((item) => {
          this.ApiService(getVideoPerLevelPathMissionRequest({
            learning_path_id: item.id,
            ...this.filterWith,
            'list_all': 'true'
          })).then((response) => {
            Object.assign(item, {
              videos: response.data.data,
              videoIds: []
            })
          })
          this.ApiService(getPaperWorkPerLevelPathRequest({
            learning_path_id: item.id,
            ...this.filterWith,
            'list_all': 'true'
          })).then((response) => {
            Object.assign(item, {
              paperWorks: response.data.data,
              paperWorkIds: []
            })
          })
          this.ApiService(getQuizLevelPathMissionRequest({
            learning_path_id: item.id,
            ...this.filterWith,
            'list_all': 'true'
          })).then((response) => {
            Object.assign(item, {
              quizzes: response.data.data,
              quizzesIds: []
            })
          })
          this.ApiService(getAudioPerLevelPathRequest({
            learning_path_id: item.id,
            ...this.filterWith,
            'list_all': 'true'
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
          //   Object.assign(item, {quizzes: response.data.data, tasksIds: []})
          // })
        })
        this.learnPathsVideoPaperWokQuiz = [...learnPathsVideoPaperWokQuizWithFilter, ...learnPathsVideoPaperWokQuizWithOutFilter]
      })
    } else {
      this.lessonsSelectedWithEdit = this.lessonsSelected
      this.watchLearningPathSelected = this.learningPathSelected
      let collectArray = []
      for (let lesson = 0; lesson < this.lessonsSelectedWithEdit.length; lesson++) {
        this.filterWith[`lessons[${lesson}]`] = this.lessonsSelectedWithEdit[lesson]
      }
      if (!this.storedData){
        this.watchLearningPathSelected.forEach((item) => {
          this.ApiService(getVideoPerLevelPathMissionRequest({
            learning_path_id: item.id,
            ...this.filterWith,
            'list_all': 'true'
          })).then((response) => {
            Object.assign(item, {
              videos: response.data.data,
              videoIds: []
            })
          })
          this.ApiService(getPaperWorkPerLevelPathRequest({
            learning_path_id: item.id,
            ...this.filterWith,
            'list_all': 'true'
          })).then((response) => {
            Object.assign(item, {
              paperWorks: response.data.data,
              paperWorkIds: []
            })
          })
          this.ApiService(getQuizLevelPathMissionRequest({
            learning_path_id: item.id,
            ...this.filterWith,
            'list_all': 'true'
          })).then((response) => {
            Object.assign(item, {
              quizzes: response.data.data,
              quizzesIds: []
            })
          })
          this.ApiService(getAudioPerLevelPathRequest({
            learning_path_id: item.id,
            ...this.filterWith,
            'list_all': 'true'
          })).then((response) => {
            Object.assign(item, {
              tasks: response.data.data,
              tasksIds: []
            })
          })
          collectArray.push(item)
        })
      }
      if (this.storedData){
        this.learnPathsVideoPaperWokQuiz = this.learnPathsVideoPaperWokQuizStored
      } else {
        this.learnPathsVideoPaperWokQuiz = collectArray
      }

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
