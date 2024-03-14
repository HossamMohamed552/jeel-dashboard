<template>
  <section class="container-fluid custom-container questions_video">
    <b-row>
      <b-col lg="12">
        <p class="name-of-item">{{ $t('VIDEO.ShowDetails') }}</p>
      </b-col>
      <b-col lg="4">
        <div class="video-cont">
          <vimeo-player
            v-if="videoUrl"
            class="vimeo-player"
            ref="videoPlayer"
            :video-url="`${videoUrl}`"
            :options="{'responsive':true}"
            @ready="registerPlayerEvents($event)"
            @pause="getCurrentDuration($event)"
            @durationchange="getCurrentDuration($event)"
          ></vimeo-player>
          <!--          @play="playVideo()"-->
          <!--          @ended="endedVideo()"-->
          <!--          @ready="registerPlayerEvents($event)"-->
          <!--          @timeupdate="onTimeUpdate($event)"-->
          <!--          <div class="embed-responsive embed-responsive-16by9">-->
          <!--            <iframe class="embed-responsive-item"-->
          <!--                    :src="`https://player.vimeo.com/video/${videoDetail.video_with_music_path}`">-->
          <!--            </iframe>-->
          <!--          </div>-->
        </div>
      </b-col>
      <b-col lg="8">
        <b-row>
          <b-col lg="8">
            <ShowItem class="divider-show" :title="$t('VIDEO.NAME')" :subtitle="videoDetail.title"/>
          </b-col>
          <b-col lg="4" v-if="totalDuration">
            <ShowItem class="divider-show" :title="$t('VIDEO.videoDuration')"
                      :subtitle="`${totalDuration}`"/>
          </b-col>
          <b-col lg="4" class="mt-5" v-if="videoDetail && videoDetail.learningPath">
            <ShowItem class="divider-show" :title="$t('VIDEO.learning_path')"
                      :subtitle="videoDetail.learningPath.name"/>
          </b-col>
          <b-col lg="4" class="mt-5" v-if="videoDetail && videoDetail.lesson">
            <ShowItem class="divider-show" :title="$t('LESSONS.NAME')"
                      :subtitle="videoDetail.lesson.name"/>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="12">
        <ListItems :header-name="'قائمة الأسئلة'"
                   :showSortControls="false"
                   :number-of-item="totalNumber"
                   :tableItems="questionsList"
                   :fields-list="fieldsList"
                   @detailItem="detailItem($event)"
                   @editItem="editItem($event)"
                   @deleteItem="deleteItem($event)"
                   :notHidePagination="false"
                   :loading="loading"
                   :permission_delete="'delete-video'"
                   :permission_edit="'edit-video'"
                   :permission_view="'show-video'"
                   class="px-0">
          <template #buttons>
            <Button :custom-class="'btn-add rounded-btn big-padding'"
                    @click="showModalQuestion=true">
              <img src="@/assets/images/icons/plus.svg">
              <span> إضافة سؤال جديد</span>
            </Button>
          </template>
        </ListItems>
      </b-col>
    </b-row>
    <Modal :content-message="'حذف السؤال'"
           :content-message-question="'هل انت متأكد من حذف السؤال'"
           :showModal="showModal"
           @cancel="cancel($event)"
           :is-warning="true"
           @cancelWithConfirm="cancelWithConfirm($event)"/>
    <QuestionModal :showModal="showModalQuestion" @addQuestion="addQuestion($event)" @editQuestion="editQuestion($event)"
                   @cancelQuestion="cancelQuestion($event)" :totalDuration="totalDuration"
                   :currentTime="currentTime" :questionEdit="questionContent" :isEdit="isEdit"/>
    <GeneralModal id="questionContent" :size="'xl'" :hide-header="true">
      <template #modalBody>
        <div class="questionContent">
          <b-row>
            <b-col lg="12">
              <h2 class="heading">{{ $t('QUESTIONS.questionDetails') }}</h2>
            </b-col>
            <b-col lg="6">
              <ShowItem class="divider-show" :title="$t('VIDEO.duration')"
                        :subtitle="questionContent.question_time"/>
            </b-col>
            <b-col lg="6">
              <ShowItem v-if="questionContent && questionContent.question_type" class="divider-show" :title="$t('QUESTIONS.QUESTION_TYPE')"
                        :subtitle="questionContent.question_type.name"/>
            </b-col>
            <b-col lg="12" class="mt-3">
              <ShowItem class="divider-show" :title="$t('QUESTIONS.headQUESTION')"
                        :subtitle="questionContent.head_question"/>
            </b-col>
            <b-col lg="12">
              <PreviewMedia
                :header="`${$t('QUESTIONS.QUESTION_header_AUDIO')}`"
                :media-name="questionContent.video_head_question_audio_name"
                :file-size="questionContent.video_head_question_audio_size"
                :typeOfMedia="'audio'"
                @showModal="showPreviewModal(questionContent.video_head_question_audio)"/>
            </b-col>
            <b-col lg="12" class="mt-3">
              <ShowItem class="divider-show" :title="$t('QUESTIONS.videoQUESTION')"
                        :subtitle="questionContent.question"/>
            </b-col>
            <b-col lg="12">
              <PreviewMedia
                :header="`${$t('QUESTIONS.QUESTION_TITLE_AUDIO')}`"
                :media-name="questionContent.video_question_audio_name"
                :file-size="questionContent.video_question_audio_size"
                :typeOfMedia="'audio'"
                @showModal="showPreviewModal(questionContent.video_question_audio)"/>
            </b-col>
            <b-col lg="12" class="mt-3">
              <ShowItem class="divider-show" :title="$t('QUESTIONS.QUESTIONDIFFICULTIES')"
                        :subtitle="questionContent.question"/>
            </b-col>
            <b-col lg="12">
              <b-row v-if="questionContent.question_type && questionContent.question_type.name === 'ضع علامة صح او خطاء'">
                <b-col lg="6" class="mt-3">
                  <ShowItem :title="$t('QUESTIONS.ANSWERS')" />
                  <b-row>
                    <b-col v-for="answer in questionContent.answers" :key="answer.id">
                      <ShowItem :subtitle="answer.answer" />
                    </b-col>
                  </b-row>
                </b-col>
                <b-col lg="6" class="mt-3">
                  <ShowItem :title="$t('QUESTIONS.RIGHT_ANSWER')" />
                  <b-row>
                    <b-col v-for="answer in questionContent.answers" :key="answer.id">
                      <ShowItem :subtitle="answer.answer" v-if="answer.correct === 1"/>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
              <b-row v-if="questionContent.question_type && questionContent.question_type.name === 'اختر الإجابة الصحيحة'">
                <b-col lg="12" class="mt-3">
                  <ShowItem :title="$t('QUESTIONS.ANSWERS')" />
                  <b-row>
                    <b-col lg="12" v-for="(answer,index) in questionContent.answers" :key="answer.id" class="hold-answers mt-0 mb-3">
                      <div class="answer">
                        <p class="font-weight-bold">{{$t('VIDEO.answerSort',{ index:`${index + 1 }`})}}</p>
                        <p>{{answer.answer}}</p>
                      </div>
                      <PreviewMedia
                        :header="`${$t('VIDEO.answerSortAudio',{ index:`${index + 1 }`})}`"
                        :media-name="answer.video_question_answer_audio_name"
                        :file-size="answer.video_question_answer_audio_size"
                        :typeOfMedia="'audio'"
                        @showModal="showPreviewModal(answer.video_question_answer_audio)"/>
                    </b-col>
                  </b-row>
                </b-col>
                <b-col lg="12" class="mt-3">
                  <ShowItem :title="$t('QUESTIONS.RIGHT_ANSWER')" />
                  <b-row>
                    <b-col lg="12" v-for="answer in questionContent.answers" :key="answer.id" class="hold-answers mt-0" v-if="answer.correct === 1">
                      <div class="answer">
                        <p>{{answer.answer}}</p>
                      </div>
                      <PreviewMedia
                        :header="`${$t('VIDEO.rightAnswerAudio')}`"
                        :media-name="answer.video_question_answer_audio_name"
                        :file-size="answer.video_question_answer_audio_size"
                        :typeOfMedia="'audio'"
                        @showModal="showPreviewModal(answer.video_question_answer_audio)"/>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
          <div class="w-100">
            <Button @click="hideModal" class="w-100" :d-block="true" :custom-class="'rounded-btn transparent-btn back-modal'">
              {{ $t("BACK") }}
            </Button>
          </div>
        </div>
      </template>
    </GeneralModal>
    <GeneralModal :id="'holdContent'" :size="'lg'" :hide-header="true">
      <template #modalBody>
        <div class="text-center">
          <div>
            <audio :src="url"
                   ref="player"
                   autoplay="autoplay"
                   controls="controls"></audio>
          </div>
          <Button @click="hidePreviewModal" :custom-class="'rounded-btn transparent-btn'">
            {{ $t("BACK") }}
          </Button>
        </div>
      </template>
    </GeneralModal>
  </section>
