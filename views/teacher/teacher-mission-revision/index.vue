<template>
  <section class="container-fluid custom-container show-role">
    <validation-observer v-slot="{ invalid }" ref="schoolsUsersSearch">
      <b-row>
        <b-col lg="12">
          <h2 class="heading">{{ $t("BUTTONS.SEARCH") }}</h2>
        </b-col>
      </b-row>
      <GenericForm
        class="w-100"
        :schema="studentSearch"
        @onSubmit="onSubmit"
        @handleCancel="handleCancel"
        :loading="loading"
        :submitButton="$t('BUTTONS.SEARCH')"
        :cancelButton="$t('BUTTONS.RECOVERY')"
        :invalid="invalid"
      ></GenericForm>
    </validation-observer>
    <ListItems
      class="m-0 p-0"
      :header-name="'قائمة الطلاب'"
      :fieldsList="fieldsList"
      :number-of-item="totalNumber"
      :table-items="students"
      :v-search-model="studentsSearchWord"
      :loading="loading"
      :disable-it="true"
      :show-sort-controls="false"
      @detailItem="detailItem($event)"
      @refetch="getAllStudents"
    >
    </ListItems>
  </section>
</template>

<script>
import Button from "@/components/Shared/Button/index.vue";
import ListItems from "@/components/ListItems/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import {mapGetters} from "vuex";
import GenericForm from "@/components/Shared/GenericForm/index.vue";
import {getClassesForTeacher, getLevelsForTeacher, getSTermsForTeacher, getStudyYearsForTeacher} from "@/services/dropdownService";
import {
  getAllMissionsCorrectionForTeacherRequest,
  getAllStudentsForTeacherRequest
} from "@/api/teacher-module";

export default {
  components: {GenericForm, Modal, ListItems, Button},
  data() {
    return {
      loading: false,
      showModal: false,
      studentsSearchWord: "",
      students: [],
      totalNumber: 0,
      fieldsList: [
        {
          key: "id",
          label: this.$i18n.t("TABLE_FIELDS.id"),
        },
        {
          key: "image",
          label: this.$i18n.t("TABLE_FIELDS.image"),
        },
        {
          key: "first_name",
          label: this.$i18n.t("TABLE_FIELDS.first_name"),
        },
        {
          key: "middle_name",
          label: this.$i18n.t("TABLE_FIELDS.middle_name"),
        },
        {
          key: "last_name",
          label: this.$i18n.t("TABLE_FIELDS.last_name"),
        },
        {
          key: "mission_count",
          label: this.$i18n.t("TABLE_FIELDS.mission_count"),
        },
        {
          key: "showMissions",
          label: this.$i18n.t("TABLE_FIELDS.showMissions"),
        },
      ],
      studentSearch: [
        {
          key: "name",
          col: "4",
          type: "text",
          label: this.$t("TABLE_FIELDS.studentName"),
          value: "",
        },
        {
          key: "study_year_id",
          col: "4",
          type: "select",
          optionValue: "name",
          listen: "id",
          label: this.$t("TABLE_FIELDS.studyYear"),
          options: [],
          deselectFromDropdown: true,
          value: "",
        },
        {
          key: "level_id",
          col: "4",
          type: "select",
          optionValue: "name",
          listen: "id",
          label: this.$t("TABLE_FIELDS.levelSchoolAdmin"),
          options: [],
          deselectFromDropdown: true,
          value: "",
        },
        {
          key: "term_id",
          col: "4",
          type: "select",
          optionValue: "name",
          listen: "id",
          label: this.$t("MISSIONS.terms"),
          options: [],
          deselectFromDropdown: true,
          value: "",
        },
        {
          key: "class_id",
          col: "4",
          type: "select",
          optionValue: "name",
          listen: "id",
          label: this.$t("TABLE_FIELDS.className"),
          options: [],
          deselectFromDropdown: true,
          value: "",
        },
      ],
      itemId: 0,
    };
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    getAllStudents(values){
      this.ApiService(getAllMissionsCorrectionForTeacherRequest(values)).then((response)=>{
        this.students = response.data.data
        this.totalNumber = response.data.meta.total
      })
    },
    onSubmit(values) {
      this.getAllStudents(values)
    },
    handleCancel(){
      this.getAllStudents()
    },
    detailItem($event) {
      this.$router.push(`/dashboard/teacher/missions-student/show/${$event}`);
    },
  },
  mounted() {
    this.getAllStudents();
    getLevelsForTeacher(this.studentSearch, 'level_id')
    getStudyYearsForTeacher(this.studentSearch, 'study_year_id')
    getSTermsForTeacher(this.studentSearch, 'term_id')
    getClassesForTeacher(this.studentSearch, 'class_id')
  },
};
</script>

<style scoped lang="scss">
@import "./index";
</style>
