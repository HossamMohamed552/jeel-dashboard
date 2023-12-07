<template>
  <div class="video-player">
    <video ref="videoPlayer" class="video-js"></video>
  </div>
</template>

<script>
import {defineComponent} from 'vue'
import videojs from 'video.js';
export default defineComponent({
  name: 'VideoPlayer',
  props: {
    videoId: {
      type: Number,
      required: true
    },
    options: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      player: null,
      viewPoster: true,
      showModal: false,
      videoEnded: false,
      lastTime: 0,
      percentageWatched: 0,
      watch70Percent: false,
    }
  },
  methods: {},
  mounted() {
    this.player = videojs(this.$refs.videoPlayer, this.options, () => {
    });
    this.player.on('play', () => {
      this.player.currentTime(0)
      this.lastTime = 0
    })
    this.player.on('ready', () => {
    })
    this.player.on('ended', () => {
    })
    this.player.bigPlayButton.on('click', () => {
    })
    this.$emit('videRef', this.player)
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
})
</script>

<style lang="scss">
@import url('./VideoPlayer.scss');
</style>
