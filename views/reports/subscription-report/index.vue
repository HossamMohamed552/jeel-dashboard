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
                  :schema="subscriptionReportSearch"
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
                <h3>{{ $t('REPORTS.subscriptionHeading') }}</h3>
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
                      :name="pdfName"
                      :title="$t('REPORTS.subscriptionHeading')"
                      :fields="$i18n.locale === 'ar'?  subscriptionReportFieldsAr: subscriptionReportFields "
                      :fetch="getAllSubscriptionReports">
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
                    :fieldsList="subscriptionReportListHeaders"
                    :tableItems="subscriptionReportList"
                    :number-of-item="totalNumber"
                    @refetch="getSubscriptionReport($event)"
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
                  <h5>{{ $t('REPORTS.subscriptionHeading') }}</h5>
                </b-col>
                <b-col lg="3">
                  <span>{{
                      subscriptionReportListHeaders[0].label
                    }}: {{ valuesOfAdvancedSearch.study_year_id }}</span>
                </b-col>
                <b-col lg="3">
                  <span>{{
                      subscriptionReportListHeaders[1].label
                    }}: {{ valuesOfAdvancedSearch.country_id }}</span>
                </b-col>
                <b-col lg="3">
                  <span>{{
                      subscriptionReportListHeaders[2].label
                    }}: {{ valuesOfAdvancedSearch.school_group_id }}</span>
                </b-col>
                <b-col lg="3">
                  <span>{{
                      subscriptionReportListHeaders[3].label
                    }}: {{ valuesOfAdvancedSearch.school_id }}</span>
                </b-col>
                <b-col lg="3">
                  <span>{{
                      subscriptionReportListHeaders[4].label
                    }} : {{ valuesOfAdvancedSearch.package_id }}</span>
                </b-col>
                <b-col lg="3">
                  <span>{{
                      subscriptionReportListHeaders[5].label
                    }} : {{ valuesOfAdvancedSearch.level_id }}</span>
                </b-col>
                <b-col lg="3">
                  <span>{{
                      subscriptionReportListHeaders[6].label
                    }} : {{ valuesOfAdvancedSearch.term_id }}</span>
                </b-col>
                <b-col lg="3">
                  <span>{{
                      subscriptionReportListHeaders[7].label
                    }} : {{ valuesOfAdvancedSearch.start_date }}</span>
                </b-col>
                <b-col lg="3">
                  <span>{{
                      subscriptionReportListHeaders[8].label
                    }} : {{ valuesOfAdvancedSearch.end_date }}</span>
                </b-col>
              </b-row>
            </div>
            <div class="header">
              <b-row>
                <b-col>
                  <span>{{ subscriptionReportListHeaders[0].label }}</span>
                </b-col>
                <b-col lg="1">
                  <span>{{ subscriptionReportListHeaders[1].label }}</span>
                </b-col>
                <b-col>
                  <span>{{ subscriptionReportListHeaders[2].label }}</span>
                </b-col>
                <b-col lg="1">
                  <span>{{ subscriptionReportListHeaders[3].label }}</span>
                </b-col>
                <b-col lg="1">
                  <span>{{ subscriptionReportListHeaders[4].label }}</span>
                </b-col>
                <b-col>
                  <span>{{ subscriptionReportListHeaders[5].label }}</span>
                </b-col>
                <b-col>
                  <span>{{ subscriptionReportListHeaders[6].label }}</span>
                </b-col>
                <b-col>
                  <span>{{ subscriptionReportListHeaders[7].label }}</span>
                </b-col>
                <b-col>
                  <span>{{ subscriptionReportListHeaders[8].label }}</span>
                </b-col>
              </b-row>
            </div>
            <div v-for="(subscription,index) in subscriptionReportList" :key="subscription.id"
                 class="table-item" :class="index+1 % 7 === 7 ? 'html2pdf__page-break':''">
              <div v-if="index+1 % 8 === 8">
                <div class="filter">
                  <b-row>
                    <b-col lg="12" class="d-flex justify-content-center align-items-center my-2">
                      <h5>{{ $t('REPORTS.subscriptionHeading') }}</h5>
                    </b-col>
                    <b-col lg="3">
                      <span>{{subscriptionReportListHeaders[0].label}}: {{ valuesOfAdvancedSearch.study_year_id }}</span>
                    </b-col>
                    <b-col lg="3">
                      <span>{{subscriptionReportListHeaders[1].label}}: {{ valuesOfAdvancedSearch.country_id }}</span>
                    </b-col>
                    <b-col lg="3">
                      <span>{{subscriptionReportListHeaders[2].label}}: {{ valuesOfAdvancedSearch.school_group_id }}</span>
                    </b-col>
                    <b-col lg="3">
                      <span>{{subscriptionReportListHeaders[3].label}}: {{ valuesOfAdvancedSearch.school_id }}</span>
                    </b-col>
                    <b-col lg="3">
                      <span>{{subscriptionReportListHeaders[4].label}} : {{ valuesOfAdvancedSearch.package_id }}</span>
                    </b-col>
                    <b-col lg="3">
                      <span>{{subscriptionReportListHeaders[5].label}} : {{ valuesOfAdvancedSearch.level_id }}</span>
                    </b-col>
                    <b-col lg="3">
                      <span>{{subscriptionReportListHeaders[6].label}} : {{ valuesOfAdvancedSearch.term_id }}</span>
                    </b-col>
                    <b-col lg="3">
                      <span>{{subscriptionReportListHeaders[7].label}} : {{ valuesOfAdvancedSearch.start_date }}</span>
                    </b-col>
                    <b-col lg="3">
                      <span>{{subscriptionReportListHeaders[8].label}} : {{ valuesOfAdvancedSearch.end_date }}</span>
                    </b-col>
                  </b-row>
                </div>
                <div class="header">
                  <b-row>
                    <b-col>
                      <span>{{ subscriptionReportListHeaders[0].label }}</span>
                    </b-col>
                    <b-col lg="1">
                      <span>{{ subscriptionReportListHeaders[1].label }}</span>
                    </b-col>
                    <b-col>
                      <span>{{ subscriptionReportListHeaders[2].label }}</span>
                    </b-col>
                    <b-col lg="1">
                      <span>{{ subscriptionReportListHeaders[3].label }}</span>
                    </b-col>
                    <b-col lg="1">
                      <span>{{ subscriptionReportListHeaders[4].label }}</span>
                    </b-col>
                    <b-col>
                      <span>{{ subscriptionReportListHeaders[5].label }}</span>
                    </b-col>
                    <b-col>
                      <span>{{ subscriptionReportListHeaders[6].label }}</span>
                    </b-col>
                    <b-col>
                      <span>{{ subscriptionReportListHeaders[7].label }}</span>
                    </b-col>
                    <b-col>
                      <span>{{ subscriptionReportListHeaders[8].label }}</span>
                    </b-col>
                  </b-row>
                </div>
              </div>
              <b-row>
                <b-col><span>{{ subscription.studyYear.name }}</span></b-col>
                <b-col lg="1"><span>{{ subscription.country.name }}</span></b-col>
                <b-col><span>{{ subscription.schoolGroup.name }}</span></b-col>
                <b-col lg="1"><span>{{ subscription.school.name }}</span></b-col>
                <b-col lg="1"><span>{{ subscription.package.name }}</span></b-col>
                <b-col><span v-for="level in subscription.levels">{{ level.name }}</span></b-col>
                <b-col class="terms"><span v-for="term in subscription.terms">{{ term.name }}</span></b-col>
                <b-col><span>{{ subscription.start_subscription }}</span></b-col>
                <b-col><span>{{ subscription.end_subscription }}</span></b-col>
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
  geAllTermsForReports,
  getALLCountriesForReports, getAllLevelsForReports,
  getALLSchoolGroupsForReports,
  getAllSchools, getAllSubscriptionsType, getPackage, getStudyYear
} from "@/services/dropdownService";
import {
  getSubscriptionsChartRequest,
  getSubscriptionsRequest
} from "@/api/reports";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
export default {
  name: "index",
  components: {ListItems, ShowItem, Button, GenericForm, Bar},
  data() {
    return {
      collapsed: false,
      loading: false,
      activeTap: 1,
      subscriptionsExport: [],
      subscriptionReportFieldsAr: {
        "الدولة": "country.name",
        "الباقة": "package.name",
        "المدرسة": "school.name",
        "المجموعةالدراسية": "schoolGroup.name",
        "العام الدراسي": "studyYear.name",
        "نسبة خصم للباقة": "package_discount",
        "سعر الباقة بعد الخصم": "price_after_discount",
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
        "بداية التعاقد": "start_subscription",
        "نهاية التعاقد": "end_subscription",
      },
      subscriptionReportFields: {
        "country": "country.name",
        "package": "package.name",
        "school": "school.name",
        "school group": "schoolGroup.name",
        "study year": "studyYear.name",
        "package discount": "package_discount",
        "price after discount": "price_after_discount",
        "levels": {
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
        "start subscription": "start_subscription",
        "end subscription": "end_subscription",
      },
      subscriptionReportSearch: [
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
          label: "مجموعات الدراسية",
          labelEn: "school Groups",
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
        {
          key: "package_id",
          col: "3",
          type: "select",
          optionValue: "name",
          listen: "id",
          label: "الدولة",
          labelEn:"package",
          options: [],
          deselectFromDropdown: true,
          disabled: true,
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
          labelEn:"levels",
          options: [],
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
          labelEn:"terms",
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "",
        },
        {
          key: "status",
          col: "3",
          type: "select",
          optionValue: "name",
          listen: "id",
          label: "الحالة",
          labelEn:"status",
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "",
        },
        {
          key: "start_date",
          col: "3",
          type: "date",
          label: "بداية الإشتراك",
          labelEn:"start date subscription",
          value: "",
          rules: "",
        },
        {
          key: "end_date",
          col: "3",
          type: "date",
          label: "نهاية الإشتراك",
          labelEn:"end date subscription",
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
      subscriptionReportList: [],
      totalNumber: null,
      searchWithPagination: {},
      loadingChart: false,
      valuesOfAdvancedSearch: {
        study_year_id: "",
        country_id: "",
        school_group_id: "",
        school_id: "",
        package_id: "",
        level_id: "",
        term_id: "",
        status: "",
        start_date: "",
        end_date: ""
      }
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
    }
  },
  computed: {
    subscriptionReportListHeaders() {
      return [
        {
          key: "studyYear.name",
          label: this.$i18n.t("TABLE_FIELDS.studyYear"),
        },
        {
          key: "country.name",
          label: this.$i18n.t("TABLE_FIELDS.country"),
        },
        {
          key: "schoolGroup.name",
          label: this.$i18n.t("TABLE_FIELDS.school_group"),
        },
        {
          key: "school.name",
          label: this.$i18n.t("TABLE_FIELDS.school"),
        },
        {
          key: "package.name",
          label: this.$i18n.t("TABLE_FIELDS.package"),
        },
        {
          key: "levels",
          label: this.$i18n.t("TABLE_FIELDS.jeel_library_level"),
        },
        {
          key: "terms",
          label: this.$i18n.t("MISSIONS.terms"),
        },
        {
          key: "start_subscription",
          label: this.$i18n.t("TABLE_FIELDS.start_subscription"),
        },
        {
          key: "end_subscription",
          label: this.$i18n.t("TABLE_FIELDS.end_subscription"),
        },
      ]
    },
    chartData() {
      return {
        datasets: [
          {
            label: this.$i18n.t('TABLE_FIELDS.packages'),
            backgroundColor: '#F04771',
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
    pdfName() {
      return `${this.$t('REPORTS.subscriptionHeading')} - ${new Date().toLocaleString()}`
    }
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    handleInput(key, value, _, options) {
      if (key === 'country_id' && value !== '') {
        this.subscriptionReportSearch[4].disabled = false;
        getPackage(this.subscriptionReportSearch, 'package_id', this.subscriptionReportSearch[1].value, this.subscriptionReportSearch[2].value, this.subscriptionReportSearch[4].value)
      } else if (key === 'school_group_id' && value !== '') {
        this.subscriptionReportSearch[3].disabled = false;
        getAllSchools(this.subscriptionReportSearch, 'school_id', this.subscriptionReportSearch[0].value, this.subscriptionReportSearch[1].value, this.subscriptionReportSearch[2].value)
      }
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
      this.getSubscriptionReport()
      this.getSubscriptionsReportChart()
    },
    handleCancel() {
      this.subscriptionReportSearch.map(field => field.value = "")
      this.searchWithPagination = {}
      this.getSubscriptionReport()
      this.getSubscriptionsReportChart()
    },
    getSubscriptionReport(paramsWithSearch) {
      const params = {...paramsWithSearch, ...this.searchWithPagination};
      this.filterParams = params
      this.ApiService(getSubscriptionsRequest(params)).then(response => {
        this.subscriptionReportList = response.data.data;
        this.totalNumber = response.data.meta.total;
      })
    },
    setData() {
      let charDataWithPackage = [];
      this.dataForChart.forEach((studyYearItem) => {
        let studyYearName = studyYearItem.name
        if (studyYearItem.packages) {
          studyYearItem.packages.forEach((packageItem) => {
            charDataWithPackage.push(Object.assign({}, {
              x: studyYearName,
              y: packageItem.total
            }))
          })
        }
        this.chartData.datasets[0].data = charDataWithPackage
      })
    },
    getSubscriptionsReportChart(paramsWithSearch) {
      this.loadingChart = false
      const params = {...paramsWithSearch, ...this.searchWithPagination};
      this.ApiService(getSubscriptionsChartRequest(params)).then((response) => {
        this.dataForChart = response.data.data
      }).then(() => {
        this.setData()
      }).then(() => {
        this.loadingChart = true
      })
    },
    getAllSubscriptionReports() {
      return this.ApiService(getSubscriptionsRequest({
        ...this.filterParams,
        list_all: true
      })).then(response => {
        return this.subscriptionReportList = response.data.data;
      })
    },
    generatePdf() {
      this.getAllSubscriptionReports()
      this.$refs.html2Pdf.generatePdf()
    },
  },
  mounted() {
    getStudyYear(this.subscriptionReportSearch, 'study_year_id')
    getALLCountriesForReports(this.subscriptionReportSearch, 'country_id')
    getALLSchoolGroupsForReports(this.subscriptionReportSearch, 'school_group_id')
    getAllLevelsForReports(this.subscriptionReportSearch, 'level_id')
    geAllTermsForReports(this.subscriptionReportSearch, 'term_id')
    getAllSubscriptionsType(this.subscriptionReportSearch, 'status')
    this.getSubscriptionReport()
    this.getSubscriptionsReportChart()
  }
}
</script>

<style scoped lang="scss">
@import "index";
</style>
