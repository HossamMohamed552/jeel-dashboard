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
                  :schema="generalReportSearch"
                  @onSubmit="onSubmit"
                  @handleCancel="handleCancel"
                  @handleInput="handleInput"
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
                <h3>{{ $t('REPORTS.generalHeading') }}</h3>
                <b-dropdown no-caret>
                  <template #button-content>
                    <div class="sort">
                      <img src="../../../src/assets/images/icons/sort.svg"/>
                      <div>
                        {{ $t('REPORTS.export_to') }}
                      </div>
                    </div>
                  </template>
                  <b-dropdown-item>
                    <export-excel
                      ref="exportExcel"
                      :data="generalStatisticsExport">
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
                <b-col v-for="(item,index) in generalStatistics" lg="3" :key="index">
                  <div class="report-card" :class="checkType(item)">
                    <div class="icon">
                      <img :src="item.icon" :alt="item.name" :title="item.name">
                    </div>
                    <div class="info">
                      <p class="name">{{ $t(`REPORTS.${item.name}`) }}</p>
                      <p class="number">{{ item.number }}</p>
                    </div>
                  </div>
                </b-col>
              </b-row>
            </div>
            <div class="col-12" key="2" v-show="activeTap === 2">
              <Bar v-if="loadingChart" :chart-data="chartData" :chart-options="chartOptions"/>
              <b-row class="mt-5">
                <b-col v-for="(role,index) in roleStatistics" :key="index">
                  <div class="role-statistic">
                    <h4>{{ $t(`REPORTS.${role.name}`) }}</h4>
                    <div class="svg-item">
                      <svg width="100%" height="100%" viewBox="0 0 40 40" class="donut">
                        <circle class="donut-hole" cx="20" cy="20" r="15.91549430918954"
                                fill="#fff"></circle>
                        <circle class="donut-ring" cx="20" cy="20" r="15.91549430918954"
                                fill="transparent" stroke-width="3.5"></circle>
                        <circle class="donut-segment donut-segment-2" cx="20" cy="20"
                                r="15.91549430918954" fill="transparent" stroke-width="3.5"
                                :stroke-dasharray="`${role.percentage} ${100-role.percentage}` "
                                stroke-dashoffset="25"></circle>
                        <g class="donut-text donut-text-1">
                          <text y="50%" transform="translate(0, 2)">
                            <tspan x="50%" text-anchor="middle" class="donut-percent">
                              {{ role.percentage }}%
                            </tspan>
                          </text>
                        </g>
                      </svg>
                    </div>
                  </div>
                </b-col>
              </b-row>
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
                  <h5>{{ $t('REPORTS.generalHeading') }}</h5>
                </b-col>
                <b-col lg="3">
                  <span>{{ $t(`TABLE_FIELDS.studyYear`) }}: {{
                      valuesOfAdvancedSearch.study_year_id
                    }}</span>
                </b-col>
                <b-col lg="3">
                  <span>{{ $t(`TABLE_FIELDS.countryName`) }}: {{
                      valuesOfAdvancedSearch.country_id
                    }}</span>
                </b-col>
                <b-col lg="3">
                  <span>{{ $t(`TABLE_FIELDS.schoolGroups`) }}: {{
                      valuesOfAdvancedSearch.school_group_id
                    }}</span>
                </b-col>
                <b-col lg="3">
                  <span>{{ $t(`TABLE_FIELDS.schools`) }}: {{
                      valuesOfAdvancedSearch.school_id
                    }}</span>
                </b-col>
              </b-row>
            </div>
            <b-row>
              <b-col v-for="(item,index) in generalStatistics" lg="4" :key="index">
                <div class="report-card mb-2" :class="checkType(item)">
                  <div class="info">
                    <p class="name">{{ $t(`REPORTS.${item.name}`) }}</p>
                    <p class="number">{{ item.number }}</p>
                  </div>
                </div>
              </b-col>
            </b-row>
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
  getALLCountriesForReports, getALLSchoolGroupsForReports, getAllSchools,
  getStudyYear,
} from "@/services/dropdownService";
import {
  getJeelAdminReportChartRequest,
  getJeelAdminReportRolesRequest,
  getJeelAdminReportStatisticsRequest
} from "@/api/reports";
import Login from "../../login/index.vue";


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
      generalReportSearch: [
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
          key: "country_id",
          col: "3",
          type: "select",
          optionValue: "name",
          listen: "id",
          label: "الدولة",
          labelEn: "country",
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "",
        },
        {
          key: "school_group_id",
          col: "3",
          type: "select",
          optionValue: "name",
          listen: "id",
          label: "المجموعات الدراسية",
          labelEn: "schoolGroups",
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "",
        },
        {
          key: "school_id",
          col: "3",
          type: "select",
          optionValue: "name",
          listen: "id",
          label: "المدارس",
          labelEn: "schools",
          options: [],
          deselectFromDropdown: true,
          disabled: true,
          value: "",
          rules: "",
        },
      ],
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
      dataForChart: [],
      generalStatistics: [
        {
          icon: require("../../../src/assets/images/icons/home.png"),
          name: "schoolGroup",
          number: 45
        },
        {
          icon: require("../../../src/assets/images/icons/home.png"),
          name: "school",
          number: 8
        },
        {
          icon: require("../../../src/assets/images/icons/levels.svg"),
          name: "levels",
          number: 1058
        },
        {
          icon: require("../../../src/assets/images/icons/classes.svg"),
          name: "classes",
          number: 1028
        },
        {
          icon: require("../../../src/assets/images/icons/school-admin.svg"),
          name: "schoolAdmin",
          number: 45
        },
        {
          icon: require("../../../src/assets/images/icons/supervisor.svg"),
          name: "supervisors",
          number: 102
        },
        {
          icon: require("../../../src/assets/images/icons/teachers.svg"),
          name: "teachers",
          number: 90
        },
        {
          icon: require("../../../src/assets/images/icons/students.svg"),
          name: "students",
          number: 65
        },
        {
          icon: require("../../../src/assets/images/icons/parents.svg"),
          name: "parents",
          number: 30
        }
      ],
      valuesOfAdvancedSearch: {
        study_year_id: ``,
        country_id: ``,
        school_group_id: ``,
        school_id: ``,
      },
      reportFields: {},
      generalStatisticsExport: [],
      roleStatistics: [],
    }
  },
  methods: {
    handleCancel() {
      this.generalReportSearch.map(field => field.value = "")
      this.searchWithPagination = {}
      this.getJeelAdminReportStatistics()
      this.getJeelAdminReportChart()
      this.getJeelAdminReportRoles()
    },
    onSubmit(values) {
      this.getJeelAdminReportStatistics(values)
      this.getJeelAdminReportChart(values)
      this.getJeelAdminReportRoles(values)
    },
    handleInput(key, value, _, options) {
      if (key === 'school_group_id' && value !== '') {
        this.generalReportSearch[3].disabled = false;
        getAllSchools(this.generalReportSearch, 'school_id', this.generalReportSearch[0].value, this.generalReportSearch[1].value, this.generalReportSearch[2].value)
      }
      if (options) {
        const itemValue = options?.filter((item) => {
          return item.id === value
        })
        if (itemValue.length > 0) {
          this.valuesOfAdvancedSearch[key] = itemValue[0]?.name
        }
      } else {
        this.valuesOfAdvancedSearch[key] = value
      }
    },
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    checkType(item) {
      return {
        schoolGroupClass: item.name === "schoolGroup",
        schoolClass: item.name === "school",
        levelsClass: item.name === "levels",
        classesClass: item.name === "classes",
        schoolAdminClass: item.name === "schoolAdmin",
        supervisorsClass: item.name === "supervisors",
        teachersClass: item.name === "teachers",
        studentsClass: item.name === "students",
        parentsClass: item.name === "parents",
      }
    },
    setData() {
      this.chartData.datasets.forEach((item) => {
        return Object.assign(item, {data: this.dataForChart})
      })
    },
    getJeelAdminReportStatistics(paramsWithSearch) {
      this.generalStatisticsExport = []
      const params = {...paramsWithSearch, ...this.searchWithPagination};
      this.ApiService(getJeelAdminReportStatisticsRequest(params)).then((response) => {
        let data = response.data.data
        this.generalStatisticsExport.push(data)
        this.generalStatistics[0].number = data.school_group
        this.generalStatistics[1].number = data.school
        this.generalStatistics[2].number = data.levels
        this.generalStatistics[3].number = data.classes
        this.generalStatistics[4].number = data.admins
        this.generalStatistics[5].number = data.supervisors
        this.generalStatistics[6].number = data.teachers
        this.generalStatistics[7].number = data.students
        this.generalStatistics[8].number = data.paretns

        for (const [key, value] of Object.entries(response.data.data)) {
          this.reportFields[key] = value
        }
      })
    },
    getJeelAdminReportChart(paramsWithSearch) {
      const params = {...paramsWithSearch, ...this.searchWithPagination};
      this.loadingChart = false
      this.ApiService(getJeelAdminReportChartRequest(params)).then((response) => {
        this.dataForChart = response.data.data
      }).then(() => {
        this.setData()
      }).then(() => {
        this.loadingChart = true
      })
    },
    getJeelAdminReportRoles(paramsWithSearch) {
      this.roleStatistics = []
      const params = {...paramsWithSearch, ...this.searchWithPagination};
      this.ApiService(getJeelAdminReportRolesRequest(params)).then((response) => {
        for (const [key, value] of Object.entries(response.data.data)) {
          this.roleStatistics.push({name: key, percentage: value})
        }
      })
    },
    generatePdf() {
      this.$refs.html2Pdf.generatePdf()
    },
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
    }
  },
  computed: {
    pdfName() {
      return `${this.$t('REPORTS.subscriptionHeading')} - ${new Date().toLocaleString()}`
    },
    chartData() {
      return {
        datasets: [
          {
            label: this.$i18n.t('TABLE_FIELDS.country'),
            backgroundColor: '#F04771',
            borderRadius: 5,
            barThickness: 10,
            categoryPercentage: 1,
            barPercentage: 1,
            parsing: {
              yAxisKey: 'countries',
              xAxisKey: 'name'
            }
          },
          {
            label: this.$i18n.t('TABLE_FIELDS.schoolGroup'),
            backgroundColor: '#FFC700',
            borderRadius: 5,
            barThickness: 10,
            categoryPercentage: 1,
            barPercentage: 1,
            parsing: {
              yAxisKey: 'school_groups',
              xAxisKey: 'name'
            }
          },
          {
            label: this.$i18n.t('TABLE_FIELDS.school'),
            backgroundColor: '#039FF7',
            borderRadius: 5,
            barThickness: 10,
            categoryPercentage: 1,
            barPercentage: 1,
            parsing: {
              yAxisKey: 'schools',
              xAxisKey: 'name'
            }
          }
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
  mounted() {
    getStudyYear(this.generalReportSearch, 'study_year_id')
    getALLCountriesForReports(this.generalReportSearch, 'country_id')
    getALLSchoolGroupsForReports(this.generalReportSearch, 'school_group_id')
    this.getJeelAdminReportStatistics()
    this.getJeelAdminReportChart()
    this.getJeelAdminReportRoles()
  }
}
</script>

<style scoped lang="scss">
@import "index";
</style>
