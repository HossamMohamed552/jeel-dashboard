<template>
  <section class="container-fluid custom-container" v-if="video">
    <div class="show-group">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">{{ $t('VIDEO.ShowDetails') }}</h2>
          </b-col>
        </b-row>
        <b-row class="divider">
          <b-col lg="6">
            <ShowItem :title="$t('VIDEO.NAME')" :subtitle="video.original_name"/>
          </b-col>
          <b-col lg="6">
            <ShowItem :title="$t('VIDEO.Description')" :subtitle="video.description"/>
          </b-col>
        </b-row>
        <b-row class="divider">
          <b-col class="my-5" lg="4">
            <ShowItem :title="$t('VIDEO.learning_path')" :subtitle="video.learningPath.name"/>
          </b-col>
          <b-col class="my-5" lg="4">
            <ShowItem :title="$t('VIDEO.level')" :subtitle="video.level.name"/>
          </b-col>
          <b-col class="my-5" lg="4">
            <ShowItem :title="$t('MISSIONS.terms')" :subtitle="video.term.name"/>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col v-if="video.thumbnail" lg="4">
            <ShowItem :title="$t('VIDEO.UPLOAD_IMAGE')"/>
            <img :src="video.thumbnail" class="video-img"/>
          </b-col>
          <b-col :lg="video.thumbnail ? 4 : 6">
            <div class="title">
              فيديو بصوت
            </div>
            <video style="max-width: 100%;" controls v-if="video.video_with_music_fullback_url" class="show-video">
              <source :src="`${video.video_with_music_fullback_url}`" type="video/mp4">
            </video>
          </b-col>
          <b-col :lg="video.thumbnail ? 4 : 6">
            <div class="title">
              فيديو بدون صوت
            </div>
            <video style="max-width: 100%;" controls v-if="video.video_without_music_fallback_url" class="show-video">
              <source :src="`${video.video_without_music_fallback_url}`" type="video/mp4">
            </video>
          </b-col>
        </b-row>
      </div>
    </div>
  </section>
</template>
<script>
import {getSingleVideoRequest} from "@/api/videos";
import ShowItem from "@/components/Shared/ShowItem/index.vue";

export default {
  name: "index",
  components: {
    ShowItem
  },
  data() {
    return {
      video: {}
    }
  },
  mounted() {
    this.ApiService(getSingleVideoRequest(this.$route.params.id)).then((response) => {
      this.video = response.data.data
    })
  }
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
