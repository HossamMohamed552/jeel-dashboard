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
                  <h5>{{ $t('REPORTS.subscriptionHeading') }}</h5>
                </b-col>
                <b-col lg="3">
                  <span>{{
                      subscriptionReportListHeaders[0].label
                    }}: {{ valuesOfAdvancedSearch.study_year_id }}</span>
                </b-col>
              </b-row>
            </div>
            <div class="header">
              <b-row>
                <b-col>
                  <span>{{ subscriptionReportListHeaders[0].label }}</span>
                </b-col>
                <b-col>
                  <span>{{ subscriptionReportListHeaders[1].label }}</span>
                </b-col>
                <b-col>
                  <span>{{ subscriptionReportListHeaders[2].label }}</span>
                </b-col>
                <b-col>
                  <span>{{ subscriptionReportListHeaders[3].label }}</span>
                </b-col>
                <b-col>
                  <span>{{ subscriptionReportListHeaders[4].label }}</span>
                </b-col>
                <b-col>
                  <span>{{ subscriptionReportListHeaders[5].label }}</span>
                </b-col>
                <b-col>
                  <span>{{ subscriptionReportListHeaders[6].label }}</span>
                </b-col>
              </b-row>
            </div>
            <div v-for="(subscription,index) in subscriptionReportList" :key="subscription.id" class="table-item" :class="index+1 % 7 === 7 ? 'html2pdf__page-break':''">
              <div v-if="index+1 % 8 === 8">
                <div class="filter">
                  <b-row>
                    <b-col lg="12" class="d-flex justify-content-center align-items-center my-2">
                      <h5>{{ $t('REPORTS.subscriptionHeading') }}</h5>
                    </b-col>
                    <b-col lg="3">
                      <span>{{ subscriptionReportListHeaders[0].label }}: {{
                          valuesOfAdvancedSearch.study_year_id
                        }}</span>
                    </b-col>
                  </b-row>
                </div>
                <div class="header">
                  <b-row>
                    <b-col>
                      <span>{{ subscriptionReportListHeaders[0].label }}</span>
                    </b-col>
                    <b-col>
                      <span>{{ subscriptionReportListHeaders[1].label }}</span>
                    </b-col>
                    <b-col>
                      <span>{{ subscriptionReportListHeaders[2].label }}</span>
                    </b-col>
                    <b-col>
                      <span>{{ subscriptionReportListHeaders[3].label }}</span>
                    </b-col>
                    <b-col>
                      <span>{{ subscriptionReportListHeaders[4].label }}</span>
                    </b-col>
                    <b-col>
                      <span>{{ subscriptionReportListHeaders[5].label }}</span>
                    </b-col>
                  </b-row>
                </div>
              </div>
              <b-row>
                <b-col><span>{{ subscription.studyYear.name }}</span></b-col>
                <b-col><span>{{ subscription.package.name }}</span></b-col>
                <b-col><span v-for="level in subscription.levels">{{ level.name }}</span></b-col>
                <b-col class="terms"><span v-for="term in subscription.terms">{{ term.name }}</span></b-col>
                <b-col><span>{{ subscription.users_count }}</span></b-col>
                <b-col><span>{{ subscription.start_subscription }}</span></b-col>
                <b-col><span>{{ subscription.end_subscription }}</span></b-col>
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
  geAllTermsForReports,
  getALLCountriesForReports, getAllLevelsForReports,
  getALLSchoolGroupsForReports,
  getAllSchools, getAllSubscriptionsType, getPackage, getSchoolAdminStudyYear, getStudyYear
} from "@/services/dropdownService";
import {
  getSubscriptionsChartRequest,
  getSubscriptionsRequest
} from "@/api/reports";
import {
  getSchoolAdminSubscriptionsChartRequest,
  getSchoolAdminSubscriptionsRequest
} from "@/api/school-admin-reports";

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
        "الباقة": "package.name",
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
        "عدد المشتركين": "users_count",
        "بداية التعاقد": "start_subscription",
        "نهاية التعاقد": "end_subscription",
      },
      subscriptionReportFields: {
        "package": "package.name",
        "study year": "studyYear.name",
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
        "Number of subscribers": "users_count",
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
          key: "users_count",
          label: this.$i18n.t("REPORTS.user_count"),
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
            label: this.$i18n.t('REPORTS.user_count'),
            backgroundColor: '#F04771',
            borderRadius: 5,
            barThickness: 10,
            categoryPercentage: 1,
            barPercentage: 1,
            data: [],
          },
        ]
      }
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: true,
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
      this.ApiService(getSchoolAdminSubscriptionsRequest(params)).then(response => {
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
              y: packageItem.users_count
            }))
          })
        }
        this.chartData.datasets[0].data = charDataWithPackage
      })
    },
    getSubscriptionsReportChart(paramsWithSearch) {
      this.loadingChart = false
      const params = {...paramsWithSearch, ...this.searchWithPagination};
      this.ApiService(getSchoolAdminSubscriptionsChartRequest(params)).then((response) => {
        this.dataForChart = response.data.data
      }).then(() => {
        this.setData()
      }).then(() => {
        this.loadingChart = true
      })
    },
    getAllSubscriptionReports() {
      return this.ApiService(getSchoolAdminSubscriptionsRequest({
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
    getSchoolAdminStudyYear(this.subscriptionReportSearch, 'study_year_id')
    this.getSubscriptionReport()
    this.getSubscriptionsReportChart()
  }
}
</script>

<style scoped lang="scss">
@import "index";
</style>
