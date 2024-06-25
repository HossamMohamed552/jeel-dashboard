<template>
  <section class="hold-bar-chart">
    <div class="title">{{title}}</div>
    <div class="bar-chart">
      <div class="pos-100">100</div>
      <div class="pos-80">80</div>
      <div class="pos-60">60</div>
      <div class="pos-40">40</div>
      <div class="pos-20">20</div>
      <div class="row h-100" v-if="typeOfChart === 'missions'">
        <div class="col" v-for="mission in missionsInChart" :key="mission.id">
          <div class="mission">
            <div class="learningPaths">
              <div class="learning-path" :style="`height: ${Math.floor(learning_path.total_percentage)}%`" v-for="learning_path in mission.learning_paths" :key="learning_path.id"></div>
            </div>
            <div class="mission-name">{{ mission.name }}</div>
            <div class="resume">
              <div class="resume-mission-name">{{ mission.name }}</div>
              <div class="hold-learningPaths">
                <div class="resume-learning-path" v-for="learning_path in mission.learning_paths" :key="learning_path.id">
                  <div class="pointer"></div>
                  <div class="learning-path-name">{{ learning_path.name }}</div>
                  <div class="learning-path-percentage">% {{ Math.floor(learning_path.total_percentage) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row h-100" v-if="typeOfChart === 'missionContent'">
        <div class="col" v-for="mission in missionContent" :key="mission.id">
          <div class="mission">
            <div class="mission-content">
              <div class="mission-content-type" :style="`height: ${Math.floor(mission.paperworks_participatory_percentage)}%`"></div>
              <div class="mission-content-type" :style="`height: ${Math.floor(mission.paperworks_single_percentage)}%`"></div>
              <div class="mission-content-type" :style="`height: ${Math.floor(mission.tasks_percentage)}%`"></div>
              <div class="mission-content-type" :style="`height: ${Math.floor(mission.quizzes_percentage)}%`"></div>
              <div class="mission-content-type" :style="`height: ${Math.floor(mission.videos_percentage)}%`"></div>
            </div>
            <div class="mission-name">{{ mission.name }}</div>
            <div class="resumeContent">
              <div class="hold-mission-content">
                <div class="resume-mission-content">
                  <div class="learning-path-percentage">% {{ mission.paperworks_participatory_percentage ? Math.floor(mission.paperworks_participatory_percentage) : 0 }} {{$t('REPORTS.participatory')}}</div>
                  <div class="learning-path-percentage">% {{ mission.paperworks_single_percentage ? Math.floor(mission.paperworks_single_percentage) : 0 }} {{$t('REPORTS.single')}}</div>
                  <div class="learning-path-percentage">% {{ Math.floor(mission.tasks_percentage) }} {{$t('REPORTS.tasks')}}</div>
                  <div class="learning-path-percentage">% {{ Math.floor(mission.quizzes_percentage) }} {{$t('REPORTS.quizzes')}}</div>
                  <div class="learning-path-percentage">% {{ Math.floor(mission.videos_percentage) }} {{$t('REPORTS.videos')}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "barChart",
  props: {
    typeOfChart:{
      type:String,
      default:""
    },
    title: {
      type: String,
      default: ""
    },
    missionsInChart: {
      type: Array,
      default: []
    },
    missionContent:{
      type: Array,
      default: []
    }
  }
}
</script>
<style scoped lang="scss">
@import "index";
</style>
