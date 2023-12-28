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
          <b-col lg="4">
            <ShowItem class="divider-show" :title="$t('VIDEO.videoDuration')" :subtitle="`${duration}`"/>
          </b-col>
          <b-col lg="4" class="mt-5" v-if="videoDetail && videoDetail.learningPath">
            <ShowItem class="divider-show" :title="$t('VIDEO.learning_path')" :subtitle="videoDetail.learningPath.name"/>
          </b-col>
          <b-col lg="6" class="mt-5" v-if="videoDetail && videoDetail.lesson">
            <ShowItem class="divider-show" :title="$t('LESSONS.NAME')" :subtitle="videoDetail.lesson.name"/>
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
        >
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
    <QuestionModal :showModal="showModalQuestion" @addQuestion="addQuestion($event)"
                   @cancelQuestion="cancelQuestion($event)" :duration="duration"/>
  </section>
</template>
<script>
import {
  addQuestionOnVideo,
  deleteQuestionOfVideo,
  deleteVideoRequest,
  getQuestionOfVideo,
  getSingleVideoRequest
} from "@/api/videos";
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import ListItems from "@/components/ListItems/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import QuestionModal from "@/components/Shared/QuestionModal/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import {vueVimeoPlayer} from 'vue-vimeo-player'

export default {
  name: "index",
  components: {Button, Modal, ListItems, ShowItem, QuestionModal, VimeoPlayer: vueVimeoPlayer},
  data() {
    return {
      loading: false,
      questionsList: [],
      totalNumber: 0,
      showModal: false,
      showModalQuestion: false,
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
      duration: null,
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
      this.$router.push(`/dashboard/videos/show/${$event}`)
    },
    editItem($event) {
      this.$router.push(`/dashboard/videos/edit/${$event}`)
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
    },
    cancelWithConfirm() {
      this.ApiService(deleteQuestionOfVideo(this.itemId)).then(() => {
        this.getQuestionOfVideo(this.$route.params.id)
      })
      this.cancel()
    },
    addQuestion($event) {
      console.log('$event', $event)
      delete $event['answers_id']
      // $event.question_time = Number($event.question_time)
      this.ApiService(addQuestionOnVideo($event)).then((response) => {
        this.getQuestionOfVideo(this.$route.params.id)
        this.showModalQuestion = false
      })
    },
    async registerPlayerEvents(player) {
      this.player = player
      this.player.getDuration().then((duration) => {
        console.log('full duration', (duration / 60))
        this.duration =  (duration / 60)
      })
    },
    async getCurrentDuration($event) {
      console.log("event", $event.seconds)
      console.log("event", Math.floor($event.seconds))
      let time = Math.floor($event.seconds)
      // if ()
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
