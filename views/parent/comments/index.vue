<template>
  <section class="container-fluid custom-container">
    <!--    @refetch="getMissions"-->
    <ListItems
      :header-name="'سجل التعليقات'"
      :fieldsList="activeTap === 1 ? taskFieldsList : paperWorkFieldsList"
      :number-of-item="activeTap === 1 ? taskTotalNumber : paperWorkTotalNumber"
      :table-items="activeTap === 1 ? tasks : paperWorks"
      :v-search-model="activeTap === 1 ? taskSearchWord : paperWorkSearchWord"
      :loading="loading"
      @refetch="getFilterData"
      @detailItem="detailItem"
    >
      <template #tabs>
        <div class="tabs">
          <div @click="selectRecord(1)" :class="activeTap === 1 ? 'active' : ''" class="tap">
            التسجيلات الصوتية
          </div>
          <div @click="selectRecord(2)" :class="activeTap === 2 ? 'active' : ''" class="tap">
            أوراق العمل
          </div>
        </div>
      </template>
    </ListItems>
    <GeneralModal :id="'holdContent'" :size="'lg'" :hide-header="true">
      <template #modalBody>
        <div class="p-3">
          <div v-if="activeTap === 1" class="title-content">
            تفاصيل التسجيل الصوتى
          </div>
          <div v-else>تفاصيل ورقة العمل</div>
          <b-row>
            <b-col lg="12" v-if="activeTap === 1">
              <AudioFakePlayer :url="detail.task_audio_student" :with-background="true"/>
            </b-col>
            <b-col lg="12" v-else>
              <img :src="detail.paper_work_student" class="paperwork-img">
            </b-col>
            <b-col lg="4">
              <h2 class="title">اسم المهمة</h2>
              <p class="subtitle" v-if="detail.mission">{{detail.mission.name}}</p>
            </b-col>
            <b-col lg="4">
              <h2 class="title">المسار</h2>
              <p class="subtitle" v-if="detail.learningPath">{{detail.learningPath.name}}</p>
            </b-col>
            <b-col lg="4">
              <h2 class="title" v-if="activeTap === 1">اسم التسجيل الصوتى</h2>
              <h2 class="title" v-else>اسم ورقه العمل</h2>
              <p class="subtitle">{{detail.name}}</p>
            </b-col>
            <b-col lg="4" class="my-2">
              <h2 class="title">نوع الملف</h2>
              <p class="subtitle" v-if="activeTap === 1">صوتى</p>
              <p class="subtitle" v-else>صورة</p>
            </b-col>
            <b-col lg="4" class="my-2">
              <h2 class="title">الدرجة النهائية</h2>
              <p class="subtitle" v-if="activeTap === 1">{{ detail.task_degree }}</p>
              <p class="subtitle" v-else>{{ detail.paperwork_degree}}</p>
            </b-col>
            <b-col lg="4" class="my-2">
              <h2 class="title">الدرجة</h2>
              <p class="subtitle">{{ detail.student_final_degree }}</p>
            </b-col>
            <b-col lg="12">
              <h2 class="title">التعليق</h2>
              <p class="subtitle">{{ detail.note }}</p>
            </b-col>
          </b-row>
        </div>
      </template>
    </GeneralModal>
  </section>
</template>
<script>
import ListItems from "@/components/ListItems/index.vue";
import {
  getPaperWorkForParentRequest,
  getSinglePaperWorkForParentRequest,
  getSingleTaskForParentRequest,
  getTasksForParentRequest
} from "@/api/parent-module";
import {mapGetters} from "vuex";
import GeneralModal from "@/components/Shared/GeneralModal/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import AudioFakePlayer from "@/components/Shared/AudioFakePlayer/index.vue";

export default {
  name: "index",
  components: {Button, GeneralModal, ListItems,AudioFakePlayer},
  data() {
    return {
      taskFieldsList: [
        {
          key: "id",
          label: this.$i18n.t("TABLE_FIELDS.id"),
        },
        {
          key: "name",
          label: this.$i18n.t("TABLE_FIELDS.taskName"),
        },
        {
          key: "task_degree",
          label: this.$i18n.t("TABLE_FIELDS.finalDegree"),
        },
        {
          key: "student_final_degree",
          label: this.$i18n.t("TABLE_FIELDS.correctionDegree"),
        },
        {
          key: "note",
          label: this.$i18n.t("TABLE_FIELDS.comment"),
        },
        {
          key: "editActions",
          label: this.$i18n.t("TABLE_FIELDS.actions"),
        },
      ],
      paperWorkFieldsList: [
        {
          key: "id",
          label: this.$i18n.t("TABLE_FIELDS.id"),
        },
        {
          key: "name",
          label: this.$i18n.t("TABLE_FIELDS.paperWorkName"),
        },
        {
          key: "paper_work_degree",
          label: this.$i18n.t("TABLE_FIELDS.finalDegree"),
        },
        {
          key: "student_final_degree",
          label: this.$i18n.t("TABLE_FIELDS.correctionDegree"),
        },
        {
          key: "note",
          label: this.$i18n.t("TABLE_FIELDS.comment"),
        },
        {
          key: "editActions",
          label: this.$i18n.t("TABLE_FIELDS.actions"),
        },
      ],
      tasks: [],
      paperWorks: [],
      taskSearchWord: "",
      paperWorkSearchWord: "",
      loading: false,
      taskTotalNumber: 0,
      paperWorkTotalNumber: 0,
      activeTap: 1,
      detail: {}
    }
  },
  computed: {
    ...mapGetters(['currentChild'])
  },
  methods: {
    selectRecord(tab) {
      this.activeTap = tab
      if (tab === 1) {
        this.getTaskComments()
      } else {
        this.getPaperWorkComments()
      }
    },
    getTaskComments(event) {
      this.loading = true;
      const params = event;
      this.ApiService(getTasksForParentRequest(this.currentChild.id, params))
        .then((response) => {
          this.tasks = response.data.data;
          this.taskTotalNumber = response.data.meta.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getSingleTaskComments(id) {
      this.ApiService(getSingleTaskForParentRequest(id))
        .then((response) => {
          this.detail = response.data.data;
        }).then(() => {this.$bvModal.show('holdContent')})
    },
    getPaperWorkComments(event) {
      this.loading = true;
      const params = event;
      this.ApiService(getPaperWorkForParentRequest(this.currentChild.id, params))
        .then((response) => {
          this.paperWorks = response.data.data;
          this.paperWorkTotalNumber = response.data.meta.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getSinglePaperWorkComments(id) {
      this.ApiService(getSinglePaperWorkForParentRequest(id))
        .then((response) => {
          this.detail = response.data.data;
        }).then(() => {this.$bvModal.show('holdContent')})
    },
    getFilterData($event) {
      if (this.activeTap === 1) {
        this.getTaskComments($event)
      } else {
        this.getPaperWorkComments($event)
      }
    },
    detailItem(id) {
      if (this.activeTap === 1) {
        this.getSingleTaskComments(id)
      } else {
        this.getSinglePaperWorkComments(id)
      }
    },
    hideModal() {
      this.$bvModal.hide('holdContent')
    },
  },
  mounted() {
    this.selectRecord(1)
  }
}
</script>
<style scoped lang="scss">
@import "index";
</style>
