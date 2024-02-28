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
        :schema="teacherSearch"
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
      :header-name="'قائمة المدرسين'"
      :fieldsList="fieldsList"
      :number-of-item="totalNumber"
      :table-items="teachers"
      :v-search-model="teachersSearchWord"
      :loading="loading"
      :disable-it="true"
      :show-sort-controls="false"
      @detailItem="detailItem($event)"
      @refetch="getAllTeachers"
      :permission_delete="'delete-teachers'"
      :permission_edit="'edit-teachers'"
      :permission_view="'show-supervisor-teachers'"
    >
    </ListItems>
  </section>
</template>

<script>
import Button from "@/components/Shared/Button/index.vue";
import ListItems from "@/components/ListItems/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import {mapGetters} from "vuex";
import {getAllTeachersForSuperVisorRequest, getAllTeachersRequest} from "@/api/user";
import GenericForm from "@/components/Shared/GenericForm/index.vue";
import {
  getClasses,
  getLevelsForSuperVisor,
  getSTermsForSuperVisor,
  getStudyYearsForSuperVisor
} from "@/services/dropdownService";

export default {
  components: {GenericForm, Modal, ListItems, Button},
  data() {
    return {
      loading: false,
      showModal: false,
      teachersSearchWord: "",
      teachers: [],
      teacherSearch: [
        {
          key: "name",
          col: "4",
          type: "text",
          label: this.$t("TABLE_FIELDS.teacherName"),
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
          key: "email",
          label: this.$i18n.t("USERS.name"),
        },
        {
          key: "status.key",
          label: this.$i18n.t("TABLE_FIELDS.status"),
        },
        {
          key: "actions",
          label: this.$i18n.t("TABLE_FIELDS.actions"),
        },
      ],
      itemId: 0,
    };
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    getAllTeachers(values){
      this.ApiService(getAllTeachersForSuperVisorRequest(values)).then((response)=>{
        this.teachers = response.data.data
        this.totalNumber = response.data.meta.total
      })
    },
    onSubmit(values) {
      this.getAllTeachers(values)
    },
    handleCancel(){
      this.getAllTeachers()
    },
    detailItem($event) {
      this.$router.push(`/dashboard/teachers/show/${$event}`);
    },
  },
  mounted() {
    this.getAllTeachers();
    getLevelsForSuperVisor(this.teacherSearch, 'level_id')
    getStudyYearsForSuperVisor(this.teacherSearch, 'study_year_id')
    getSTermsForSuperVisor(this.teacherSearch, 'term_id')
    getClasses(this.teacherSearch, 'class_id')
  },
};
</script>

<style scoped lang="scss">
@import "./index";
</style>
