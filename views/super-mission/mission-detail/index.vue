<template>
  <section class="container-fluid custom-container">
    <div class="show-role">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">{{ $t("superMission.missionDetail") }}</h2>
          </b-col>
        </b-row>
        <b-row class="divider mb-4">
          <b-col lg="3">
            <ShowItem
              :title="$t('superMission.missionName')"
              :subtitle="missionDetail.name"
            />
          </b-col>
          <b-col lg="3" v-if="missionDetail.start_date">
            <ShowItem
              :title="$t('superMission.startDate')"
              :subtitle="new Date(missionDetail.start_date).toISOString().slice(0, 10)"
            />
          </b-col>
          <b-col lg="3" v-if="missionDetail.end_date">
            <ShowItem
              :title="$t('superMission.endDate')"
              :subtitle="new Date(missionDetail.end_date).toISOString().slice(0, 10)"
            />
          </b-col>
        </b-row>
        <b-row class="divider mb-4">
          <b-col lg="3">
            <ShowItem
              :title="$t('superMission.range')"
              :subtitle="`${missionDetail.range} ${$t('supervisor.day')}`"
            />
          </b-col>
          <b-col lg="3">
            <ShowItem :title="$t('superMission.status')"/>
            <b-form-checkbox v-model="missionDetail.is_selected" switch
                             :disabled="true"></b-form-checkbox>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="12">
            <ShowItem
              :title="$t('superMission.description')"
              :subtitle="missionDetail.description"
            />
          </b-col>
        </b-row>
        <b-row class="mt-5">
          <b-col lg="12">
            <ShowItem :title="$t('superMission.learningPath')"/>
          </b-col>
          <b-col lg="12">
            <div class="learning-path" v-for="learningPath in learningPaths"
                 :key="'learningPath'+learningPath.id">
              <div class="learning-path-header" @click="toggleContent(learningPath)">
                <p>{{ learningPath.name }}</p>
                <button class="show-hide"><img
                  :src="learningPath.is_selected === true? require('@/assets/images/icons/minus.png') : require('@/assets/images/icons/plus.png')">
                </button>
              </div>
              <div v-if="learningPath.is_selected">
                <div class="learning-path-tabs">
                  <div @click="activeTap = 1" :class="activeTap === 1 ? 'active' : ''" class="tap">
                    {{ $t('supervisor.video') }}
                  </div>
                  <div @click="activeTap = 2;stopCurrentVideo()" :class="activeTap === 2 ? 'active' : ''" class="tap">
                    {{ $t('supervisor.quizzes') }}
                  </div>
                  <div @click="activeTap = 3;stopCurrentVideo()" :class="activeTap === 3 ? 'active' : ''" class="tap">
                    {{ $t('supervisor.paperWork') }}
                  </div>
                  <div @click="activeTap = 4;stopCurrentVideo()" :class="activeTap === 4 ? 'active' : ''" class="tap">
                    {{ $t('supervisor.tasks') }}
                  </div>
                </div>
                <div class="content">
                  <div class="row">
                    <transition-group name="fade" tag="div" class="w-100">
                      <!-- video slider -->
                      <div class="col-12 px-0 videos" :key="learningPath.id"
                           v-show="activeTap === 1">
                        <div v-if="contentLearningPath.videos && Array.from(contentLearningPath.videos).length>0">
                          <div ref="swiper" class="swiper">
                            <div class="swiper-wrapper">
                              <div class="swiper-slide" v-for="video in contentLearningPath.videos"
                                   :id="'video'+video.id">
                                <div class="video-cont">
                                  <vimeo-player
                                    v-if="video.vimeo_video_with_music_url"
                                    class="vimeo-player"
                                    :ref="`videoPlayer-${video.id}`"
                                    :video-url="video.vimeo_video_with_music_url"
                                    :options="{'responsive':true}"
                                    @play="currentVideo=`videoPlayer-${video.id}`"
                                  ></vimeo-player>
                                  <!--                                <video-player :videoId="video.id" :options="{-->
                                  <!--                            controls:true,-->
                                  <!--                            poster: `${video.thumbnail ? video.thumbnail : 'https://picsum.photos/1000'}`,-->
                                  <!--                            autoplay:false,-->
                                  <!--                            sources:[ {src: video.url, type:'video/mp4'}  ]-->
                                  <!--                          }"></video-player>-->
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="back-slide">
                            <img src="@/assets/images/icons/back.svg">
                          </div>
                          <div class="next-slide">
                            <img src="@/assets/images/icons/next.svg">
                          </div>
                        </div>
                        <div v-else class="d-flex justify-content-center align-items-center">
                          {{ $t('notFound') }}
                        </div>
                      </div>
                      <!--/-->
                      <!--quizzes-->
                      <div class="col-12  quizzes" :key="`quizzes + ${learningPath.id}`"
                           v-show="activeTap === 2">
                        <div v-if="Array.from(contentLearningPath.quizzes).length>0">
                          <div class="row mb-4" v-for="quiz in contentLearningPath.quizzes"
                               :key="'quiz'+quiz.id">
                            <div class="col-12">
                              <div class="content-quizzes">
                                <div class="content-quizzes-header" @click="getQuiz(quiz)">
                                  <p>{{ quiz.name }}</p>
                                  <button class="show-hide"><img :src="quiz.is_selected === true? require('@/assets/images/icons/minus.png') : require('@/assets/images/icons/plus.png')">
                                  </button>
                                </div>
                                <div v-if="quiz.is_selected">
                                  <b-row class="divider" v-for="question in quiz.questions" :key="'question'+ question.id">
                                    <b-col lg="6" class="mt-4" v-if="question.question_pattern === 'text'">
                                      <ShowItem :title="$t('QUESTIONS.QUESTION')" :isQuestion = true :subtitle="previewQuestion(question.question)"/>
                                    </b-col>
                                    <b-col lg="6" class="mt-4" v-else-if="question.question_pattern === 'image'">
                                      <ShowItem :title="$t('QUESTIONS.QUESTION')"/>
                                      <div class="d-flex justify-content-start align-items-center">
                                        <img class="question_img" :src="question.question.question">
                                      </div>
                                    </b-col>
                                    <b-col lg="6" class="mt-4" v-else-if="question.question_pattern === 'audio'">
                                      <ShowItem :title="$t('QUESTIONS.QUESTION')"/>
                                      <audio controls>
                                        <source :src="question.question.question"/>
                                      </audio>
                                    </b-col>
                                    <b-col lg="3" class="mt-4">
                                      <ShowItem :title="$t('QUESTIONS.QUESTION_TYPE')" :subtitle="question.question_type.name"/>
                                    </b-col>
                                    <b-col lg="3" class="mt-4">
                                      <b-icon
                                        class="cursor-pointer"
                                        icon="info-circle"
                                        variant="info"
                                        @click="handleShowQuestionDetails(question.id)"
                                      />
                                    </b-col>
                                  </b-row>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div v-else class="d-flex justify-content-center align-items-center">
                          {{ $t('notFound') }}
                        </div>
                      </div>
                      <!--/-->
                      <!--paper-work-->
                      <div class="col-12 px-0 paper-work" :key="`paper-work + ${learningPath.id}`"
                           v-show="activeTap === 3">
                        <ListItems
                          v-if="Array.from(contentLearningPath.papersWork).length>0"
                          class="m-0 py-0"
                          :tableItems="contentLearningPath.papersWork"
                          :notHidePagination="false"
                          :showSortControls="false"
                          :fields-list="paperWorkFieldsList"
                          :showDownloadBtn="true"
                        >
                        </ListItems>
                        <div v-else class="d-flex justify-content-center align-items-center">
                          {{ $t('notFound') }}
                        </div>
                      </div>
                      <!--/-->
                      <!--tasks-->
                      <div class="col-12 px-0 paper-work" :key="`tasks + ${learningPath.id}`"
                           v-show="activeTap === 4">
                        <ListItems
                          v-if="Array.from(contentLearningPath.tasks).length>0"
                          class="m-0 py-0"
                          :tableItems="contentLearningPath.tasks"
                          :notHidePagination="false"
                          :showSortControls="false"
                          :fields-list="paperWorkFieldsList"
                          :showDownloadBtn="true"
                        >
                        </ListItems>
                        <div v-else class="d-flex justify-content-center align-items-center">
                          {{ $t('notFound') }}
                        </div>
                      </div>
                      <!--/-->
                    </transition-group>
                  </div>
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </div>
      <QuestionDetailsModal
        :question-id="selectedQuestion"
        @closeModal="handleCloseQuestionDetailsModal"
      />
    </div>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import {getDetailMissionsWithLearningPaths, getLearningPathInMission} from "@/api/missios";
