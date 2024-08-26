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
                  :schema="competitionsReportSearch"
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
                <h3>{{ $t('REPORTS.competitionHeading') }}</h3>
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
                      :title="$t('REPORTS.competitionHeading')"
                      :fields="$i18n.locale === 'ar'? competitionReportFieldsAr : competitionReportFields"
                      :fetch="getAllCompetitionsReports">
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
                    :fieldsList="subCompetitionsReportList"
                    :tableItems="competitionsReportList"
                    :number-of-item="totalNumber"
                    @refetch="getCompetitionsReport"
                    :loading="loading"
                    :showSortControls="false"
                  >
                  </ListItems>
                </b-col>
              </b-row>
            </div>
            <div class="col-12" key="2" v-show="activeTap === 2">
              <Bar v-if="loadingChart" :chart-data="chartData" :chart-options="chartOptions"/>
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
                  <h5>{{ $t('REPORTS.competitionHeading') }}</h5>
                </b-col>
                <b-col lg="3">
                  <span>{{
                      competitionReportListHeaders[0].label
                    }}: {{ valuesOfAdvancedSearch.study_year_id }}</span>
                </b-col>
                <b-col lg="3">
                  <span>{{ competitionReportListHeaders[1].label }} : {{
                      valuesOfAdvancedSearch.level_id
                    }}</span>
                </b-col>
              </b-row>
            </div>
            <div class="header">
              <b-row>
                <b-col>
                  <span>{{ competitionReportListHeaders[0].label }}</span>
                </b-col>
                <b-col>
                  <span>{{ competitionReportListHeaders[1].label }}</span>
                </b-col>
                <b-col>
                  <span>{{ competitionReportListHeaders[2].label }}</span>
                </b-col>
                <b-col>
                  <span>{{ competitionReportListHeaders[3].label }}</span>
                </b-col>
                <b-col>
                  <span>{{ competitionReportListHeaders[4].label }}</span>
                </b-col>
                <b-col>
                  <span>{{ competitionReportListHeaders[5].label }}</span>
                </b-col>
                <b-col>
                  <span>{{ competitionReportListHeaders[6].label }}</span>
                </b-col>
                <b-col>
                  <span>{{ competitionReportListHeaders[7].label }}</span>
                </b-col>
                <b-col>
                  <span>{{ competitionReportListHeaders[8].label }}</span>
                </b-col>
                <b-col>
                  <span>{{ competitionReportListHeaders[9].label }}</span>
                </b-col>
                <b-col>
                  <span>{{ competitionReportListHeaders[10].label }}</span>
                </b-col>
              </b-row>
            </div>
            <div v-for="(competition,index) in competitionsReportList" :key="competition.id"
                 class="table-item" :class="index+1 % 7 === 7 ? 'html2pdf__page-break':''">
              <div v-if="index+1 % 8 === 8">
                <div class="filter">
                  <b-row>
                    <b-col lg="12" class="d-flex justify-content-center align-items-center my-2">
                      <h5>{{ $t('REPORTS.competitionHeading') }}</h5>
                    </b-col>
                    <b-col lg="3">
                      <span>{{ competitionReportListHeaders[0].label }}: {{
                          valuesOfAdvancedSearch.study_year_id
                        }}</span>
                    </b-col>
                    <b-col lg="3">
                      <span>{{ competitionReportListHeaders[1].label }} : {{
                          valuesOfAdvancedSearch.level_id
                        }}</span>
                    </b-col>
                  </b-row>
                </div>
                <div class="header">
                  <b-row>
                    <b-col>
                      <span>{{ competitionReportListHeaders[0].label }}</span>
                    </b-col>
                    <b-col>
                      <span>{{ competitionReportListHeaders[1].label }}</span>
                    </b-col>
                    <b-col>
                      <span>{{ competitionReportListHeaders[2].label }}</span>
                    </b-col>
                    <b-col>
                      <span>{{ competitionReportListHeaders[3].label }}</span>
                    </b-col>
                    <b-col>
                      <span>{{ competitionReportListHeaders[4].label }}</span>
                    </b-col>
                    <b-col>
                      <span>{{ competitionReportListHeaders[5].label }}</span>
                    </b-col>
                    <b-col>
                      <span>{{ competitionReportListHeaders[6].label }}</span>
                    </b-col>
                    <b-col>
                      <span>{{ competitionReportListHeaders[7].label }}</span>
                    </b-col>
                    <b-col>
                      <span>{{ competitionReportListHeaders[8].label }}</span>
                    </b-col>
                    <b-col>
                      <span>{{ competitionReportListHeaders[9].label }}</span>
                    </b-col>
                    <b-col>
                      <span>{{ competitionReportListHeaders[10].label }}</span>
                    </b-col>
                  </b-row>
                </div>
              </div>
              <b-row>
                <b-col><span>{{ competition.studyYear.name }}</span></b-col>
                <b-col><span>{{ competition.level.name }}</span></b-col>
                <b-col class="terms"><span v-for="term in competition.terms">{{ term.name }}</span>
                </b-col>
                <b-col class="terms"><span
                  v-for="singleClass in competition.class">{{ singleClass.name }}</span></b-col>
                <b-col><span>{{ competition.name }}</span></b-col>
                <b-col><span>{{ competition.participating_user }}</span></b-col>
                <b-col><span>{{ competition.participating_user_finsh }}</span></b-col>
                <b-col><span>{{ Math.floor(competition.participating_user_percentage) }}%</span>
                </b-col>
                <b-col><span>{{ competition.questions_easy }}</span></b-col>
                <b-col><span>{{ competition.questions_medium }}</span></b-col>
                <b-col><span>{{ competition.questions_hard }}</span></b-col>
              </b-row>
            </div>
            <div class="html2pdf__page-break"></div>
            <div class="chart">
              <Bar v-if="loadingChart" :chart-data="chartData" :chart-options="chartOptions"/>
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
  getAllLevelsForSchoolAdmin,
  getSchoolAdminStudyYear,
} from "@/services/dropdownService";
import {
  getSchoolAdminCompetitionsChartRequest,
  getSchoolAdminCompetitionsRequest,
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
      competitionsReportSearch: [
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
          label: "الصف الدراسى",
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
      competitionsReportList: [],
      competitionsSearchFields: [],
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
    competitionReportFieldsAr() {
      return {
        "العام الدراسي": "studyYear.name",
        "الصف الدراسي": "level.name",
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
        "الفصل": {
          field: "class",
          callback: (value) => {
            let classes = []
            classes.push(...value)
            classes = classes.map((item) => {
              return item.name
            })
            return [...classes]
          }
        },
        "المسابقة": "name",
        "عدد الطلاب المشاركين": "participating_user",
        "عدد الطلاب المنتهين من المسابقة": "participating_user_finsh",
        "نسبة الأداء": {
          field: "participating_user_percentage",
          callback: (value) => {
            return `${Math.floor(value)} %`
          }
        },
        "عدد الأسئلة السهلة": "questions_easy",
        "عدد الأسئلة المتوسطة": "questions_medium",
        "عدد الأسئلة الصعبة": "questions_hard",
      }
    },
    competitionReportFields() {
      return {
        "study Year": "studyYear.name",
        "level": "level.name",
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
        "class": {
          field: "class",
          callback: (value) => {
            let classes = []
            classes.push(...value)
            classes = classes.map((item) => {
              return item.name
            })
            return [...classes]
          }
        },
        "competition": "name",
        "No.of participating students": "participating_user",
        "No.of students finished competition": "participating_user_finsh",
        "Performance ratio": {
          field: "participating_user_percentage",
          callback: (value) => {
            return `${Math.floor(value)} %`
          }
        },
        "Number of easy questions": "questions_easy",
        "Number of medium questions": "questions_medium",
        "Number of hard questions": "questions_hard",
      }
    },
    competitionReportListHeaders() {
      return [
        {
          key: "studyYear.name",
          label: this.$i18n.t("TABLE_FIELDS.studyYear"),
        },
        {
          key: "level.name",
          label: this.$i18n.t("schoolAdmin.level"),
        },
        {
          key: "terms",
          label: this.$i18n.t("COMPETITIONS.terms"),
        },
        {
          key: "class",
          label: this.$i18n.t("COMPETITIONS.class"),
        },
        {
          key: "name",
          label: this.$i18n.t("COMPETITIONS.name"),
        },
        {
          key: "participating_user",
          label: this.$i18n.t("COMPETITIONS.participating_user"),
        },
        {
          key: "participating_user_finsh",
          label: this.$i18n.t("COMPETITIONS.participating_user_finsh"),
        },
        {
          key: "participating_user_percentage",
          label: this.$i18n.t("COMPETITIONS.participating_user_percentage"),
        },
        {
          key: "questions_easy",
          label: this.$i18n.t("COMPETITIONS.questions_easy"),
        },
        {
          key: "questions_medium",
          label: this.$i18n.t("COMPETITIONS.questions_medium"),
        },
        {
          key: "questions_hard",
          label: this.$i18n.t("COMPETITIONS.questions_hard"),
        },
      ]
    },
    subCompetitionsReportList() {
      return [
        {
          key: "studyYear.name",
          label: this.$i18n.t("TABLE_FIELDS.studyYear"),
        },
        {
          key: "level.name",
          label: this.$i18n.t("schoolAdmin.level"),
        },
        {
          key: "terms",
          label: this.$i18n.t("COMPETITIONS.terms"),
        },
        {
          key: "class",
          label: this.$i18n.t("COMPETITIONS.class"),
        },
        {
          key: "name",
          label: this.$i18n.t("COMPETITIONS.name"),
        },
        {
          key: "participating_user",
          label: this.$i18n.t("COMPETITIONS.participating_user"),
        },
        {
          key: "participating_user_finsh",
          label: this.$i18n.t("COMPETITIONS.participating_user_finsh"),
        },
        {
          key: "participating_user_percentage",
          label: this.$i18n.t("COMPETITIONS.participating_user_percentage"),
        },
        {
          key: "questions_easy",
          label: this.$i18n.t("COMPETITIONS.questions_easy"),
        },
        {
          key: "questions_medium",
          label: this.$i18n.t("COMPETITIONS.questions_medium"),
        },
        {
          key: "questions_hard",
          label: this.$i18n.t("COMPETITIONS.questions_hard"),
        },
      ]
    },
    chartData() {
      return {
        datasets: [
          {
            label: this.$i18n.t('STATISTICS.competitions'),
            backgroundColor: '#E25199',
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
            titleColor: '#76236C',
            callbacks: {
              label: function (tooltipItems) {
                console.log('tooltipItems', tooltipItems)
                return  `${Math.floor(tooltipItems.formattedValue)}%`+`: نسبة الأداء`
              }
            }
          }
        },
        scales: {
          y: {
            max: 100
          }
        }
      }
    },
    pdfName() {
      return `${this.$t('REPORTS.competitionHeading')} - ${new Date().toLocaleString()}`
    },
  },
  methods: {
    handleCancel() {
      this.competitionsReportSearch.map(field => field.value = "")
      this.searchWithPagination = {}
      this.getCompetitionsReport()
      this.getCompetitionsReportChart()
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
      this.getCompetitionsReport()
      this.getCompetitionsReportChart()
    },
    getCompetitionsReport(paramsWithSearch) {
      const params = {...paramsWithSearch, ...this.searchWithPagination};
      this.filterParams = params
      this.ApiService(getSchoolAdminCompetitionsRequest(params)).then(response => {
        this.competitionsReportList = response.data.data;
        this.totalNumber = response.data.meta.total;
      })
    },
    getAllCompetitionsReports() {
      return this.ApiService(getSchoolAdminCompetitionsRequest({
        ...this.filterParams,
        list_all: true
      })).then(response => {
        return this.competitionsReportList = response.data.data;
      })
    },
    getCompetitionsReportChart(paramsWithSearch) {
      this.loadingChart = false
      const params = {...paramsWithSearch, ...this.searchWithPagination};
      this.ApiService(getSchoolAdminCompetitionsChartRequest(params)).then((response) => {
        this.dataForChart = response.data.data
      }).then(() => {
        this.setData()
      }).then(() => {
        this.loadingChart = true
      })
    },
    generatePdf() {
      this.getAllCompetitionsReports()
      this.$refs.html2Pdf.generatePdf()
    },
    setData() {
      this.chartData.datasets[0].data = this.dataForChart.map((item) => {
        return {x: item.name, y: item.participating_user_percentage}
      })
    },
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
  },
  mounted() {
    getSchoolAdminStudyYear(this.competitionsReportSearch, 'study_year_id')
    getAllLevelsForSchoolAdmin(this.competitionsReportSearch, 'level_id')
    // this.getCompetitionsReportChart()
    this.getCompetitionsReport()
  }
}
</script>

<style scoped lang="scss">
@import "index";
</style>