</template>
<script>
import {
  addQuestionOnVideo,
  deleteQuestionOfVideo, editQuestionOnVideo,
  getQuestionOfVideo,
  getSingleQuestionOnVideo,
  getSingleVideoRequest
} from "@/api/videos";
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import ListItems from "@/components/ListItems/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import QuestionModal from "@/components/Shared/QuestionModal/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import {vueVimeoPlayer} from 'vue-vimeo-player'
import GeneralModal from "@/components/Shared/GeneralModal/index.vue";
import PreviewMedia from "@/components/Shared/PreviewMedia/PreviewMedia.vue";

export default {
  name: "index",
  components: {
    PreviewMedia,
    GeneralModal, Button, Modal, ListItems, ShowItem, QuestionModal, VimeoPlayer: vueVimeoPlayer},
  data() {
    return {
      loading: false,
      questionsList: [],
      totalNumber: 0,
      showModal: false,
      showModalQuestion: false,
      url: null,
      fieldsList: [
        {key: "id", label: "التسلسل"},
        {key: "questionName", label: "نص السؤال"},
        {key: "question_time", label: "التوقيت"},
        {key: "question_type.name", label: "نوع السؤال"},
        {key: "actions", label: "الإجراء"},
      ],
      videoDetail: {},
      videoUrl: null,
      videoId: null,
      player: null,
      totalDuration: null,
      currentTime: null,
      questionContent:{},
      isEdit: false,
      questionId: null,
    }
  },
  methods: {
    getVideoDetail(videoId) {
      this.ApiService(getSingleVideoRequest(videoId)).then((response) => {
        this.videoDetail = response.data.data
      }).then(() => {
        this.videoUrl = this.videoDetail.vimeo_video_with_music_url.replace("https", "http")
        this.videoId = this.videoDetail.viemo_video_with_music_path
      }).then(() => {
        this.registerPlayerEvents()
      })
    },
    getQuestionOfVideo(videoId) {
      this.loading = true
      this.ApiService(getQuestionOfVideo(videoId)).then((response) => {
        this.questionsList = response.data.data.video_questions
        this.totalNumber = this.questionsList.length
      }).finally(() => {
        this.loading = false;
      });
    },
    detailItem($event) {
      this.ApiService(getSingleQuestionOnVideo($event)).then((response) => {
        this.questionContent = response.data.data
      }).then(()=>this.showQuestionModal())
    },
    editItem($event) {
      this.questionId = $event
      this.ApiService(getSingleQuestionOnVideo($event)).then((response) => {
        this.questionContent = response.data.data
      }).then(()=>{
        this.showModalQuestion = true
        this.isEdit = true
      })
    },
    showQuestionModal() {
      this.$bvModal.show('questionContent')
    },
    hideModal() {
      this.$bvModal.hide('questionContent')
    },
    showPreviewModal(audio) {
      this.$bvModal.show('holdContent')
      this.url = audio
    },
    hidePreviewModal(){
      this.$bvModal.hide('holdContent')
    },
    deleteItem($event) {
      this.itemId = $event
      this.showModal = true
    },
    cancel($event) {
      this.showModal = $event
    },
    cancelQuestion($event) {
      this.showModalQuestion = $event
      this.questionContent = null
      this.isEdit = false
    },
    cancelWithConfirm() {
      this.ApiService(deleteQuestionOfVideo(this.itemId)).then(() => {
        this.getQuestionOfVideo(this.$route.params.id)
      })
      this.cancel()
    },
    addQuestion($event) {
      // $event.question_time = Number($event.question_time)
      this.ApiService(addQuestionOnVideo($event)).then((response) => {
        this.getQuestionOfVideo(this.$route.params.id)
        this.showModalQuestion = false
      })
    },
    editQuestion($event){
      if (!$event['video_head_question_audioChangedRequest']){
        delete $event['head_question_audio']
      }
      if (!$event['video_question_audioChangedRequest']){
        delete $event['video_question_audio']
      }
      delete $event['video_head_question_audioChangedRequest']
      delete $event['video_head_question_audio_name']
      delete $event['video_head_question_audio_size']
      delete $event['video_question_audioChangedRequest']
      delete $event['video_question_audio_name']
      delete $event['video_question_audio_size']
      this.ApiService(editQuestionOnVideo($event,this.questionId)).then((response) => {
        this.getQuestionOfVideo(this.$route.params.id)
        this.showModalQuestion = false
      })
    },
    async registerPlayerEvents(player) {
      this.player = player
      this.player.getDuration().then((duration) => {
        this.totalDuration = (duration / 60)
      })
    },
    async getCurrentDuration($event) {
      this.currentTime = $event.seconds
    }
  },
  mounted() {
    this.getVideoDetail(this.$route.params.id)
    this.getQuestionOfVideo(this.$route.params.id)
  }
}
</script>
<style scoped lang="scss">
@import "index";
</style>