import Swiper from "swiper/swiper-bundle";
import "swiper/swiper-bundle.css"
import ListItems from "@/components/ListItems/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import {vueVimeoPlayer} from 'vue-vimeo-player'
import QuestionDetailsModal from "@/components/Shared/QuestionDetailsModal/index.vue";

export default {
  name: "index",
  components: {QuestionDetailsModal, Button, ListItems, ShowItem, VimeoPlayer: vueVimeoPlayer},
  data() {
    return {
      missionDetail: {},
      learningPaths: [],
      currentVideo: null,
      firstLearningPathId: null,
      selectedQuestion: null,
      contentLearningPath: {},
      activeTap: 1,
    }
  },
  computed: {
    paperWorkFieldsList() {
      return [
        {key: "vid", label: this.$i18n.t('TABLE_FIELDS.id')},
        {key: "name", label: this.$i18n.t('TABLE_FIELDS.name')},
        {key: "type.name", label: this.$i18n.t('TABLE_FIELDS.type')},
        {key: "description", label: this.$i18n.t('TABLE_FIELDS.description')},
        {key: "download", label: this.$i18n.t('CONTROLS.download_file')},
      ]
    }
  },
  methods: {
    getSingleMission(missionId) {
      this.ApiService(getDetailMissionsWithLearningPaths(missionId)).then((response) => {
        this.missionDetail = response.data.data
        this.learningPaths = this.missionDetail.learning_path ? this.missionDetail.learning_path : []
        this.firstLearningPathId = this.learningPaths[0] ? this.learningPaths[0].id : null
        this.learningPaths[0].is_selected = true
      }).then(() => {
        this.getLearningPathDetail(this.firstLearningPathId)
      })
    },
    getLearningPathDetail(learningPathId) {
      this.ApiService(getLearningPathInMission(this.missionDetail.id, learningPathId)).then((response) => {
        this.contentLearningPath = response.data.data
      }).then(() => {
        this.contentLearningPath.quizzes = this.contentLearningPath.quizzes.map((item) => {
          return {...item, is_selected: false}
        })
        this.contentLearningPath.quizzes[0].is_selected = true
      })
    },
    toggleContent(learningPath) {
      this.learningPaths = this.learningPaths.map((item) => {
        return {...item, is_selected: false}
      })
      let findItem = this.learningPaths.findIndex((item) => item.id === learningPath.id)
      this.learningPaths[findItem].is_selected = !this.learningPaths[findItem].is_selected;
      this.activeTap = 1
      this.getLearningPathDetail(learningPath.id)
    },
    getQuiz(quiz) {
      this.contentLearningPath.quizzes = this.contentLearningPath.quizzes.map((item) => {
        return {...item, is_selected: false}
      })
      let findItem = this.contentLearningPath.quizzes.findIndex((item) => item.id === quiz.id)
      this.contentLearningPath.quizzes[findItem].is_selected = true;
    },
    stopCurrentVideo(){
      if (this.$refs[this.currentVideo]){
        this.$refs[this.currentVideo][0].pause()
      }
    },
    handleShowQuestionDetails(questionId) {
      this.selectedQuestion = questionId;
      this.$bvModal.show("question-details-modal");
    },
    handleCloseQuestionDetailsModal() {
      this.$bvModal.hide("question-details-modal");
      this.selectedQuestion = null;
    },
    previewQuestion(question){
      return question.replace(/%s/g,"<span style='display: inline-block; width: 100px; height: 50px; background: #eee; border-radius: 1rem;border: 1px solid; margin: 0 .5rem'></span>");
    }
  },
  mounted() {
    this.getSingleMission(this.$route.params.id)
  },
  updated() {
    new Swiper('.swiper', {
      // Optional parameters
      // Navigation arrows
      navigation: {
        nextEl: '.next-slide',
        prevEl: '.back-slide',
      },
      on: {
        slideChange: () => {
          this.stopCurrentVideo()
        }
      },
      slidesPerView: 1,
      spaceBetween: 20,
    })
  }
}
</script>
<style scoped lang="scss">
@import "index";
</style>
