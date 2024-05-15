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
                      :fields="subscriptionReportFields"
                      :fetch="getAllSubscriptionReports"
                      :data="subscriptionReportList">
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
          filename="myPDF"
          :pdf-quality="2"
          :manual-pagination="true"
          pdf-format="a4"
          pdf-orientation="landscape"
          pdf-content-width="100%"
          ref="html2Pdf"
        >
          <section slot="pdf-content" class="pdf-content">
            <!-- PDF Content Here -->
            <div class="header">
              <b-row>
                <b-col v-for="headerItem in subscriptionReportListHeaders">
                  <span>{{headerItem.label}}</span>
                </b-col>
              </b-row>
            </div>
            <b-row v-for="(subscription,index) in subscriptionReportList" :key="subscription.id" class="table-item" :class="index+1 % 5 === 5 ? 'html2pdf__page-break':''">
              <b-col><span>{{subscription.studyYear.name}}</span></b-col>
              <b-col><span>{{subscription.country.name}}</span></b-col>
              <b-col><span>{{subscription.schoolGroup.name}}</span></b-col>
              <b-col><span>{{subscription.school.name}}</span></b-col>
              <b-col><span>{{subscription.package.name}}</span></b-col>
              <b-col><span v-for="level in subscription.levels">{{level.name}}</span></b-col>
              <b-col class="terms"><span v-for="term in subscription.terms">{{term.name}}</span></b-col>
              <b-col><span>{{subscription.start_subscription}}</span></b-col>
              <b-col><span>{{subscription.end_subscription}}</span></b-col>
            </b-row>
            <div class="html2pdf__page-break"/>
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
  getJeelAdminReportChartRequest,
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
          label: this.$t("TABLE_FIELDS.studyYear"),
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
          label: this.$t("TABLE_FIELDS.countryName"),
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
          label: this.$t("TABLE_FIELDS.schoolGroups"),
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
          label: this.$t("TABLE_FIELDS.schools"),
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
          label: this.$t("TABLE_FIELDS.package"),
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
          label: this.$t("REPORTS.levels"),
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
          label: this.$t("MISSIONS.terms"),
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
          label: this.$t("REPORTS.status"),
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "",
        },
        {
          key: "start_date",
          col: "3",
          type: "date",
          label: this.$t("TABLE_FIELDS.start_date_subscription"),
          value: "",
          rules: "",
        },
        {
          key: "end_date",
          col: "3",
          type: "date",
          label: this.$t("TABLE_FIELDS.end_date_subscription"),
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
      subscriptionReportListHeaders: [
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
      ],
      loadingChart: false,
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
        maintainAspectRatio: false,
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
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    handleInput(key, value) {
      if (key === 'country_id' && value !== '') {
        this.subscriptionReportSearch[4].disabled = false;
        getPackage(this.subscriptionReportSearch, 'package_id', this.subscriptionReportSearch[1].value, this.subscriptionReportSearch[2].value, this.subscriptionReportSearch[4].value)
      } else if (key === 'school_group_id' && value !== '') {
        this.subscriptionReportSearch[3].disabled = false;
        getAllSchools(this.subscriptionReportSearch, 'school_id', this.subscriptionReportSearch[0].value, this.subscriptionReportSearch[1].value, this.subscriptionReportSearch[2].value)
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
