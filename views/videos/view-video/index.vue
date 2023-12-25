<template>
  <section class="container-fluid custom-container" v-if="video">
    <div class="show-group">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">{{ $t('VIDEO.ShowDetails') }}</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="12">
            <ShowItem class="divider-show" :title="$t('VIDEO.VIDEONAME')"
                      :subtitle="video.original_name"/>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="6">
            <PreviewMedia :header="$t('VIDEO.videoWithMusic')"
                          :media-name="video.video_with_music_name"
                          :file-size="video.video_with_muisc_size"
                          :vimeo-url="video.vimeo_video_with_music_url" :typeOfMedia="'video'"
                          @showModal="showModal(video,'withMusic')"/>
          </b-col>
          <b-col lg="6">
            <PreviewMedia :header="$t('VIDEO.videoWithoutMusic')"
                          :media-name="video.video_without_muisc_name"
                          :file-size="video.video_without_muisc_size"
                          :url="video.vimeo_video_with_music_url"
                          :typeOfMedia="'video'"
                          @showModal="showModal(video,'withOutMusic')"
            />
          </b-col>
          <b-col lg="12">
            <PreviewMedia :header="$t('VIDEO.UPLOAD_IMAGE')"
                          :media-name="video.thumbnail_name"
                          :file-size="video.thumbnail_size"
                          :image-url="video.thumbnail" :typeOfMedia="'image'"/>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="my-4" lg="6">
            <ShowItem v-if="video && video.learningPath" class="divider-show"
                      :title="$t('VIDEO.learning_path')"
                      :subtitle="video.learningPath.name"/>
          </b-col>
          <b-col class="my-4" lg="6">
            <ShowItem v-if="video && video.lesson" class="divider-show"
                      :title="$t('LESSONS.videoNAME')"
                      :subtitle="video.lesson.name"/>
          </b-col>
          <b-col lg="4">
            <ShowItem v-if="video && video.blooms" class="divider-show" :title="$t('VIDEO.bloom')"
                      :subtitle="video.blooms.name"/>
          </b-col>
          <b-col lg="4">
            <ShowItem class="divider-show" :title="$t('VIDEO.languageMethods')"
                      :with-out-background="true" :listItems="video.learning_styles"/>
          </b-col>
          <b-col lg="4">
            <ShowItem class="divider-show" :title="$t('VIDEO.learningSkills')"
                      :with-out-background="true" :listItems="video.language_skills"/>
          </b-col>
          <b-col class="mt-4" lg="12">
            <ShowItem class="divider-show" :title="$t('VIDEO.Description')"
                      :subtitle="video.description"/>
          </b-col>
        </b-row>
      </div>
    </div>
    <GeneralModal :id="'holdContent'" :size="'lg'" :hide-header="true">
      <template #modalBody>
        <div class="text-center">
          <vimeo-player
            v-if="videoUrl && (video.vimeo_video_with_music_transcode || video.vimeo_video_without_music_transcode)"
            class="vimeo-player my-3"
            ref="videoPlayer"
            :video-url="`${videoUrl}`"
            :options="{'responsive':true}"
          ></vimeo-player>
          <video v-else width="90%"
                 class="my-3"
                 :src="videoUrl"
                 ref="player"
                 autoplay="autoplay"
                 controls="controls"
          />
          <Button @click="hideModal" :custom-class="'rounded-btn transparent-btn'">
            {{ $t("BACK") }}
          </Button>
        </div>
      </template>
    </GeneralModal>
  </section>
</template>
<script>
import {getSingleVideoRequest} from "@/api/videos";
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import PreviewMedia from "@/components/Shared/PreviewMedia/PreviewMedia.vue";
import GeneralModal from "@/components/Shared/GeneralModal/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import {vueVimeoPlayer} from 'vue-vimeo-player'

export default {
  name: "index",
  components: {
    GeneralModal,
    ShowItem,
    PreviewMedia,
    Button,
    VimeoPlayer: vueVimeoPlayer
  },
  data() {
    return {
      videoUrl: null,
      video: {}
    }
  },
  methods: {
    showModal(video, typeOfVideo) {
      this.$bvModal.show('holdContent')
      if (typeOfVideo === 'withMusic' && video.vimeo_video_with_music_transcode) {
        this.videoUrl = video.vimeo_video_with_music_url.replace("https", "http")
      } else if (typeOfVideo === 'withOutMusic' && video.vimeo_video_without_music_transcode) {
        this.videoUrl = video.vimeo_video_without_music_url.replace("https", "http")
      } else if (typeOfVideo === 'withMusic' && !video.vimeo_video_with_music_transcode) {
        this.videoUrl = video.video_with_muisc
      } else {
        this.videoUrl = video.video_without_muisc
      }
    },
    hideModal() {
      this.$bvModal.hide('holdContent')
    },
    async registerPlayerEvents(player) {
      this.player = player
    }
  },
  mounted() {
    this.ApiService(getSingleVideoRequest(this.$route.params.id)).then((response) => {
      this.video = response.data.data
    }).then(() => {
      this.registerPlayerEvents()
    })
  }
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
