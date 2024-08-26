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
          <b-col lg="4" class="mb-4" v-if="quiz && quiz.quizType">
            <ShowItem :title="$t('QUIZZES.type')" :subtitle="quiz.quizType.name"/>
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
            <ShowItem :title="$t('QUESTIONS.QUESTIONS')" class="font-weight-bold"/>
          </b-col>
          <b-col lg="12" v-for="question in quiz.questions" :key="question.id">
            <div class="icon-play-holder">
              <ShowItem :subtitle="question.question" v-if="question.question_pattern === 'text'" class="my-3"/>
              <img class="question_img my-3" :src="question.question.question" v-if="question.question_pattern === 'image'">
              <audio controls v-if="question.question_pattern === 'audio'" class="my-3">
                <source :src="question.question.question" />
              </audio>
              <b-icon
                class="cursor-pointer"
                icon="info-circle"
                variant="info"
                @click="handleShowQuestionDetails(question.id)"
              />
            </div>
          </b-col>
        </b-row>
      </div>
    </div>
    <QuestionDetailsModal
      :question-id="selectedQuestion"
      @closeModal="handleCloseQuestionDetailsModal"
    />
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import {getSingleQuizRequest} from "@/api/quiz";
import QuestionDetailsModal from "@/components/Shared/QuestionDetailsModal/index.vue";

export default {
  name: "index",
  components: {QuestionDetailsModal, ShowItem},
  data() {
    return {
      quiz: {},
      selectedQuestion: null,
    }
  },
  methods:{
    handleShowQuestionDetails(questionId) {
      this.selectedQuestion = questionId;
      this.$bvModal.show("question-details-modal");
    },
    handleCloseQuestionDetailsModal() {
      this.$bvModal.hide("question-details-modal");
      this.selectedQuestion = null;
    },
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
