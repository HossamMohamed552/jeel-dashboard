<template>
  <b-modal
    id="mission-details-modal"
    class="mission-modal"
    hide-footer
    size="xl"
    centered
    @hide="handleCloseModal()"
  >
    <template v-slot:modal-header="{ close }">
      <span>{{ $t("MISSSION_DETAILS") }}</span>
      <b-icon class="close-modal-icon" icon="x" @click="close" />
    </template>
    <div :class="$i18n.locale === 'en' ? '' : 'rtl'">
      <div class="w-100">
        <div v-if="loading" class="text-center font-weight-bold">
          {{ $t("GLOBAL_LOADING") }}
        </div>
        <div v-else class="px-4">
          <div class="show-mission divider">
            <b-row>
              <b-col lg="3">
                <ShowItem
                  :title="$t('MISSIONS.name')"
                  :subtitle="mission.name"
                />
              </b-col>
              <b-col lg="3" v-if="mission && mission.level">
                <ShowItem
                  :title="$t('MISSIONS.level')"
                  :subtitle="mission.level.name"
                />
              </b-col>
              <b-col lg="3" v-if="mission && mission.term">
                <ShowItem
                  :title="$t('MISSIONS.terms')"
                  :subtitle="mission.term.name"
                />
              </b-col>
              <b-col v-if="mission && mission.mission_image" lg="3" >
                <ShowItem :title="$t('MISSIONS.UPLOAD_IMAGE')" />
                <img class="mx-2" :src="mission.mission_image" width="120" />
              </b-col>
            </b-row>
          </div>
          <div class="divider">
            <b-row class="mt-4">
              <b-col lg="4" v-if="mission && mission.country">
                <ShowItem
                  :title="$t('MISSIONS.country')"
                  :subtitle="mission.country.name"
                />
              </b-col>
              <b-col lg="4">
                <ShowItem
                  :title="$t('MISSIONS.description')"
                  :subtitle="mission.description"
                />
              </b-col>
              <b-col lg="4">
                <ShowItem
                  :title="$t('MISSIONS.duration')"
                  :subtitle="mission.data_range"
                />
              </b-col>
            </b-row>
          </div>
          <div class="divider" v-if="mission && mission.learning_paths">
            <b-col lg="12">
              <h2 class="heading heading-content text-center">
                {{ $t("MISSIONS.content") }}
              </h2>
            </b-col>
            <b-row
              class="mt-4"
              v-for="path in mission.learning_paths"
              :key="path.id"
            >
              <b-col lg="12" class="mb-4">
                <ShowItem
                  :title="$t('MISSIONS.LEARNING_PATH')"
                  :subtitle="path.name"
                />
              </b-col>
              <b-col lg="3">
                <ShowItem :title="$t('MISSIONS.videos')" />
                <div v-for="videoPath in path.videos" :key="videoPath.id">
                  <div class="icon-play-holder">
                    <ShowItem :subtitle="videoPath.original_name | cutString" />
                    <b-icon
                      class="cursor-pointer mt-4"
                      icon="play-circle"
                      variant="info"
                      @click="handlePlayVideo(videoPath.id)"
                    />
                  </div>
