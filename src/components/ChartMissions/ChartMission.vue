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
import {
  getSupervisorMissionsStatisticsRequest,
  getTeacherMissionsStatisticsRequest
} from "@/api/supervisor-module";
import ApiService from "@/api/ApiService";
import {mapGetters} from "vuex";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)
export default defineComponent({
  name: "ChartMission",
  components: {Doughnut},
  data() {
    return {
      chartIsLoaded: false
    }
  },
  computed: {
    ...mapGetters(['user']),
    chartData() {
      return {
        // labels: ['تمت 25', 'جارية 8', 'معلقة 3'],
        datasets: [
          {
            backgroundColor: ['#76236C', '#40BBF0', '#FFA900'],
            // data: [50, 20, 30],
          }
        ]
      }
    },
    chartOptions() {
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
      default: 'doughnut-chart'
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
    getMissionStatistics() {
      if(this.user.roles[0]?.type.key === "supervisors_management"){
        ApiService(getSupervisorMissionsStatisticsRequest()).then((response) => {
          let MissionsStatistics = response.data.data
          this.chartData.datasets[0].data = [MissionsStatistics.mission_pending, MissionsStatistics.mission_open, MissionsStatistics.mission_compeleted]
          this.chartData.labels = [`معلقة ${MissionsStatistics.mission_pending}`, `جارية ${MissionsStatistics.mission_open}`, `تمت ${MissionsStatistics.mission_compeleted}`]
          this.chartIsLoaded = true
        })
      } else {
        ApiService(getTeacherMissionsStatisticsRequest()).then((response) => {
          let MissionsStatistics = response.data.data
          this.chartData.datasets[0].data = [MissionsStatistics.mission_pending, MissionsStatistics.mission_open, MissionsStatistics.mission_compeleted]
          this.chartData.labels = [`معلقة ${MissionsStatistics.mission_pending}`, `جارية ${MissionsStatistics.mission_open}`, `تمت ${MissionsStatistics.mission_compeleted}`]
          this.chartIsLoaded = true
        })
      }

    }
  },
  mounted() {
    this.getMissionStatistics()
  }
})
</script>
<style scoped lang="scss">

</style>
