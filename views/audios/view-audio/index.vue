<template>
  <section class="container-fluid custom-container">
    <section class="container-fluid custom-container" v-if="audio">
      <div class="show-group">
        <div class="hold-fields">
          <b-row>
            <b-col lg="12">
              <h2 class="heading">{{ $t("AUDIOS.SHOW_DETAILS") }}</h2>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="4">
              <ShowItem
                class="divider-show"
                title="اسم التسجيل صوتي"
                :subtitle="audio.name"
              />
            </b-col>
            <b-col lg="4">
              <ShowItem
                class="divider-show"
                title="نوع السؤال"
                :subtitle="audio.type == 'text' ? 'نص' : 'صورة'"
              />
            </b-col>
            <b-col v-if="audio.task_degree" lg="4">
              <ShowItem
                class="divider-show"
                title="الدرجة"
                :subtitle="audio.task_degree"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <PreviewMedia
                header="ملف الصوت"
                :media-name="audio.task_audio_name"
                :file-size="audio.task_audio_size"
                :typeOfMedia="'audio'"
                @showModal="showModal(audio,$event)"
              />
            </b-col>
          </b-row>
          <b-row v-if="audio.type == 'image'">
            <b-col>
              <PreviewMedia
                header="صورة السؤال"
                :media-name="audio.task_file_name"
                :file-size="audio.task_file_size"
                :image-url="audio.task"
                :typeOfMedia="'image'"
              />
            </b-col>
          </b-row>
          <b-row v-if="audio.type == 'text'">
            <b-col class="mt-4">
              <ShowItem
                class="divider-show"
                title="نص السؤال"
                :subtitle="audio.task"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col class="my-4" lg="6">
              <ShowItem
                v-if="audio && audio.learningPath"
                class="divider-show"
                title="المسار التعليمي"
                :subtitle="audio.learningPath.name"
              />
            </b-col>
            <b-col class="my-4" lg="6">
              <ShowItem
                v-if="audio && audio.lesson"
                class="divider-show"
                title="الدرس"
                :subtitle="audio.lesson.name"
              />
            </b-col>
            <b-col lg="4">
              <ShowItem
                v-if="audio && audio.blooms"
                class="divider-show"
                title="بلوم"
                :subtitle="audio.blooms.name"
              />
            </b-col>
            <b-col lg="4">
              <ShowItem
                class="divider-show"
                title="إسلوب التعلم"
                :with-out-background="true"
                :listItems="audio.learning_styles"
              />
            </b-col>
            <b-col lg="4">
              <ShowItem
                class="divider-show"
                title="نوع المهارة"
                :with-out-background="true"
                :listItems="audio.language_skills"
              />
            </b-col>
          </b-row>
        </div>
      </div>
    </section>
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
import { getSingleAudioRequest } from "@/api/audios";
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import PreviewMedia from "@/components/Shared/PreviewMedia/PreviewMedia.vue";
import GeneralModal from "@/components/Shared/GeneralModal/index.vue";
import Button from "@/components/Shared/Button/index.vue";

export default {
  name: "index",
  components: {
    GeneralModal,
    ShowItem,
    PreviewMedia,
    Button,
  },
  data() {
    return {
      audio: {},
      isPlaying: false,
      audioValue: null,
      url:null,
      mediaType: null
    };
  },
  methods: {
    playAudio(link) {
      if (this.audioValue) {
        this.audioValue.pause();
        this.audioValue = null;
        this.isPlaying = false;
        return;
      }
      this.audioValue = new Audio(link);
      this.audioValue.play();
      this.isPlaying = true;
    },
    showModal(audio, $event) {
      this.$bvModal.show('holdContent')
      this.mediaType = $event
      if (this.mediaType === 'audio'){
        this.url = audio.task_audio
      }
    },
    hideModal() {
      this.$bvModal.hide('holdContent')
    },
  },
  mounted() {
    this.ApiService(getSingleAudioRequest(this.$route.params.id)).then(
      (response) => {
        this.audio = response.data.data;
      }
    );
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
