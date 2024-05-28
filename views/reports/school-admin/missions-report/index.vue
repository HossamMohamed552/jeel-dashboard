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
                  :schema="missionsReportSearch"
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
          {{ $t('REPORTS.tables') }}
        </div>
        <div @click="activeTap = 2" :class="activeTap === 2 ? 'active' : ''" class="tap">
          {{ $t('REPORTS.flowChart') }}
        </div>
      </div>
      <div class="content">
        <div class="row">
          <transition-group name="router-view-fade" mode="in-out" appear tag="div" class="w-100">
            <div class="col-12" key="1" v-show="activeTap === 1">
              <div class="d-flex justify-content-between align-items-center">
                <h3>{{ $t('REPORTS.missionsHeading') }}</h3>
                <b-dropdown no-caret>
                  <template #button-content>
                    <div class="sort">
                      <img src="../../../../src/assets/images/icons/sort.svg"/>
                      <div>
                        {{ $t('REPORTS.export_to') }}
                      </div>
                    </div>
                  </template>
                  <b-dropdown-item>
                    <export-excel
                      ref="exportExcel"
                      :name="pdfName"
                      :title="$t('REPORTS.missionsHeading')"
                      :fields="$i18n.locale === 'ar'? missionsReportFieldsAr : missionsReportFields"
                      :fetch="getAllMissionsReports">
                      <img src="@/assets/images/icons/xls.png">{{ $t('REPORTS.exportExcel') }}
                    </export-excel>
                  </b-dropdown-item>
                  <b-dropdown-item @click="generatePdf">
                    <div class="mt-3">
                      <img src="@/assets/images/icons/pdf.png">{{ $t('REPORTS.exportPdf') }}
                    </div>
                  </b-dropdown-item>
                </b-dropdown>
              </div>
              <b-row>
                <b-col lg="12">
                  <ListItems
                    class="m-0 p-0"
                    :fieldsList="subMissionsReportList"
                    :tableItems="missionsReportList"
                    :number-of-item="totalNumber"
                    @refetch="getMissionsReport"
                    :loading="loading"
                    :showSortControls="false"
                  >
                  </ListItems>
                </b-col>
              </b-row>
            </div>
            <div class="col-12" key="2" v-show="activeTap === 2">
              <Bar v-if="loadingChart" :chart-data="chartData" :options="chartOptions"/>
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
                  <h5>{{ $t('REPORTS.missionsHeading') }}</h5>
                </b-col>
                <b-col lg="3">
                  <span>{{missionReportListHeaders[0].label }}: {{ valuesOfAdvancedSearch.study_year_id }}</span>
                </b-col>
                <b-col lg="3">
                  <span>{{missionReportListHeaders[1].label}} : {{ valuesOfAdvancedSearch.level_id }}</span>
                </b-col>
              </b-row>
            </div>
            <div class="header">
              <b-row>
                <b-col>
                  <span>{{ missionReportListHeaders[0].label }}</span>
                </b-col>
                <b-col>
                  <span>{{ missionReportListHeaders[1].label }}</span>
                </b-col>
                <b-col>
                  <span>{{ missionReportListHeaders[2].label }}</span>
                </b-col>
                <b-col>
                  <span>{{ missionReportListHeaders[3].label }}</span>
                </b-col>
                <b-col>
                  <span>{{ missionReportListHeaders[4].label }}</span>
                </b-col>
                <b-col>
                  <span>{{ missionReportListHeaders[5].label }}</span>
                </b-col>
              </b-row>
            </div>
            <div v-for="(mission,index) in missionsReportList" :key="mission.id"
                 class="table-item" :class="index+1 % 7 === 7 ? 'html2pdf__page-break':''">
              <div v-if="index+1 % 8 === 8">
                <div class="filter">
                  <b-row>
                    <b-col lg="12" class="d-flex justify-content-center align-items-center my-2">
                      <h5>{{ $t('REPORTS.missionsHeading') }}</h5>
                    </b-col>
                    <b-col lg="3">
                  <span>{{
                      missionReportListHeaders[0].label
                    }}: {{ valuesOfAdvancedSearch.study_year_id }}</span>
                    </b-col>
                    <b-col lg="3">
                      <span>{{missionReportListHeaders[1].label}} : {{ valuesOfAdvancedSearch.level_id }}</span>
                    </b-col>
                  </b-row>
                </div>
                <div class="header">
                  <b-row>
                    <b-col>
                      <span>{{ missionReportListHeaders[0].label }}</span>
                    </b-col>
                    <b-col>
                      <span>{{ missionReportListHeaders[1].label }}</span>
                    </b-col>
                    <b-col>
                      <span>{{ missionReportListHeaders[2].label }}</span>
                    </b-col>
                    <b-col>
                      <span>{{ missionReportListHeaders[3].label }}</span>
                    </b-col>
                    <b-col>
                      <span>{{ missionReportListHeaders[4].label }}</span>
                    </b-col>
                    <b-col>
                      <span>{{ missionReportListHeaders[5].label }}</span>
                    </b-col>
                  </b-row>
                </div>
              </div>
              <b-row>
                <b-col><span>{{ mission.studyYear.name }}</span></b-col>
                <b-col><span v-for="level in mission.levels">{{ level.name }}</span></b-col>
                <b-col class="terms"><span v-for="term in mission.terms">{{ term.name }}</span></b-col>
                <b-col class="terms"><span v-for="learning in mission.learning_paths">{{ learning.name }}</span></b-col>
                <b-col class="terms"><span v-for="supervisor in mission.supervisors">{{ supervisor.name }}</span></b-col>
                <b-col><span>{{ mission.missions_count }}</span></b-col>
              </b-row>
            </div>
            <div class="html2pdf__page-break"></div>
            <div class="chart">
              <Bar v-if="loadingChart" :chart-data="chartData" :options="chartOptions"/>
            </div>
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
import {Bar} from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import {
  getMissionsChartRequest, getMissionsRequest,
} from "@/api/reports";
import {
  geAllTermsForReports,
  getALLCountriesForReports,
  getAllLevelsForReports,
  getAllLevelsForSchoolAdmin,
  getALLSchoolGroupsForReports,
  getAllSchools,
  getSchoolAdminStudyYear,
  getStudyYear
} from "@/services/dropdownService";
import {
  getSchoolAdminMissionsChartRequest,
  getSchoolAdminMissionsRequest
} from "@/api/school-admin-reports";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
export default {
  name: "index",
  components: {ListItems, ShowItem, Button, GenericForm, Bar},
  data() {
    return {
      collapsed: false,
      loading: false,
      loadingChart: false,
      activeTap: 1,
      missionsReportSearch: [
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
          rules: ''
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
      missionsReportList: [],
      missionsSearchFields: [],
      totalNumber: 0,
      searchWithPagination: {},
    }
  },
  watch: {
    chartData: {
      handler(newVal) {
        return newVal
      },
      immediate: true,
    },
    chartOptions: {
      handler(newVal) {
        return newVal
      },
      immediate: true,
    },
    "$i18n.locale"(newVal) {
      if (newVal) {
        this.setData()
      }
    },
  },
  computed: {
    missionsReportFieldsAr() {
      return {
        "العام الدراسي": "studyYear.name",
        "الصفوف الدراسية": {
          field: "levels",
          callback: (value) => {
            let levelNames = []
            levelNames.push(...value)
            levelNames = levelNames.map((item) => {
              return item.name
            })
            return [...levelNames]
          }
        },
        "الترم الدراسي": {
          field: "terms",
          callback: (value) => {
            let termsNames = []
            termsNames.push(...value)
            termsNames = termsNames.map((item) => {
              return item.name
            })
            return [...termsNames]
          }
        },
        "المسارات التعليمية": {
          field: "learning_paths",
          callback: (value) => {
            let learning_pathsNames = []
            learning_pathsNames.push(...value)
            learning_pathsNames = learning_pathsNames.map((item) => {
              return item.name
            })
            return [...learning_pathsNames]
          }
        },
        "أسماء المشرفين": {
          field: "supervisors",
          callback: (value) => {
            let supervisors = []
            supervisors.push(...value)
            supervisors = supervisors.map((item) => {
              return item.name
            })
            return [...supervisors]
          }
        },
        "عدد المهام": "missions_count",
      }
    },
    missionsReportFields() {
      return {
        "study year": "studyYear.name",
        "levels": {field: "levels",
          callback: (value) => {
            let levelNames = []
            levelNames.push(...value)
            levelNames = levelNames.map((item) => {
              return item.name
            })
            return [...levelNames]
          }
        },
        "terms": {
          field: "terms",
          callback: (value) => {
            let termsNames = []
            termsNames.push(...value)
            termsNames = termsNames.map((item) => {
              return item.name
            })
            return [...termsNames]
          }
        },
        "learning paths": {
          field: "learning_paths",
          callback: (value) => {
            let learning_pathsNames = []
            learning_pathsNames.push(...value)
            learning_pathsNames = learning_pathsNames.map((item) => {
              return item.name
            })
            return [...learning_pathsNames]
          }
        },
        "supervisors": {
          field: "supervisors",
          callback: (value) => {
            let supervisors = []
            supervisors.push(...value)
            supervisors = supervisors.map((item) => {
              return item.name
            })
            return [...supervisors]
          }
        },
        "missions count": "missions_count",
      }
    },
    missionReportListHeaders() {
      return [
        {
          key: "studyYear.name",
          label: this.$i18n.t("TABLE_FIELDS.studyYear"),
        },
        {
          key: "levels",
          label: this.$i18n.t("schoolAdmin.level"),
        },
        {
          key: "terms",
          label: this.$i18n.t("MISSIONS.terms"),
        },
        {
          key: "learning_paths",
          label: this.$i18n.t("TABLE_FIELDS.learning_paths"),
        },
        {
          key: "supervisors",
          label: this.$i18n.t("TABLE_FIELDS.supervisor"),
        },
        {
          key: "missions_count",
          label: this.$i18n.t("TABLE_FIELDS.missions_count"),
        },
      ]
    },
    subMissionsReportList() {
      return [
        {
          key: "studyYear.name",
          label: this.$i18n.t("TABLE_FIELDS.studyYear"),
        },
        {
          key: "levels",
          label: this.$i18n.t("schoolAdmin.level"),
        },
        {
          key: "terms",
          label: this.$i18n.t("MISSIONS.terms"),
        },
        {
          key: "learning_paths",
          label: this.$i18n.t("TABLE_FIELDS.learning_paths"),
        },
        {
          key: "supervisors",
          label: this.$i18n.t("TABLE_FIELDS.supervisor"),
        },
        {
          key: "missions_count",
          label: this.$i18n.t("TABLE_FIELDS.missions_count"),
        },
      ]
    },
    pdfName() {
      return `${this.$t('REPORTS.missionsHeading')} - ${new Date().toLocaleString()}`
    },
    chartData() {
      return {
        datasets: [
          {
            label: this.$i18n.t('STATISTICS.missions'),
            backgroundColor: '#76236C',
            borderRadius: 5,
            barThickness: 10,
            categoryPercentage: 1,
            barPercentage: 1,
            data: []
          },
        ]
      }
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            rtl: true,
            labels: {
              color: '#000',
              usePointStyle: true,
              pointStyle: 'circle',
              font: {
                size: 16,
                weight: 'bold'
              },
              padding: 25
            },
          },
          tooltip: {
            backgroundColor: "#fff",
            bodyColor: '#000',
          }
        },
        scales: {
          yAxes: {
            ticks: {
              min: 0,
              stepSize: 1
            }
          }
        }
      }
    },
  },
  methods: {
    handleCancel() {
      this.missionsReportSearch.map(field => field.value = "")
      this.searchWithPagination = {}
      this.getMissionsReport()
      this.getMissionsReportChart()
    },
    handleInput(key, value, _, options) {
      if (options) {
        const itemValue = options?.filter((item) => {
          return item.id === value
        })
        this.valuesOfAdvancedSearch[key] = itemValue ? itemValue[0]?.name : ""
      } else {
        this.valuesOfAdvancedSearch[key] = value
      }
    },
    onSubmit(values) {
      this.searchWithPagination = values;
      this.getMissionsReport()
      this.getMissionsReportChart()
    },
    getMissionsReport(paramsWithSearch) {
      const params = {...paramsWithSearch, ...this.searchWithPagination};
      this.filterParams = params
      this.ApiService(getSchoolAdminMissionsRequest(params)).then(response => {
        this.missionsReportList = response.data.data;
        this.totalNumber = response.data.meta.total;
      })
    },
    getAllMissionsReports() {
      return this.ApiService(getSchoolAdminMissionsRequest({
        ...this.filterParams,
        list_all: true
      })).then(response => {
        return this.missionsReportList = response.data.data;
      })
    },
    getMissionsReportChart(paramsWithSearch) {
      this.loadingChart = false
      const params = {...paramsWithSearch, ...this.searchWithPagination};
      this.ApiService(getSchoolAdminMissionsChartRequest(params)).then((response) => {
        this.dataForChart = response.data.data
      }).then(() => {
        this.setData()
      }).then(() => {
        this.loadingChart = true
      })
    },
    generatePdf() {
      this.getAllMissionsReports()
      this.$refs.html2Pdf.generatePdf()
    },
    setData() {
      this.chartData.datasets[0].data = this.dataForChart.map((item) => {
        return {x: item.name, y: item.missions_count}
      })
    },
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
  },
  mounted() {
    getSchoolAdminStudyYear(this.missionsReportSearch, 'study_year_id')
    getAllLevelsForSchoolAdmin(this.missionsReportSearch, 'level_id')
    this.getMissionsReportChart()
    this.getMissionsReport()
  }
}
</script>

<style scoped lang="scss">
@import "index";
</style>
