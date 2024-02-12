<template>
  <div>
    <audio v-show="false" @ended="handleAudioEnd" ref="audio" controls>
      <source :src="data.item.original_url" />
    </audio>
    <span class="fake-audio" @click="handleFakePlay">
      <img src="@/assets/images/icons/audio-waves.svg" />
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
    data: Object,
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

<style scoped lang="scss">
.fake-audio {
  display: flex;
  align-items: center;
  gap: 10px;
  i {
    font-size: 14px;
    color: #76236c;
  }
  img {
    width: 65px;
  }
}

i.fa-solid {
  font-family: "Font Awesome 6 Free" !important;
}
</style>
