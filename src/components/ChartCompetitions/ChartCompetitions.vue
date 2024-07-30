<template>
  <Doughnut
    v-if="chartIsLoaded"
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :width="width"
    :height="height"
  />
</template>
<script>
import {defineComponent} from 'vue'
import {Doughnut} from "vue-chartjs/legacy";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale
} from 'chart.js'
import ApiService from "@/api/ApiService";
import {
  getSupervisorCompetitionsStatisticsRequest,
  getSupervisorMissionsStatisticsRequest
} from "@/api/supervisor-module";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)
export default defineComponent({
  name: "ChartCompetition",
  components: {Doughnut},
  data() {
    return {
      chartIsLoaded: false
    }
  },
  computed: {
    chartData() {
      // labels: ['جارية 8', 'تمت 25' ],
      return {
        datasets: [
          {
            backgroundColor: ['#FF4D80', '#3DDC97', '#1C76FF'],
            // data: [30,70,40],
          }
        ]
      }
    },
    chartOptions(){
      return {
        responsive: true,
        maintainAspectRatio: false,
        borderWidth: 0,
        cutout: '65%',
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
    }
  },
  watch: {
    chartData: {
      handler(newVal) {
        return newVal
      },
      immediate: true,
    },
  },
  props: {
    chartId: {
      type: String,
      default: 'doughnut-chart-competition'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 200
    },
  },
  methods: {
    getCompetitionsStatistics() {
      ApiService(getSupervisorCompetitionsStatisticsRequest()).then((response) => {
        let CompetitionsStatistics = response.data.data
        this.chartData.datasets[0].data = [CompetitionsStatistics.competition_pending, CompetitionsStatistics.competition_open, CompetitionsStatistics.competition_compeleted]
        this.chartData.labels = [`معلقة ${CompetitionsStatistics.competition_pending}`, `جارية ${CompetitionsStatistics.competition_open}`, `تمت ${CompetitionsStatistics.competition_compeleted}`]
        this.chartIsLoaded = true
      })
    }
  },
  mounted() {
    this.getCompetitionsStatistics()
  }
})
</script>
<style scoped lang="scss">

</style>
