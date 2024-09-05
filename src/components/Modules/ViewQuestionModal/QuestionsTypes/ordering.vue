<template>
  <div class="question">
    <div class="question__head">
      <AudioPlayer :audioSrc="question?.question_audio"/>
      <p>
        <span>السؤال</span>
      </p>
      <img :src="question.question" alt="question"
           v-if="question.question_pattern_slug === 'image'">
      <audio controls v-else-if="question.question_pattern_slug === 'audio'">
        <source :src="question.question">
      </audio>
      <h5 class="question__title" v-else v-html="previewQuestion(question)"></h5>
    </div>
    <div class="question__answers">
      <span>خيارات الاجابات</span>
      <b-row class="" v-if="question?.sub_question_type?.slug === 'order_image_without_question'">
        <b-col lg="6" v-for="answer in question?.answers" :key="answer.id">
          <div class="answer">
            <div class="answer__content" :class="answer?.correct ? 'correct' : ''">
              <img :src="answer.answer"/>
            </div>
            <AudioPlayer :audioSrc="answer?.audio"/>
            <div class="answer__correct" v-if="answer?.correct">
              <i class="fa-solid fa-check"></i>
              <span>الاجابة الصحيحة</span>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row class="columns" v-else>
        <b-col lg="12" v-for="answer in question?.answers" :key="answer.id">
          <div class="answer">
            <div class="answer__content" :class="answer?.correct ? 'correct' : ''">
              {{ answer.answer }}
            </div>
            <AudioPlayer :audioSrc="answer?.audio"/>
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
      default: () => {
      },
    },
  },
  methods:{
    previewQuestion(question){
      return question.question.replace(/%s/g,"<span style='display: inline-block; width: 100px; height: 50px; background: #eee; border-radius: 1rem;border: 1px solid; margin: 0 .5rem'></span>");
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
