<template>
  <div :class="withBackground ? 'withBackground' :''">
    <audio v-show="false" @ended="handleAudioEnd" ref="audio" controls>
      <source v-if="data?.item?.original_url" :src="data?.item?.original_url"/>
      <source v-if="data?.item?.audio" :src="data?.item?.audio"/>
      <source v-if="url" :src="url"/>
    </audio>
    <span class="fake-audio" :class="withBackground? 'withBackgroundForAudio':''" @click="handleFakePlay">
      <img src="@/assets/images/icons/audio-waves.svg"/>
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
    url: {
      type: String,
      default: ''
    },
    withBackground: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    handleFakePlay() {
      const audio = this.$refs.audio;
      console.log('audio',audio)
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
.heading{
  color: #828282;
}
i.fa-solid {
  font-family: "Font Awesome 6 Free" !important;
}
.withBackground{
  display: flex;
  justify-content: center;
  align-items: center;
  background: #58c6f247;
  border-radius: .5rem;
  padding: 2rem;
  margin-bottom: 1.5rem;
}
.withBackgroundForAudio{
  background: #fff;
  border-radius: 2rem;
  padding: .5rem;
  width: 100%;
  justify-content: center;
}
</style>
