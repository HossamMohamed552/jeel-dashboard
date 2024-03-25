<template>
  <section class="container-fluid custom-container">
    <div class="show-role">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">{{ $t("superMission.missionDetail") }}</h2>
          </b-col>
        </b-row>
        <b-row class="divider mb-4">
          <b-col lg="3">
            <ShowItem
              :title="$t('superMission.missionName')"
              :subtitle="missionDetail.name"
            />
          </b-col>
          <b-col lg="3" v-if="missionDetail.start_date">
            <ShowItem
              :title="$t('superMission.startDate')"
              :subtitle="new Date(missionDetail.start_date).toISOString().slice(0, 10)"
            />
          </b-col>
          <b-col lg="3" v-if="missionDetail.end_date">
            <ShowItem
              :title="$t('superMission.endDate')"
              :subtitle="new Date(missionDetail.end_date).toISOString().slice(0, 10)"
            />
          </b-col>
        </b-row>
        <b-row class="divider mb-4">
          <b-col lg="3">
            <ShowItem
              :title="$t('superMission.range')"
              :subtitle="`${missionDetail.data_range} يوم`"
            />
          </b-col>
          <b-col lg="3">
            <ShowItem :title="$t('superMission.status')"/>
            <b-form-checkbox v-model="missionDetail.is_selected" switch
                             :disabled="true"></b-form-checkbox>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="12">
            <ShowItem
              :title="$t('superMission.description')"
              :subtitle="missionDetail.description"
            />
          </b-col>
        </b-row>
        <b-row class="mt-5">
          <b-col lg="12">
            <ShowItem :title="$t('superMission.learningPath')"/>
          </b-col>
          <b-col lg="12">
            <div class="learning-path" v-for="learningPath in learningPaths"
                 :key="`learningPath ${learningPath.id}`">
              <div class="learning-path-header" @click="toggleContent(learningPath)">
                <p>{{ learningPath.name }}</p>
                <button class="show-hide"><img
                  :src="learningPath.is_selected === true? require('@/assets/images/icons/minus.png') : require('@/assets/images/icons/plus.png')">
                </button>
              </div>
              <div v-if="learningPath.is_selected">
                <div class="learning-path-tabs">
                  <div @click.stop="activeTap = 1" :class="activeTap === 1 ? 'active' : ''"
                       class="tap">
                    التسجيلات الصوتية
                  </div>
                  <div @click.stop="activeTap = 2" :class="activeTap === 2 ? 'active' : ''"
                       class="tap">
                    أوراق العمل
                  </div>
                </div>
                <div class="content">
                  <div class="row">
                    <div class="col-12 px-0 paper-work" v-show="activeTap === 1">
                      <ListItems
                        class="m-0 py-0"
                        :tableItems="contentLearningPath.tasks"
                        :notHidePagination="false"
                        :showSortControls="false"
                        :fields-list="tasksFieldsList"
                        :showDownloadBtn="true"
                        @detailItemCorrection="detailItemCorrection($event)"
                      >
                      </ListItems>
                    </div>
                    <div class="col-12 px-0 paper-work" v-show="activeTap === 2">
                      <ListItems
                        class="m-0 py-0"
                        :tableItems="contentLearningPath.papersWork"
                        :notHidePagination="false"
                        :showSortControls="false"
                        :fields-list="paperWorkFieldsList"
                        :showDownloadBtn="true"
                        @detailItemCorrection="detailItemCorrection($event)"
                      >
                      </ListItems>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </div>
    </div>
    <GeneralModal :id="'holdContent'" :size="'lg'" :hide-header="true">
      <template #modalBody>
        <div class="p-3">
          <div v-if="activeTap === 1" class="title-content">
            تصحيح التسجيل الصوتى
          </div>
          <div v-else>تصحيح ورقة العمل</div>
          <b-row>
            <b-col lg="12" v-if="activeTap === 1">
              <AudioFakePlayer :url="detail?.task_audio_student" :with-background="true"/>
            </b-col>
            <b-col lg="12" v-else>
              <img :src="detail?.paper_work_student" class="paperwork-img">
            </b-col>
            <b-col lg="12">
              <h2 class="title" v-if="activeTap === 1">درجة التسجيل الصوتي</h2>
              <h2 class="title" v-else>درجة ورقة العمل</h2>
              <p class="subtitle">{{ detail.note }}</p>
            </b-col>
          </b-row>
          <validation-observer v-slot="{ invalid }" ref="correctionForm">
            <form @submit.prevent="onSubmit">
              <b-row>
                <b-col lg="2">
                  <TextField
                    :custom-class="'altLabel'"
                    v-model="detail.final_degree"
                    :label="$t('teacher.final_degree')"
                    :name="$t('teacher.final_degree')"
                    :placeholder="$t('teacher.final_degree')"
                    disabled="disabled"
                    :rules="'required'"
                  ></TextField>
                </b-col>
                <b-col lg="3">
                  <TextField
                    :custom-class="'altLabel'"
                    v-model="correctionObject.student_final_degree"
                    :label="$t('teacher.student_degree')"
                    :name="$t('teacher.student_degree')"
                    :placeholder="$t('teacher.student_degree_placeholder')"
                    :rules="`required|numeric|max_value:${detail.final_degree}`"
                  ></TextField>
                </b-col>
                <b-col lg="5">
                  <TextField
                    :custom-class="'altLabel'"
                    v-model="correctionObject.note"
                    :label="$t('teacher.note')"
                    :name="$t('teacher.note')"
                    :placeholder="$t('teacher.note_placeholder')"
                    :rules="'required'"
                  ></TextField>
                </b-col>
                <b-col lg="2" class="d-flex justify-content-center align-items-center">
                  <button  type="submit" :loading="loading" :disabled="invalid" class="save-btn">
                    {{ $t("GLOBAL_SAVE") }}
                  </button>
                </b-col>
              </b-row>
            </form>
          </validation-observer>
        </div>
      </template>
    </GeneralModal>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import ListItems from "@/components/ListItems/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import {
  correctionPaperWork,
  correctionTask,
  getDetailMissionsWithLearningPathsForTeacher
} from "@/api/teacher-module";
import AudioFakePlayer from "@/components/Shared/AudioFakePlayer/index.vue";
import GeneralModal from "@/components/Shared/GeneralModal/index.vue";
import TextField from "@/components/Shared/TextField/index.vue";

