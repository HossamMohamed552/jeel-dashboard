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
        @handleInput="handleInput"
        @handleCancel="handleCancel"
        :loading="loading"
        :submitButton="$t('BUTTONS.SEARCH')"
        :cancelButton="$t('BUTTONS.RECOVERY')"
        :invalid="invalid"
      ></GenericForm>
    </validation-observer>
    <ListItems
      class="m-0 p-0"
      :header-name="$t('schoolAdmin.listOfStudents')"
      :fieldsList="fieldsList"
      :number-of-item="totalNumber"
      :table-items="students"
      :v-search-model="studentsSearchWord"
      :loading="loading"
      :disable-it="true"
      :isRefresh="refresh"
      :show-sort-controls="false"
      @detailItem="detailItem($event)"
      @refetch="getAllStudents"
      :permission_delete="'delete-teachers'"
      :permission_edit="'edit-teachers'"
      :permission_view="'show-supervisor-students'"
    >
    </ListItems>
  </section>
</template>

<script>
import Button from "@/components/Shared/Button/index.vue";
import ListItems from "@/components/ListItems/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import {mapGetters} from "vuex";
import {
  getAllStudentsForSuperVisorRequest,
} from "@/api/user";
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
      refresh: false,
      studentsSearchWord: "",
      students: [],
      totalNumber: 0,
      studentSearch: [
        {
          key: "name",
          col: "4",
          type: "text",
          label: "اسم الطالب",
          labelEn: "student Name",
          value: "",
        },
        {
          key: "study_year_id",
          col: "4",
          type: "select",
          optionValue: "name",
          listen: "id",
          label: "العام الدراسي",
          labelEn: "study year",
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
          label: "الصف الدراسي",
          labelEn: "level",
          options: [],
          deselectFromDropdown: true,
          value: "",
        },
        // {
        //   key: "term_id",
        //   col: "4",
        //   type: "select",
        //   optionValue: "name",
        //   listen: "id",
        //   label: "الترم الدراسي",
        //   labelEn: "terms",
        //   options: [],
        //   deselectFromDropdown: true,
        //   value: "",
        // },
        {
          key: "class_id",
          col: "4",
          type: "select",
          optionValue: "name",
          listen: "id",
          label: "اسم الفصل",
          labelEn: "class name",
          options: [],
          deselectFromDropdown: true,
          value: "",
          disabled: true
        },
      ],
      itemId: 0,
    };
  },
  computed: {
    ...mapGetters(['user']),
    fieldsList() {
      return [
        {
          key: "vid",
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
          key: "user_name",
          label: this.$i18n.t("USERS.name"),
        },
        {
          key: "level.name",
          label: this.$i18n.t("MISSIONS.level"),
        },
        {
          key: "status.key",
          label: this.$i18n.t("TABLE_FIELDS.status"),
        },
        {
          key: "actions",
          label: this.$i18n.t("TABLE_FIELDS.actions"),
        },
      ]
    }
  },
  methods: {
    getAllStudents(values) {
      this.ApiService(getAllStudentsForSuperVisorRequest(values)).then((response) => {
        this.students = response.data.data
        this.totalNumber = response.data.meta.total
        this.loading = false
      })
    },
    handleInput: _.debounce(function (key, value) {
      if (key === "level_id" && value !== "") {
        getClasses(this.studentSearch, 'class_id', {level_id: value})
        this.studentSearch[3].disabled = false
      }
    }, 300),
    onSubmit(values) {
      this.loading = true;
      this.searchWithPagination = values;
      this.getAllStudents(values)
    },
    handleCancel() {
      this.studentSearch.map(field => field.value = "")
      this.searchWithPagination = {}
      this.getAllStudents()
      this.refresh = true
    },
    detailItem($event) {
      this.$router.push(`/dashboard/super-student/show/${$event}`);
    },
  },
  mounted() {
    this.getAllStudents();
    getLevelsForSuperVisor(this.studentSearch, 'level_id')
    getStudyYearsForSuperVisor(this.studentSearch, 'study_year_id')
    getSTermsForSuperVisor(this.studentSearch, 'term_id')
    // getClasses(this.studentSearch, 'class_id')
  },
};
</script>

<style scoped lang="scss">
@import "./index";
</style>
