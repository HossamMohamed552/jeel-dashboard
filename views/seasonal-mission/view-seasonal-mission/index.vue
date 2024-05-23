<template>
  <div class="container-fluid custom-container">
    <div class="add-edit-learning-skill">
      <div class="add-edit-term-form">
        <h3>{{ $t('seasonalMission.seasonalMissionDetails') }}</h3>
        <div class="container-fluid">
          <b-row>
            <b-col lg="8">
              <ShowItem class="divider-show" :title="$t('seasonalMission.missionName')"
                        :subtitle="seasonalMissing?.name"/>
            </b-col>
            <b-col lg="4">
              <ShowItem
                class="divider-show"
                :title="$t('seasonalMission.country')"
                :subtitle="seasonalMissing?.countries?.map((row) => row.name).join(', ')"
              />
            </b-col>
            <b-col lg="4">
              <ShowItem
                class="divider-show"
                :title="$t('seasonalMission.seasonalGroupName')"
                :subtitle="seasonalMissing?.sesonalMissionGroup?.name"
              />
            </b-col>
            <b-col lg="4">
              <ShowItem
                class="divider-show"
                :title="$t('seasonalMission.missionStart_date')"
                :subtitle="seasonalMissing?.start_date"
              />
            </b-col>
            <b-col lg="4">
              <ShowItem
                class="divider-show"
                :title="$t('seasonalMission.missionEnd_date')"
                :subtitle="seasonalMissing?.end_date"
              />
            </b-col>
            <b-col lg="6">
              <ShowItem
                class="divider-show"
                :title="$t('seasonalMission.level')"
                :subtitle="seasonalMissing?.level?.name"
              />
            </b-col>
            <b-col lg="6">
              <ShowItem
                class="divider-show"
                :title="$t('QUESTIONS.questionLearningPath')"
                :subtitle="seasonalMissing?.learningpaths?.map((row) => row.name).join(', ')"
              />
            </b-col>
            <b-col lg="6">
              <ShowItem
                class="divider-show"
                :title="$t('MISSIONS.lesson')"
                :subtitle="seasonalMissing?.lessons?.map((row) => row.name).join(', ')"
              />
            </b-col>
            <b-col lg="3">
              <ShowItem
                class="divider-show"
                :title="$t('USERS.religion')"
                :subtitle="seasonalMissing?.religions?.map((row) => row.name).join(', ')"
              />
            </b-col>
            <b-col lg="3">
              <ShowItem
                class="divider-show"
                :title="$t('TABLE_FIELDS.type')"
                :subtitle="seasonalMissing?.types?.map((row) => row.name).join(', ')"
              />
            </b-col>
            <b-col lg="12">
              <PreviewMedia
                :header="$t('seasonalMission.logoMission')"
                :media-name="seasonalMissing.image_name"
                :file-size="seasonalMissing.image_size"
                :showRemoveButton="false"
                :showDownloadButton="true"
                :typeOfMedia="'image'"
                :image-url="seasonalMissing.image"
              />
            </b-col>
            <b-col :lg="12" class="mt-5">
              <ListItems
                class="seasonal-mission-custom-list-item"
                :tableItems="seasonalMissing.notifications"
                :headerName="$t('seasonalMission.notification')"
                :fieldsList="NotifacationFieldsList"
                :showSortControls="false"
              >
              </ListItems>
            </b-col>
            <b-col :lg="12" v-for="index in seasonalMissing?.learningpaths?.length" :key="index">
              <learningPathCollapse
                :index="index"
                :videosList="seasonalMissing?.learningpaths[index - 1].videos"
                :exercisesList="seasonalMissing?.learningpaths[index - 1].quizzes"
                :videosFieldsList="videosFieldsList"
                :exercisesFieldsList="exercisesFieldsList"
              />
            </b-col>
            <b-col :lg="12">
              <ListItems
                class="seasonal-mission-custom-list-item"
                :tableItems="seasonalMissing.prizes"
                :headerName="$t('seasonalMission.prize')"
                :fieldsList="prizeFieldsList"
                :showSortControls="false"
              >
              </ListItems>
            </b-col>
          </b-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getSeasonalMissionByIdRequest} from "@/api/seasonal-mission";
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import PreviewMedia from "@/components/Shared/PreviewMedia/PreviewMedia.vue";
import ListItems from "@/components/ListItems/index.vue";
import learningPathCollapse
  from "@/components/Modules/Users/AddEditSeasonalMission/StepFive/learningPathCollapse.vue";

export default {
  name: "index",
  components: {
    ShowItem,
    PreviewMedia,
    ListItems,
    learningPathCollapse,
  },
  data() {
    return {
      loading: false,
      seasonalMissing: {},
    };
  },
  created() {
  },
  computed: {
    NotifacationFieldsList() {
      return [
        {key: "vid", label: this.$i18n.t('TABLE_FIELDS.id')},
        {key: "name", label: this.$i18n.t('seasonalMission.NoticeTitle')},
        {key: "start_date", label: this.$i18n.t('seasonalMission.DateTimeNotification')},
        {key: "audio", label: this.$i18n.t('seasonalMission.NotificationSound')},
        {key: "description", label: this.$i18n.t('seasonalMission.NotificationText')},
      ]
    },
    prizeFieldsList() {
      return [
        {key: "id", label: this.$i18n.t('TABLE_FIELDS.id')},
        {key: "main_percentage", label: this.$i18n.t('seasonalMission.minPercentage')},
        {key: "max_percentage", label: this.$i18n.t('seasonalMission.maxPercentage')},
        {key: "type.name", label: this.$i18n.t('seasonalMission.prizeType')},
      ]
    },
    videosFieldsList(){
      return [
        {key: "id", label: this.$i18n.t('TABLE_FIELDS.id')},
        {key: "title", label: this.$i18n.t('TABLE_FIELDS.videoTitle')},
      ]
    },
    exercisesFieldsList(){
      return  [
        {key: "id", label: this.$i18n.t('TABLE_FIELDS.id')},
        {key: "name", label: this.$i18n.t('TABLE_FIELDS.titleQuiz')},
      ]
    },
  },
  mounted() {
    this.ApiService(getSeasonalMissionByIdRequest(this.$route.params.id)).then((response) => {
      this.seasonalMissing = response.data.data;
    });
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
