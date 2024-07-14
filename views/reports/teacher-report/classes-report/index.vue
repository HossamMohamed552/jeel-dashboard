<template>
  <section class="container-fluid custom-container">
    <div class="collapse-search">
      <div class="collapse-search__header">
        <h2 class="heading">{{ $t("BUTTONS.SEARCH") }}</h2>
        <button class="collapsed" @click="toggleCollapsed">
          <i :class="collapsed ? 'fas fa-minus' : 'fas fa-plus'"></i>
        </button>
      </div>
      <div :class="collapsed ? '' : 'collapsed'" class="collapse-search__body">
        <div class="hold-fields">
          <b-row>
            <b-col lg="12">
              <validation-observer v-slot="{ invalid }" ref="schoolsUsersSearch">
                <GenericForm
                  :schema="studentReportSearch"
                  @onSubmit="onSubmit"
                  @handleInput="handleInput"
                  @handleCancel="handleCancel"
                  :loading="loading"
                  :submitButton="$t('BUTTONS.SEARCH')"
                  :cancelButton="$t('BUTTONS.RECOVERY')"
                  :invalid="invalid"
                ></GenericForm>
              </validation-observer>
            </b-col>
          </b-row>
        </div>
      </div>
    </div>
    <section class="all-info">
      <div class="reports-tabs">
        <div @click="activeTap = 1" :class="activeTap === 1 ? 'active' : ''" class="tap">
          {{ $t("REPORTS.tables") }}
        </div>
        <div @click="activeTap = 2" :class="activeTap === 2 ? 'active' : ''" class="tap">
          {{ $t("REPORTS.flowChart") }}
        </div>
      </div>
      <div class="content">
        <div class="row">
          <transition-group name="router-view-fade" mode="in-out" appear tag="div" class="w-100">
            <div class="col-12" key="1" v-show="activeTap === 1">
              <div class="d-flex justify-content-between align-items-center">
                <h3>{{ $t("REPORTS.classHeading") }}</h3>
                <b-dropdown no-caret>
                  <template #button-content>
                    <div class="sort">
                      <img src="../../../../src/assets/images/icons/sort.svg" />
                      <div>
                        {{ $t("REPORTS.export_to") }}
                      </div>
                    </div>
                  </template>
                  <b-dropdown-item>
                    <export-excel
                      ref="exportExcel"
                      :name="pdfName"
                      :title="$t('REPORTS.studentHeading')"
                      :fields="$i18n.locale === 'ar' ? studentReportFieldsAr : studentReportFields"
                      :fetch="getAllStudentsReports"
                    >
                      <img src="@/assets/images/icons/xls.png" />{{ $t("REPORTS.exportExcel") }}
                    </export-excel>
                  </b-dropdown-item>
                  <b-dropdown-item @click="generatePdf">
                    <div class="mt-3">
                      <img src="@/assets/images/icons/pdf.png" />{{ $t("REPORTS.exportPdf") }}
                    </div>
                  </b-dropdown-item>
                </b-dropdown>
              </div>
              <b-row>
                <b-col lg="12">
                  <ListItems
                    class="m-0 p-0"
                    :fieldsList="subStudentReportList"
                    :tableItems="studentReportList"
                    :number-of-item="totalNumber"
                    @refetch="getStudentReport"
                    :loading="loading"
                    :showSortControls="false"
                  >
                  </ListItems>
                </b-col>
              </b-row>
            </div>
            <div class="col-12" key="2" v-show="activeTap === 2">
              <BarChart
                class="mb-3"
                :title="$t('REPORTS.learningPath')"
                :type-of-chart="'missions'"
                :missions-in-chart="missionsInChart"
                v-if="missionsInChart.length > 0"
              />
              <BarChart
                class="mb-3"
                :title="$t('REPORTS.missionContent')"
                :type-of-chart="'missionContent'"
                :mission-content="missionContentInChart"
                v-if="missionContentInChart.length > 0"
              />
            </div>
          </transition-group>
        </div>
        <VueHtml2pdf
          :show-layout="false"
          :float-layout="true"
          :enable-download="true"
          :preview-modal="false"
          :paginate-elements-by-height="50"
          :filename="pdfName"
          :pdf-quality="2"
          :manual-pagination="true"
          pdf-format="a4"
          pdf-orientation="landscape"
          pdf-content-width="100%"
          ref="html2Pdf"
        >
          <section slot="pdf-content" class="pdf-content">
            <!-- PDF Content Here -->
            <div class="filter">
              <b-row>
                <b-col lg="12" class="d-flex justify-content-center align-items-center my-2">
                  <h5>{{ $t("REPORTS.classHeading") }}</h5>
                </b-col>
                <b-col lg="3">
                  <span
                    >{{ subStudentReportList[0].label }}:
                    {{ valuesOfAdvancedSearch.study_year_id }}</span
                  >
                </b-col>
                <b-col lg="3">
                  <span
                    >{{ subStudentReportList[1].label }} :
                    {{ valuesOfAdvancedSearch.level_id }}</span
                  >
                </b-col>
              </b-row>
            </div>
            <div class="header">
              <span>{{ subStudentReportList[0].label }}</span>
              <span>{{ subStudentReportList[1].label }}</span>
              <span>{{ subStudentReportList[2].label }}</span>
              <span>{{ subStudentReportList[3].label }}</span>
              <span>{{ subStudentReportList[4].label }}</span>
              <span>{{ subStudentReportList[5].label }}</span>
              <span>{{ subStudentReportList[6].label }}</span>
              <span>{{ subStudentReportList[7].label }}</span>
              <span>{{ subStudentReportList[8].label }}</span>
              <span>{{ subStudentReportList[9].label }}</span>
              <span>{{ subStudentReportList[10].label }}</span>
              <span>{{ subStudentReportList[11].label }}</span>
              <span>{{ subStudentReportList[12].label }}</span>
              <span>{{ subStudentReportList[13].label }}</span>
              <span>{{ subStudentReportList[14].label }}</span>
            </div>
            <div
              v-for="(student, index) in studentReportList"
              :key="student.id"
              class="table-item"
              :class="index + (1 % 7) === 7 ? 'html2pdf__page-break' : ''"
            >
              <div v-if="index + (1 % 8) === 8">
                <div class="filter">
                  <b-row>
                    <b-col lg="12" class="d-flex justify-content-center align-items-center my-2">
                      <h5>{{ $t("REPORTS.studentHeading") }}</h5>
                    </b-col>
                    <b-col lg="3">
                      <span
                        >{{ subStudentReportList[0].label }}:
                        {{ valuesOfAdvancedSearch.study_year_id }}</span
                      >
                    </b-col>
                    <b-col lg="3">
                      <span
                        >{{ subStudentReportList[1].label }} :
                        {{ valuesOfAdvancedSearch.level_id }}</span
                      >
                    </b-col>
                  </b-row>
                </div>
                <div class="header">
                  <span>{{ subStudentReportList[0].label }}</span>
                  <span>{{ subStudentReportList[1].label }}</span>
                  <span>{{ subStudentReportList[2].label }}</span>
                  <span>{{ subStudentReportList[3].label }}</span>
                  <span>{{ subStudentReportList[4].label }}</span>
                  <span>{{ subStudentReportList[5].label }}</span>
                  <span>{{ subStudentReportList[6].label }}</span>
                  <span>{{ subStudentReportList[7].label }}</span>
                  <span>{{ subStudentReportList[8].label }}</span>
                  <span>{{ subStudentReportList[9].label }}</span>
                  <span>{{ subStudentReportList[10].label }}</span>
                  <span>{{ subStudentReportList[11].label }}</span>
                  <span>{{ subStudentReportList[12].label }}</span>
                  <span>{{ subStudentReportList[13].label }}</span>
                  <span>{{ subStudentReportList[14].label }}</span>
                </div>
              </div>
              <b-row>
                <b-col
                  ><span>{{ student.class_name }}</span></b-col
                >
                <b-col
                  ><span>{{ student.study_year_name }}</span></b-col
                >
                <b-col
                  ><span>{{ student.level_name }}</span></b-col
                >
                <b-col
                  ><span>{{ student.term_name }}</span></b-col
                >
                <b-col
                  ><span>{{ student.user_count }}</span></b-col
                >
                <b-col
                  ><span>{{ student.user_mission_videos_count }}</span></b-col
                >
                <b-col
                  ><span>{{ student.percentage_videos }} %</span></b-col
                >
                <b-col
                  ><span>{{ student.user_mission_quiz_count }}</span></b-col
                >
                <b-col
                  ><span>{{ student.percentage_quizzes }} %</span></b-col
                >
                <b-col
                  ><span>{{ student.user_mission_tasks_count }}</span></b-col
                >
                <b-col
                  ><span>{{ student.percentage_tasks }} %</span></b-col
                >
                <b-col
                  ><span>{{ student.user_mission_single_paperworks_count }}</span></b-col
                >
                <b-col
                  ><span>{{ student.percentage_single_paperworks }} %</span></b-col
                >
                <b-col
                  ><span>{{ student.user_mission_participatory_paperworks_count }}</span></b-col
                >
                <b-col
                  ><span>{{ student.percentage_participatory_paperwork }} %</span></b-col
                >
              </b-row>
            </div>
            <div class="html2pdf__page-break"></div>
            <div class="chart"></div>
          </section>
        </VueHtml2pdf>
      </div>
    </section>
  </section>
