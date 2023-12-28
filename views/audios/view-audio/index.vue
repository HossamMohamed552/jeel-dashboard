<template>
  <section class="container-fluid custom-container">
    Audio Details
  </section>
</template>
<script>
import { getSingleVideoRequest } from "@/api/videos";
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import PreviewMedia from "@/components/Shared/PreviewMedia/PreviewMedia.vue";
import GeneralModal from "@/components/Shared/GeneralModal/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import { vueVimeoPlayer } from "vue-vimeo-player";

export default {
  name: "index",
  components: {
    GeneralModal,
    ShowItem,
    PreviewMedia,
    Button,
    VimeoPlayer: vueVimeoPlayer,
  },
  data() {
    return {
      videoUrl: null,
      video: {},
    };
  },
  methods: {
    showModal(video, typeOfVideo) {
      this.$bvModal.show("holdContent");
      if (
        typeOfVideo === "withMusic" &&
        video.vimeo_video_with_music_transcode
      ) {
        this.videoUrl = video.vimeo_video_with_music_url.replace(
          "https",
          "http"
        );
      } else if (
        typeOfVideo === "withOutMusic" &&
        video.vimeo_video_without_music_transcode
      ) {
        this.videoUrl = video.vimeo_video_without_music_url.replace(
          "https",
          "http"
        );
      } else if (
        typeOfVideo === "withMusic" &&
        !video.vimeo_video_with_music_transcode
      ) {
        this.videoUrl = video.video_with_muisc;
      } else {
        this.videoUrl = video.video_without_muisc;
      }
    },
    hideModal() {
      this.$bvModal.hide("holdContent");
    },
    async registerPlayerEvents(player) {
      this.player = player;
    },
  },
  mounted() {
    this.ApiService(getSingleVideoRequest(this.$route.params.id))
      .then((response) => {
        this.video = response.data.data;
      })
      .then(() => {
        this.registerPlayerEvents();
      });
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
