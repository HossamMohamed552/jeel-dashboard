<template>
  <div class="audio">
    <audio v-show="false" @ended="handleAudioEnd" ref="audio" controls>
      <source :src="audioSrc" />
    </audio>
    <span @click="handleFakePlay">
      <i class="fa-solid" :class="{ 'fa-play': !isPlaying, 'fa-pause': isPlaying }"></i>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isPlaying: false,
    };
  },
  props: {
    audioSrc: {
      type: String,
      default: "",
    },
  },
  methods: {
    handleFakePlay() {
      const audio = this.$refs.audio;
      if (this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      this.isPlaying = !this.isPlaying;
    },
    handleAudioEnd() {
      this.isPlaying = false;
    },
  },
};
</script>

<style lang="scss" scoped>
i {
  font-size: 14px;
  color: #76236c;
}
</style>
