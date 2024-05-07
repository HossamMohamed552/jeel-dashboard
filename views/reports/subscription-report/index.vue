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
                <h3>{{ $t('REPORTS.subscriptionHeading') }}</h3>
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
                <b-col lg="12">
                  <ListItems
                    class="m-0 p-0"
                    :fieldsList="subscriptionReportList"
                    @refetch="getSubscriptionReport"
                    :loading="loading"
                    :showSortControls="false"
                  >
                  </ListItems>
                </b-col>
              </b-row>
            </div>
            <div class="col-12" key="2" v-show="activeTap === 2">
              <Bar :chart-data="chartData" :options="chartOptions"/>
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
      chartData: {
        labels: ['test', 'fcb', 'mad', 'alhaly', '2014-2015', '2015-2016', '2015-2017', '2015-2018'],
        datasets: [
          {
            label: 'الباقة',
            backgroundColor: '#f87979',
            data: [30, 10, 40, 80, 70, 45, 60, 30]
          },
        ]
      },
      chartOptions: {
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
      },
      subscriptionReportList: [
        {
          key: "vid",
          label: this.$i18n.t("TABLE_FIELDS.id"),
        },
        {
          key: "country.name",
          label: this.$i18n.t("TABLE_FIELDS.country"),
        },
        {
          key: "school_group.name",
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
          key: "level.name",
          label: this.$i18n.t("TABLE_FIELDS.jeel_library_level"),
        },
        {
          key: "study_year.name",
          label: this.$i18n.t("TABLE_FIELDS.studyYear"),
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
    }
  },
  methods: {
    onSubmit(values) {

    },
    getSubscriptionReport() {

    },
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
  }
}
</script>

<style scoped lang="scss">
@import "index";
</style>
