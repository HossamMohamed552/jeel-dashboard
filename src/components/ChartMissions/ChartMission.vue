<template>
  <Doughnut
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
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)
export default defineComponent({
  name: "ChartMission",
  components: {Doughnut},
  data(){
    return{
      chartData: {
        labels: ['تمت 25', 'جارية 8', 'معلقة 3'],
        datasets: [
          {
            backgroundColor: ['#76236C', '#40BBF0', '#FFA900'],
            data: [50, 20, 30],
          }
        ]
      },
      chartOptions: {
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
})
</script>
<style scoped lang="scss">

</style>
