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
                <div class="sort">
                  <img src="../../../src/assets/images/icons/sort.svg"/>
                  <select>
                    <option value="" selected disabled>{{ $t('REPORTS.export_to') }}</option>
                    <option v-for="(item, index) in exportArray" :id="item.id" :value="item.value"
                            :key="index">
                      {{ $i18n.locale === 'ar' ? item.name : item.nameEn }}
                    </option>
                  </select>
                </div>
              </div>
              <b-row>
                <b-col v-for="item in generalStatistics" lg="3">
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
            </div>
          </transition-group>
        </div>
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
          label: this.$t("studyYear.name"),
          options: [],
          deselectFromDropdown: true,
          value: "",
          rules: "",
        },
        {
          key: "country_id",
          col: "3",
          type: "select",
          optionValue: "name",
          listen: "id",
          label: this.$t("country.name"),
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
          label: this.$t("schoolGroup.name"),
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
          label: this.$t("school.name"),
          options: [],
          deselectFromDropdown: true,
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
      dataForChart: [
        {study_year: '2010-2011', country: 100, schoolGroup: 50, school: 50}, {
          study_year: '2011-2012',
          country: 100,
          schoolGroup: 55,
          school: 75
        }, {study_year: ' 2012-2013', country: 120, schoolGroup: 55, school: 75}],
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
          icon: require("../../../src/assets/images/icons/home.png"),
          name: "levels",
          number: 1058
        },
        {
          icon: require("../../../src/assets/images/icons/home.png"),
          name: "classes",
          number: 1028
        },
        {
          icon: require("../../../src/assets/images/icons/home.png"),
          name: "schoolAdmin",
          number: 45
        },
        {
          icon: require("../../../src/assets/images/icons/home.png"),
          name: "supervisors",
          number: 102
        },
        {
          icon: require("../../../src/assets/images/icons/home.png"),
          name: "teachers",
          number: 90
        },
        {
          icon: require("../../../src/assets/images/icons/home.png"),
          name: "students",
          number: 65
        },
        {
          icon: require("../../../src/assets/images/icons/home.png"),
          name: "parents",
          number: 30
        }
      ]
    }
  },
  methods: {
    onSubmit(values) {

    },
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    checkType(item) {
      return {
        schoolGroupClass: item.name === "schoolGroup" ,
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
    setData(){
      this.loadingChart = false
      this.chartData.datasets.forEach((item) => {
        return Object.assign(item, {data: this.dataForChart})
      })
      this.loadingChart = true
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
    "$i18n.locale"(newVal){
      if (newVal){
        this.setData()
      }
    }
  },
  computed: {
    chartData() {
      return {
        datasets: [
          {
            label: this.$i18n.t('TABLE_FIELDS.country'),
            backgroundColor: '#F04771',
            borderRadius: 5,
            barThickness: 10,
            parsing: {
              yAxisKey: 'country',
              xAxisKey: 'study_year'
            }
          },
          {
            label: this.$i18n.t('TABLE_FIELDS.schoolGroup'),
            backgroundColor: '#FFC700',
            borderRadius: 5,
            barThickness: 10,
            parsing: {
              yAxisKey: 'schoolGroup',
              xAxisKey: 'study_year'
            }
          },
          {
            label: this.$i18n.t('TABLE_FIELDS.school'),
            backgroundColor: '#039FF7',
            borderRadius: 5,
            barThickness: 10,
            parsing: {
              yAxisKey: 'school',
              xAxisKey: 'study_year'
            }
          }
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
        }
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
     this.setData()
    })
  }
}
</script>

<style scoped lang="scss">
@import "index";
</style>