</template>
<script>
import GenericForm from "@/components/Shared/GenericForm/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import ListItems from "@/components/ListItems/index.vue";

import {
  getAllLevelsForSchoolAdmin,
  getClassSchoolAdmin,
  getSchoolAdminStudyYear,
  getTerms,
} from "@/services/dropdownService";
import {
  getTeacherClassLearningpathsRequest,
  getTeacherClassChartRequest,
  getTeacherClassReportsRequest,
} from "@/api/teacher-reports";
import BarChart from "@/components/CustomBarChart/BarChart.vue";

export default {
  name: "index",
  components: { BarChart, ListItems, ShowItem, Button, GenericForm },
  data() {
    return {
      collapsed: false,
      loading: false,
      loadingChart: false,
      activeTap: 1,
      studentReportSearch: [
        {
          key: "study_year_id",
          col: "3",
          type: "select",
          optionValue: "name",
          listen: "id",
          label: "العام الدراسي",
          labelEn: "study year",
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "",
        },
        {
          key: "level_id",
          col: "3",
          type: "select",
          optionValue: "name",
          listen: "id",
          label: "السنة الدراسية",
          labelEn: "levels",
          options: [],
          disabled: true,
          deselectFromDropdown: true,
          value: "",
          rules: "",
        },
        {
          key: "term_id",
          col: "3",
          type: "select",
          optionValue: "name",
          listen: "id",
          label: "الترم الدراسي",
          labelEn: "terms",
          options: [],
          disabled: true,
          deselectFromDropdown: true,
          value: "",
          rules: "",
        },
        {
          key: "class_id",
          col: "3",
          type: "select",
          optionValue: "name",
          listen: "id",
          label: "الفصول",
          labelEn: "classes",
          options: [],
          disabled: true,
          deselectFromDropdown: true,
          value: "",
          rules: "",
        },
      ],
      valuesOfAdvancedSearch: {
        study_year_id: "",
        country_id: "",
        school_group_id: "",
        school_id: "",
        level_id: "",
        term_id: "",
      },
      exportArray: [
        {
          id: 1,
          value: "excel",
          name: "تصدير ل أكسيل",
          nameEn: "Export to Excel",
        },
        {
          id: 2,
          value: "pdf",
          name: "تصدير ل pdf",
          nameEn: "Export to pdf",
        },
      ],
      studentReportList: [],
      studentSearchFields: [],
      totalNumber: 0,
      searchWithPagination: {},
      missionsInChart: [],
      missionContentInChart: [],
    };
  },
  watch: {},
  computed: {
    studentReportFieldsAr() {
      return {
        "اسم الفصل": "class_name",
        "العام الدراسي": "study_year_name",
        "الصف الدراسي": "level_name",
        "الترم الدراسي": "term_name",
        "عدد الطلاب الفصل": "user_count",
        "عدد الطلاب الذين أنهو الفيديوهات": "user_mission_videos_count",
        "نسبة التفاعل على الفيديوهات": "percentage_videos",
        "عدد الطلاب الذين أنهو التمارين": "user_mission_quiz_count",
        "نسبة التفاعل على التمارين": "percentage_quizzes",
        "عدد الطلاب الذين أنهو التسجيلات الصوتية": "user_mission_tasks_count",
        "نسبة التفاعل على التسجيلات الصوتية": "percentage_tasks",
        "عدد الطلاب الذين أنهو أوراق العمل الفردية": "user_mission_single_paperworks_count",
        "نسبة التفاعل على الأوراق الفردية": "percentage_single_paperworks",
        "عدد الطلاب الذين أنهو أوراق العمل التشاركية":
          "user_mission_participatory_paperworks_count",
        "نسبة التفاعل على الأوراق التشاركية": "percentage_participatory_paperwork",
      };
    },
    studentReportFields() {
      return {
        "class name": "class_name",
        "study year": "study_year_name",
        level: "level_name",
        term: "term_name",
        "Number of students per class": "user_count",
        "Number of students who completed the videos": "user_mission_videos_count",
        "Interaction rate on videos": "percentage_videos",
        "Number of students who completed the exercises": "user_mission_quiz_count",
        "The rate of interaction with exercises": "percentage_quizzes",
        "Number of students who completed tasks": "user_mission_tasks_count",
        "Interaction rate on tasks": "percentage_tasks",
        "Number of students who completed single paperwork": "user_mission_single_paperworks_count",
        "Reaction rate on single paperwork": "percentage_single_paperworks",
        "Number of students who completed collaborative worksheets":
          "user_mission_participatory_paperworks_count",
        "Percentage of interaction on participatory papers": "percentage_participatory_paperwork",
      };
    },
    subStudentReportList() {
      return [
        {
          key: "class_name",
          label: this.$i18n.t("studentReport.class_name"),
        },
        {
          key: "study_year_name",
          label: this.$i18n.t("studentReport.study_year_name"),
        },
        {
          key: "level_name",
          label: this.$i18n.t("studentReport.level_name"),
        },
        {
          key: "term_name",
          label: this.$i18n.t("studentReport.term_name"),
        },
        {
          key: "user_count",
          label: this.$i18n.t("studentReport.user_count"),
        },
        {
          key: "user_mission_videos_count",
          label: this.$i18n.t("studentReport.class_user_mission_videos_count"),
        },
        {
          key: "percentage_videos",
          label: this.$i18n.t("studentReport.percentage_videos"),
        },
        {
          key: "user_mission_quiz_count",
          label: this.$i18n.t("studentReport.class_user_mission_quiz_count"),
        },
        {
          key: "percentage_quizzes",
          label: this.$i18n.t("studentReport.class_percentage_quizzes"),
        },
        {
          key: "user_mission_tasks_count",
          label: this.$i18n.t("studentReport.class_user_mission_tasks_count"),
        },
        {
          key: "percentage_tasks",
          label: this.$i18n.t("studentReport.class_percentage_tasks"),
        },
        {
          key: "user_mission_single_paperworks_count",
          label: this.$i18n.t("studentReport.class_mission_single_paperworks_count"),
        },
        {
          key: "percentage_single_paperworks",
          label: this.$i18n.t("studentReport.percentage_single_paperworks"),
        },
        {
          key: "user_mission_participatory_paperworks_count",
          label: this.$i18n.t("studentReport.class_mission_participatory_paperworks_count"),
        },
        {
          key: "percentage_participatory_paperwork",
          label: this.$i18n.t("studentReport.percentage_participatory_paperwork"),
        },
      ];
    },
    pdfName() {
      return `${this.$t("REPORTS.classHeading")} - ${new Date().toLocaleString()}`;
    },
  },
  methods: {
    handleCancel() {
      this.studentReportSearch.map((field) => (field.value = ""));
      this.searchWithPagination = {};
      this.getMissionsReport();
      this.getMissionsReportChart();
    },
    handleInput(key, value, _, options) {
      if (key === "study_year_id" && value !== "") {
        this.studentReportSearch[1].disabled = false;
        this.studentReportSearch[2].disabled = false;
        this.studentReportSearch[3].disabled = false;
        getAllLevelsForSchoolAdmin(this.studentReportSearch, "level_id", {
          study_year_id: this.studentReportSearch[0].value,
        });
        getTerms(this.studentReportSearch, "term_id", {
          study_year_id: this.studentReportSearch[0].value,
        });
        getClassSchoolAdmin(this.studentReportSearch, "class_id", {
          study_year_id: this.studentReportSearch[0].value,
          level_id: this.studentReportSearch[1].value,
        });
      }
      if (key === "level_id" && value !== "") {
        getClassSchoolAdmin(this.studentReportSearch, "class_id", {
          study_year_id: this.studentReportSearch[0].value,
          level_id: this.studentReportSearch[1].value,
        });
      }
      if (options) {
        const itemValue = options?.filter((item) => {
          return item.id === value;
        });
        this.valuesOfAdvancedSearch[key] = itemValue ? itemValue[0]?.name : "";
      } else {
        this.valuesOfAdvancedSearch[key] = value;
      }
    },
    onSubmit(values) {
      this.searchWithPagination = values;
      this.getStudentReport();
      this.getMissionsReportChart();
      this.getChartMissionsContentsCharts();
    },
    getStudentReport(paramsWithSearch) {
      const params = { ...paramsWithSearch, ...this.searchWithPagination };
      this.filterParams = params;
      this.ApiService(getTeacherClassReportsRequest(params)).then((response) => {
        this.studentReportList = response.data.data;
        this.totalNumber = response.data.meta.total;
      });
    },
    getAllStudentsReports() {
      return this.ApiService(
        getTeacherClassReportsRequest({
          ...this.filterParams,
          list_all: true,
        })
      ).then((response) => {
        return (this.studentReportList = response.data.data);
      });
    },
    getMissionsReportChart(paramsWithSearch) {
      const params = { ...paramsWithSearch, ...this.searchWithPagination };
      this.ApiService(getTeacherClassLearningpathsRequest(params)).then((response) => {
        this.missionsInChart = response.data.data;
      });
    },
    getChartMissionsContentsCharts(paramsWithSearch) {
      const params = { ...paramsWithSearch, ...this.searchWithPagination };
      this.ApiService(getTeacherClassChartRequest(params)).then((response) => {
        this.missionContentInChart = response.data.data;
      });
    },
    generatePdf() {
      this.getAllStudentsReports();
      this.$refs.html2Pdf.generatePdf();
    },
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
  },
  mounted() {
    getSchoolAdminStudyYear(this.studentReportSearch, "study_year_id");
    getAllLevelsForSchoolAdmin(this.studentReportSearch, "level_id");
    this.getStudentReport();
  },
};
</script>

<style scoped lang="scss">
@import "index";
</style>
