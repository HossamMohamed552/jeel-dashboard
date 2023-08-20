<template>
  <section class="custom-container">
    <div class="mission-content inner-routes">
      <div class="taps">
        <div @click="activeTap = 1" :class="activeTap === 1 ? 'active' : ''" class="tap">
          الفيديوهات
        </div>
        <div @click="activeTap = 2" :class="activeTap === 2 ? 'active' : ''" class="tap">
          أوراق العمل
        </div>
        <div @click="activeTap = 3" :class="activeTap === 3 ? 'active' : ''" class="tap">
          التمارين
        </div>
      </div>
      <div class="content">
        <div class="row">
          <transition name="fade">
            <div class="col-12 px-0" v-if="activeTap === 1">
              <b-row>
                <b-col lg="4" v-for="video in videosContent" :key="video.id">
                  <div class="hold-permissions">
                    <b-form-checkbox
                      v-model="videoSelected"
                      :value="video.id"
                      class="permission-item item"
                    >
                      <video controls class="w-100 video">
                        <source :src="video.url" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      <span class="video-title">{{ video.title }}</span>
                    </b-form-checkbox>
                  </div>
                </b-col>
              </b-row>
            </div>
            <div class="col-12 px-0" v-if="activeTap === 2">
              <b-row>
                <b-col lg="4" v-for="paperWork in paperWorkContent" :key="paperWork.id">
                  <div class="hold-permissions">
                    <b-form-checkbox
                      v-model="paperWorkSelected"
                      :value="paperWork.id"
                      class="permission-item item"
                    >
                      <div class="hold-icon">
                        <b-icon icon="file-earmark-pdf"></b-icon>
                      </div>
                      <div class="d-flex justify-content-between align-items-center">
                        <span>{{ paperWork.type }}</span>
                        <span
                          class="video-title"
                          @click="downloadFile(paperWork.name, paperWork.url)"
                          >{{ paperWork.name }}</span
                        >
                      </div>
                    </b-form-checkbox>
                  </div>
                </b-col>
              </b-row>
            </div>
            <div class="col-12 px-0" v-if="activeTap === 3">
              <b-row>
                <b-col lg="6" v-for="quiz in quizContent" :key="quiz.id" class="mb-5">
                  <div class="hold-permissions">
                    <b-form-checkbox
                      v-model="quizSelected"
                      :value="quiz.id"
                      class="permission-item item"
                      @change="questionsQuizSelected($event, quiz)"
                    >
                      <div class="hold-icon">
                        <i class="far fa-question-circle"></i>
                      </div>
                      <div class="d-flex justify-content-between align-items-center">
                        <span class="video-title">{{ quiz.name }}</span>
                        <span class="question-no">{{ quiz.total_question }}</span>
                      </div>
                      <div class="hold-question">
                        <div class="questions-header">
                          <b-row>
                            <b-col lg="1"></b-col>
                            <b-col lg="3">نوع السؤال</b-col>
                            <b-col lg="8">السؤال</b-col>
                          </b-row>
                        </div>
                        <div
                          class="questions-item"
                          v-for="question in quiz.questions"
                          :key="question.id"
                        >
                          <b-form-checkbox
                            v-model="quiz.questionsSelected"
                            :value="question.id"
                            class="permission-item item"
                            @change="logQuestion($event, question)"
                          >
                            <b-row>
                              <b-col lg="1"></b-col>
                              <b-col lg="3">{{ question.question_type.name }}</b-col>
                              <b-col lg="8">{{ question.name }}</b-col>
                            </b-row>
                          </b-form-checkbox>
                        </div>
                      </div>
                    </b-form-checkbox>
                  </div>
                </b-col>
              </b-row>
            </div>
          </transition>
        </div>
      </div>
      <b-row>
        <div class="hold-btns-form">
          <Button @click="handleCancel" custom-class="cancel-btn margin">
            {{ $t("GLOBAL_CANCEL") }}
          </Button>
          <Button @click="submit" :loading="loading" custom-class="submit-btn">
            {{ $t("GLOBAL_SAVE") }}
          </Button>
        </div>
      </b-row>
    </div>
  </section>
</template>
<script>
import { getMissionContentRequest, postEditPathMissionRequest } from "@/api/path-content";
import RouteItem from "@/components/RouteItem/index.vue";
import Button from "@/components/Shared/Button/index.vue";

export default {
  name: "index",
  components: { Button, RouteItem },
  data() {
    return {
      loading: false,
      activeTap: 1,
      videosContent: [],
      paperWorkContent: [],
      quizContent: [],
      videoSelected: [],
      paperWorkSelected: [],
      quizSelected: [],
      globalQuiz: [],
      editContentMission: {
        mission_id: 353,
        learningpath_id: 1,
        videos: [],
        papersworks: [],
        quizzes: [],
      },
    };
  },
  mounted() {
    this.ApiService(
      getMissionContentRequest({
        learningPathId: this.$route.params.pathId,
        missionId: this.$route.params.missionId,
      })
    ).then((response) => {
      this.videosContent = response.data.data.videos;
      this.videoSelected = response.data.data.videos
        .filter((item) => item.is_selected === true)
        .map((item) => item.id);
      this.paperWorkContent = response.data.data.papersWork;
      this.paperWorkSelected = response.data.data.papersWork
        .filter((item) => item.is_selected === true)
        .map((item) => item.id);
      this.quizContent = response.data.data.quizzes.map((item) => {
        return Object.assign(item, {
          questionsSelected: [
            ...item.questions.filter((item) => item.is_selected === true).map((item) => item.id),
          ],
        });
      });
      this.quizSelected = response.data.data.quizzes
        .filter((item) => item.is_selected === true)
        .map((item) => item.id);
      this.editContentMission.quizzes = response.data.data.quizzes.filter(
        (item) => item.is_selected === true
      );
      this.editContentMission.quizzes = this.editContentMission.quizzes.map((item) => {
        return { id: item.id, questions: item.questionsSelected };
      });
    });
  },
  methods: {
    logQuestion($event, question) {
      this.quizContent.filter((item) => question.quiz_id === item.id);
      this.editContentMission.quizzes = this.editContentMission.quizzes.map((item) => {
        if (item.id === question.quiz_id) {
          return { id: item.id, questions: $event };
        } else {
          return item;
        }
      });
    },
    questionsQuizSelected($event, quizQuestion) {
      if (!$event.includes(quizQuestion.id)) {
        quizQuestion.questionsSelected = [];
        this.editContentMission.quizzes = this.editContentMission.quizzes.filter((item) => {
          return item.id !== quizQuestion.id;
        });
      }
      this.editContentMission.quizzes = this.quizContent
        .filter((item) => $event.includes(item.id))
        .map((item) => {
          return { id: item.id, questions: item.questionsSelected };
        });
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
    submit() {
      this.editContentMission.mission_id = this.$route.params.missionId;
      this.editContentMission.learningpath_id = this.$route.params.pathId;
      this.editContentMission.videos = this.videoSelected;
      this.editContentMission.papersworks = this.paperWorkSelected;
      this.ApiService(postEditPathMissionRequest(this.editContentMission)).then((response) => {
        this.$router.back();
      });
    },
    handleCancel() {
      this.$router.back();
    },
  },
};
</script>
<style scoped lang="scss">
@import "src/components/InnerRoutes/index";
@import "./index";
</style>
