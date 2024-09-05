<template>
  <div class="question">
    <div class="question__head">
      <AudioPlayer :audioSrc="question?.question_audio" />
      <p>
        <span>السؤال</span>
      </p>
      <img :src="question.question" alt="question" v-if="question.question_pattern_slug === 'image'">
      <audio controls v-else-if="question.question_pattern_slug === 'audio'">
        <source :src="question.question">
      </audio>
      <h5 class="question__title" v-else>{{ question?.question }}</h5>
    </div>
    <div class="question__answers columns">
      <span>خيارات الاجابات</span>
      <b-row>
        <b-col lg="12" v-for="answer in question?.answers" :key="answer.id">
          <div class="answer">
            <div class="answer__content" :class="answer?.correct ? 'correct' : ''">
              {{ answer.answer }}
            </div>
            <AudioPlayer :audioSrc="answer?.audio" />
            <div class="answer__correct" v-if="answer?.correct">
              <i class="fa-solid fa-check"></i>
              <span>الاجابة الصحيحة</span>
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import AudioPlayer from "@/components/Shared/AudioPlayer/index.vue";

export default {
  props: {
    question: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    AudioPlayer,
  },
};
</script>

<style lang="scss" scoped>
@import "../index.scss";
</style>
