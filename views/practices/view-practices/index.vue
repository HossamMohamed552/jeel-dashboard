<template>
  <section class="container-fluid custom-container">
    <div class="show-quiz">
      <b-row>
        <b-col lg="12">
          <h2 class="heading">{{ $t('QUIZZES.ShowDetails') }}</h2>
        </b-col>
      </b-row>
      <div class="divider">
        <b-row>
          <b-col lg="4" class="mb-4">
            <ShowItem :title="$t('QUIZZES.name')" :subtitle="quiz.name"/>
          </b-col>
          <b-col lg="4" class="mb-4" v-if="quiz && quiz.type">
            <ShowItem :title="$t('QUIZZES.type')" :subtitle="quiz.type.name"/>
          </b-col>
          <b-col lg="4" class="mb-4" v-if="quiz && quiz.level">
            <ShowItem :title="$t('QUIZZES.level')" :subtitle="quiz.level.name"/>
          </b-col>
          <b-col lg="4" class="mb-4" v-if="quiz && quiz.learning_path">
            <ShowItem :title="$t('QUIZZES.LEARNING_PATH')" :subtitle="quiz.learning_path.name"/>
          </b-col>
          <b-col lg="4">
            <ShowItem :title="$t('QUIZZES.description')" :subtitle="quiz.description"/>
          </b-col>
          <b-col lg="4" class="mb-4" v-if="quiz.questions_difficulties">
            <b-row>
              <b-col lg="12">
                <ShowItem :title="$t('QUIZZES.DifficultiesOfQuestions')"/>
              </b-col>
              <b-col lg="4" class="mb-4" v-for="question in quiz.questions_difficulties" :key="question.id">
                <ShowItem :title="question.name" :subtitle="question.total_question"/>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="12">
            <ShowItem :title="$t('QUESTIONS.QUESTIONS')"/>
          </b-col>
          <b-col lg="6" v-for="question in quiz.questions" :key="question.id">
            <ShowItem :title="question.question" class="question mb-3" v-if="question.question_pattern === 'text'" />
            <img class="question_img mb-3" v-else-if="question.question_pattern === 'image'" :src="question.question.question">
            <audio controls v-else-if="question.question_pattern === 'audio'" class="mb-3">
              <source :src="question.question.question" />
            </audio>
          </b-col>
        </b-row>
      </div>
    </div>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import {getSingleQuizRequest} from "@/api/quiz";

export default {
  name: "index",
  components: {ShowItem},
  data() {
    return {
      quiz: {}
    }
  },
  mounted() {
    this.ApiService(getSingleQuizRequest(this.$route.params.id)).then((response) => {
      this.quiz = response.data.data

    })
  }
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
