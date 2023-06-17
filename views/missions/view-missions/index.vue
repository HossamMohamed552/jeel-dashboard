<template>
  <section class="container-fluid custom-container">
    <div class="show-mission">
      <b-row>
        <b-col lg="12">
          <h2 class="heading">{{ $t('MISSIONS.ShowDetails') }}</h2>
        </b-col>
      </b-row>
      <div class="divider">
        <b-row>
          <b-col lg="4">
            <ShowItem :title="$t('MISSIONS.name')" :subtitle="mission.name"/>
          </b-col>
          <b-col lg="4" v-if="mission && mission.level">
            <ShowItem :title="$t('MISSIONS.level')" :subtitle="mission.level.name"/>
          </b-col>
          <b-col lg="4" v-if="mission && mission.term">
            <ShowItem :title="$t('MISSIONS.terms')" :subtitle="mission.term.name"/>
          </b-col>
          <b-col v-if="mission && mission.mission_image" lg="4" class="mt-4">
            <ShowItem :title="$t('MISSIONS.UPLOAD_IMAGE')"/>
            <img class="mx-2" :src="mission.mission_image" width="120"/>
          </b-col>
        </b-row>
    </div>
      <div class="divider">
        <b-row class="mt-4">
          <b-col lg="4" v-if="mission && mission.country">
            <ShowItem :title="$t('MISSIONS.country')" :subtitle="mission.country.name"/>
          </b-col>
          <b-col lg="4">
            <ShowItem :title="$t('MISSIONS.description')" :subtitle="mission.description"/>
          </b-col>
          <b-col lg="4">
            <ShowItem :title="$t('MISSIONS.duration')" :subtitle="mission.data_range"/>
          </b-col>
        </b-row>
      </div>
      <div class="divider" v-if="mission && mission.learningpaths">
        <b-col lg="12">
          <h2 class="heading heading-content text-center">{{ $t('MISSIONS.content') }}</h2>
        </b-col>
        <b-row class="mt-4" v-for="path in mission.learningpaths" :key="path.id">
          <b-col lg="12" class="mb-4">
            <ShowItem :title="$t('MISSIONS.LEARNING_PATH')" :subtitle="path.name"/>
          </b-col>
          <b-col lg="4">
            <ShowItem :title="$t('MISSIONS.videos')"/>
            <ShowItem v-for="videoPath in path.videos" :key="videoPath.id" :subtitle="videoPath.original_name"/>
          </b-col>
          <b-col lg="4">
            <ShowItem :title="$t('MISSIONS.paperWork')"/>
            <ShowItem v-for="papersWorkPath in path.papersWork" :key="papersWorkPath.id" :subtitle="papersWorkPath.name"/>
          </b-col>
          <b-col lg="4">
            <ShowItem :title="$t('MISSIONS.quizzes')"/>
            <ShowItem v-for="quizPath in path.quizzes" :key="quizPath.id" :subtitle="quizPath.name"/>
          </b-col>
        </b-row>
      </div>
    </div>
  </section>
</template>
<script>
import {getSingleMissionsRequest} from "@/api/missios";
import ShowItem from "@/components/Shared/ShowItem/index.vue";

export default {
  name: "index",
  components: {ShowItem},
  data() {
    return {
      mission: {}
    }
  },
  mounted() {
    this.ApiService(getSingleMissionsRequest(this.$route.params.id)).then((response) => {
      this.mission = response.data.data
      console.log('mission',this.mission)
    })
  }
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