<!--                  <div v-if="videoPlayed" class="video-container">-->
<!--                    <video-->
<!--                      :src="videoPath.url"-->
<!--                      ref="player"-->
<!--                      autoplay="autoplay"-->
<!--                      controls="controls"-->
<!--                    />-->
<!--                  </div>-->
                </div>
                <!--
              you can add configuration to the video
              ----------------------------
              :muted="muted"
              :autoplay="autoplay"
              :controls="controls"
              :loop="loop"
              :width="width"
              :height="height"
              :poster="poster"
              :preload="preload"
              :playsinline="true"
              -->

              </b-col>
              <b-col lg="3">
                <ShowItem :title="$t('MISSIONS.paperWork')" />
                <div
                  v-for="papersWorkPath in path.papersWork"
                  :key="papersWorkPath.id"
                  class="icon-play-holder"
                >
                  <ShowItem :subtitle="papersWorkPath.name | cutString" />
                  <b-icon
                    class="cursor-pointer mt-4"
                    icon="cloud-download"
                    variant="info"
                    @click="
                      downloadFile(papersWorkPath.name, papersWorkPath.url)
                    "
                  />
                </div>
              </b-col>
              <b-col lg="6" class="quizzes">
                <ShowItem :title="$t('MISSIONS.quizzes')" />
                <div v-for="quizPath in path.quizzes" :key="quizPath.id">
                  <ShowItem :subtitle="quizPath.name" />
                  <ShowItem :title="$t('QUESTIONS.QUESTIONS')" class="mt-3"/>
                  <div
                    v-for="(question,index) in quizPath.questions"
                    :key="question.id"
                  >
                    <div class="icon-play-holder">
                      <span>{{ index + 1}} - </span>
                      <ShowItem :title="question.question" class="question mb-3"  v-if="question.question_pattern === 'text'"/>
                      <img class="question_img mb-3" v-else-if="question.question_pattern === 'image'" :src="question.question">
                      <audio controls v-else-if="question.question_pattern === 'audio'" class="mb-3">
                        <source :src="question.question" />
                      </audio>
                      <b-icon
                        class="cursor-pointer"
                        icon="info-circle"
                        variant="info"
                        @click="handleShowQuestionDetails(question.id)"
                      />
                    </div>
                  </div>
                </div>
              </b-col>
            </b-row>
          </div>
        </div>
      </div>
    </div>

    <QuestionDetailsModal
      :question-id="selectedQuestion"
      @closeModal="handleCloseQuestionDetailsModal"
    />
  </b-modal>
</template>
  <script>
import { getSingleMissionDetailsRequest } from "@/api/detailsModal.js";
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import QuestionDetailsModal from "@/components/Shared/QuestionDetailsModal/index.vue";
export default {
  name: "MissionDetailsModal",
  components: {
    ShowItem,
    QuestionDetailsModal,
  },
  props: {
    missionId: {
      type: Number,
      default: null,
    },
  },
  filters: {
    cutString(value) {
      if (value.length > 15) {
        return `${value.slice(0, 15)}...`
      } else {
        return value
      }
    }
  },
  data() {
    return {
      mission: {},
      loading: false,
      isPlaying: false,
      currentActiveId: null,
      selectedQuestion: null,
      selecedVideoSource: "",
      videoPlayed: false,
    };
  },
  watch: {
    missionId(newVal) {
      if (this.missionId) {
        this.missionId = newVal;
        this.getSingleMissionDetails();
      }
    },
  },
  methods: {
    getSingleMissionDetails() {

      this.loading = true;
      this.ApiService(getSingleMissionDetailsRequest(this.missionId)).then(
        (response) => {
          this.mission = response.data.data;
          this.loading = false;
        }
      );
    },
    handleCloseModal() {
      this.$emit("closeModal");
      this.$bvModal.hide("mission-details-modal");
      this.mission = {};
    },
    playAudio(link, id) {
      this.currentActiveId = id;
      if (this.audio) {
        this.audio.pause();
        this.audio = null;
        this.isPlaying = false;
        return;
      }
      this.audio = new Audio(link);
      this.audio.play();
      this.isPlaying = true;
    },
    handleShowQuestionDetails(questionId) {
      this.selectedQuestion = questionId;
      this.$bvModal.show("question-details-modal");
    },
    handleCloseQuestionDetailsModal() {
      this.$bvModal.hide("question-details-modal");
      this.selectedQuestion = null;
    },
    downloadFile(name, url) {
      const link = document.createElement("a");
      link.href = url;
      link.download = name;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    handlePlayVideo(videoId) {
      this.$router.push(`/dashboard/videos/show/${videoId}`)
    },
  },
  destroyed() {
    this.audio.pause();
  }
};
</script>
  <style lang="scss" scoped>
@import "./index.scss";
</style>
