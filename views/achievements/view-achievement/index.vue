<template>
  <section class="container-fluid custom-container">
    <div class="show-role">
      <div class="hold-fields">
        <b-row>
          <b-col lg="6">
            <h2 class="heading">{{ $t("achievements.DETAILS") }}</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="6">
            <ShowItem class="divider-show" :title="$t('achievements.name')"
                      :subtitle="achievement.name"/>
          </b-col>
          <b-col lg="6">
            <ShowItem class="divider-show" :title="$t('achievements.description')"
                      :subtitle="achievement.description"/>
          </b-col>
          <b-col lg="6" class="mb-3">
            <PreviewMedia
              :header="$t('achievements.titleAudio')"
              :media-name="achievement.name_audio_name"
              :file-size="achievement.name_audio_size"
              :typeOfMedia="'audio'"
              @showModal="showModal(achievement.name_audio,$event)"
            />
          </b-col>
          <b-col lg="6" class="mb-3">
            <PreviewMedia
              :header="$t('achievements.descriptionAudio')"
              :media-name="achievement.description_audio_name"
              :file-size="achievement.description_audio_size"
              :typeOfMedia="'audio'"
              @showModal="showModal(achievement.description_audio,$event)"
            />
          </b-col>
          <b-col lg="6">
            <ShowItem class="divider-show" :title="$t('achievements.interactionType')"
                      :subtitle="achievement.interaction.name"/>
          </b-col>
          <b-col lg="6">
            <ShowItem class="divider-show" :title="$t('achievements.numberOfDailyEntry')" :subtitle="achievement.interaction_number" v-if="achievement.interaction.key === 'daily_entry'"/>
            <ShowItem class="divider-show" :title="$t('achievements.numberOfMission')" :subtitle="achievement.interaction_number" v-if="achievement.interaction.key === 'mission'"/>
            <ShowItem class="divider-show" :title="$t('achievements.numberOfSeasonalMission')" :subtitle="achievement.interaction_number" v-if="achievement.interaction.key === 'seasonal_mission'"/>
            <ShowItem class="divider-show" :title="$t('achievements.numberOfCompetitions')" :subtitle="achievement.interaction_number" v-if="achievement.interaction.key === 'competitions'"/>
            <ShowItem class="divider-show" :title="$t('achievements.numberOfLeaderboard')" :subtitle="achievement.interaction_number" v-if="achievement.interaction.key === 'leaderboard'"/>
          </b-col>
          <b-col lg="6" class="mt-3">
            <ShowItem class="divider-show" :title="$t('achievements.startDate')" :subtitle="achievement.start_date"/>
          </b-col>
          <b-col lg="6" class="mt-3">
            <ShowItem class="divider-show" :title="$t('achievements.endDate')" :subtitle="achievement.end_date"/>
          </b-col>
          <b-col lg="6" class="mt-3" v-if="achievement.repetitions_number">
            <ShowItem class="divider-show" :title="$t('achievements.repetitions_number')" :subtitle="achievement.repetitions_number"/>
          </b-col>
          <b-col lg="6" class="mt-3">
            <ShowItem class="divider-show" :title="$t('achievements.jeel_gems')" :subtitle="achievement.jeel_gems"/>
          </b-col>

        </b-row>
      </div>
    </div>
    <GeneralModal :id="'holdContent'" :size="'lg'" :hide-header="true">
      <template #modalBody>
        <div class="text-center">
          <div v-if="mediaType === 'audio'">
            <audio :src="url"
                   ref="player"
                   autoplay="autoplay"
                   controls="controls"></audio>
          </div>
          <div v-else>
            <img :src="url">
          </div>
          <Button @click="hideModal" :custom-class="'rounded-btn transparent-btn'">
            {{ $t("BACK") }}
          </Button>
        </div>
      </template>
    </GeneralModal>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import {getAchievementByIdRequest} from "@/api/achievement";
import PreviewMedia from "@/components/Shared/PreviewMedia/PreviewMedia.vue";
import Button from "@/components/Shared/Button/index.vue";
import GeneralModal from "@/components/Shared/GeneralModal/index.vue";

export default {
  name: "index",
  components: {
    GeneralModal, Button,
    PreviewMedia,
    ShowItem,
  },
  data() {
    return {
      achievement: {},
      url: null,
      mediaType: null
    };
  },
  methods: {
    showModal(audio, $event) {
      this.$bvModal.show('holdContent')
      this.mediaType = $event
      if (this.mediaType === 'audio') {
        this.url = audio
      }
    },
    hideModal() {
      this.$bvModal.hide('holdContent')
    },
  },
  mounted() {
    this.ApiService(getAchievementByIdRequest(this.$route.params.id)).then((response) => {
      this.achievement = response.data.data;
    });
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