export default {
  name: "index",
  components: {TextField, GeneralModal, AudioFakePlayer, Button, ListItems, ShowItem},
  data() {
    return {
      missionDetail: {},
      learningPaths: [],
      firstLearningPathId: null,
      contentLearningPath: {},
      activeTap: 1,
      loading:false,
      paperWorkFieldsList: [
        {key: "id", label: "التسلسل"},
        {key: "name", label: this.$i18n.t('TABLE_FIELDS.name')},
        {key: "type", label: this.$i18n.t('TABLE_FIELDS.type')},
        {key: "final_degree", label: this.$i18n.t('TABLE_FIELDS.finalDegree')},
        {
          key: "teacher_review.student_final_degree",
          label: this.$i18n.t('TABLE_FIELDS.correctionDegree')
        },
        {key: "download", label: "المرفق"},
        {key: "teacher_review", label: "الاجراء"},
      ],
      tasksFieldsList: [
        {key: "id", label: "التسلسل"},
        {key: "name", label: this.$i18n.t('TABLE_FIELDS.name')},
        {key: "type", label: this.$i18n.t('TABLE_FIELDS.type')},
        {key: "final_degree", label: this.$i18n.t('TABLE_FIELDS.finalDegree')},
        {
          key: "teacher_review.student_final_degree",
          label: this.$i18n.t('TABLE_FIELDS.correctionDegree')
        },
        {key: "download", label: "المرفق"},
        {key: "teacher_review", label: "الاجراء"},
      ],
      detail:{},
      correctionObject:{
        user_id: this.$route.params.studentId,
        learning_path_id:'',
        mission_id:'',
        student_final_degree:"",
        note:''
      }
    }
  },
  methods: {
    getMissionContent() {
      this.ApiService(getDetailMissionsWithLearningPathsForTeacher(this.$route.params.studentId, this.$route.params.missionId)).then((response) => {
        this.missionDetail = response.data.data
        this.learningPaths = this.missionDetail.learningpaths ? this.missionDetail.learningpaths : []
        this.learningPaths = this.learningPaths.map((item) => {
          return {...item, is_selected: false}
        })
        this.firstLearningPathId = this.learningPaths[0] ? this.learningPaths[0].id : null
        this.learningPaths[0].is_selected = true
      }).then(() => {
        this.getLearningPathDetail(this.firstLearningPathId)
      })
    },
    getLearningPathDetail(learningPathId) {
      this.contentLearningPath = this.learningPaths.find((item) => item.id === learningPathId)
    },
    toggleContent(learningPath) {
      this.learningPaths = this.learningPaths.map((item) => {
        return {...item, is_selected: false}
      })
      let findItem = this.learningPaths.findIndex((item) => item.id === learningPath.id)
      this.learningPaths[findItem].is_selected = !this.learningPaths[findItem].is_selected;
      this.activeTap = 1
      this.getLearningPathDetail(learningPath.id)
    },
    detailItemCorrection(item) {
      this.detail = item
      this.correctionObject.student_final_degree = item.teacher_review.student_final_degree
      this.correctionObject.note = item.teacher_review.note
      this.correctionObject.learning_path_id = this.contentLearningPath.id
      this.correctionObject.mission_id = this.missionDetail.id
      delete  this.correctionObject.task_id
      delete  this.correctionObject.paper_work_id
      if (this.activeTap === 1){
        this.correctionObject.task_id = this.detail.id
      } else {
        this.correctionObject.paper_work_id = this.detail.id
      }
      this.$bvModal.show('holdContent')
    },
    onSubmit(){
      this.$refs.correctionForm.validate().then((success) => {
        if (!success) return;
      });
      if (this.activeTap === 1){
        this.ApiService(correctionTask(this.correctionObject)).then(()=>{
          this.$bvModal.hide('holdContent')
          this.getMissionContent()
        })
      } else {
        this.ApiService(correctionPaperWork(this.correctionObject)).then(() => {
          this.$bvModal.hide('holdContent')
          this.getMissionContent()
        });
      }
    }
  },
  mounted() {
    this.getMissionContent()
  },
}
</script>
<style scoped lang="scss">
@import "index";
</style>
