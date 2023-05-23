<template>
  <section class="container-fluid custom-container">
    <div class="show-question">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">{{ $t('QUESTIONS.ShowDetails') }}</h2>
          </b-col>
        </b-row>
        <div class="divider">
          <b-row>
            <b-col lg="4">
              <ShowItem :title="$t('QUESTIONS.TYPE')" :subtitle="question.question_pattern"/>
            </b-col>
            <b-col lg="4">
              <ShowItem :title="$t('QUESTIONS.QUESTION')" :subtitle="question.question"/>
            </b-col>
            <b-col lg="4">
              <ShowItem :title="$t('QUESTIONS.QUESTION_PATTERN')" :subtitle="question.question_type.name"/>
            </b-col>
          </b-row>
        </div>
        <div class="divider-bottom">
          <b-row>
            <b-col lg="4">
              <ShowItem :title="$t('QUESTIONS.QUESTIONDIFFICULTIES')" :subtitle="question.question_difficulty.name"/>
            </b-col>
            <b-col lg="4">
              <ShowItem :title="$t('QUESTIONS.BLOOM_CATEGORIES')" :subtitle="question.bloom_category.name"/>
            </b-col>
            <b-col lg="4">
              <ShowItem :title="$t('QUESTIONS.LEARNING_METHOD')" :subtitle="question.learningPath.name"/>
            </b-col>
          </b-row>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import {getSingleQuestionRequest} from "@/api/question";

export default {
  name: "index",
  components: {ShowItem},
  data() {
    return {
      question: null
    }
  },
  mounted() {
    this.ApiService(getSingleQuestionRequest(this.$route.params.id)).then((response) => {
      this.question = response.data.data
    })
  }
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
