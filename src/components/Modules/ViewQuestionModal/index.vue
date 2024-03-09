<template>
  <b-modal
    v-model="innerModal"
    class="custom-rounded"
    @hide="cancel()"
    size="lg"
    title="تفاصيل السؤال"
    centered
    hide-footer
  >
    <b-tabs content-class="mt-3">
      <b-tab title="معلومات السؤال" active>
        <b-row>
          <b-col lg="4">
            <ShowItem title="نمط السؤال" :subtitle="question?.question_type?.name" />
          </b-col>
          <b-col lg="4">
            <ShowItem title="نمط السؤال الفرعى" :subtitle="question?.sub_question_type?.name" />
          </b-col>
          <b-col lg="4">
            <ShowItem title="هدف السؤال" :subtitle="question?.sub_question_type?.name" />
          </b-col>
          <b-col lg="4">
            <ShowItem title="المسار" :subtitle="question?.learningPath?.name" />
          </b-col>
          <b-col lg="4">
            <ShowItem title="مخرجات التعلم" :subtitle="question?.question_outcome?.name" />
          </b-col>
          <b-col lg="4">
            <ShowItem title="نوع المهارة اللغوية" :subtitle="question?.question_pattern" />
          </b-col>
          <b-col lg="4">
            <ShowItem
              :class="question?.question_difficulty?.slug"
              title="المستوى"
              :subtitle="question?.question_difficulty?.name"
            />
          </b-col>
          <b-col lg="4">
            <ShowItem title="بلوم" :subtitle="question?.blooms?.name" />
          </b-col>
          <b-col lg="4">
            <ShowItem
              title="اسلوب التعلم"
              :subtitle="this.learningStyles(question?.learning_styles)"
            />
          </b-col>
        </b-row>
      </b-tab>
      <b-tab title="مراجعة السؤال">
        <mcq v-if="question?.question_type?.slug == 'mcq'" :question="question" />
        <ordering v-else-if="question?.question_type?.slug == 'ordering'" :question="question" />
        <trueFalse v-else-if="question?.question_type?.slug == 'true_false'" :question="question" />
        <match v-else-if="question?.question_type?.slug == 'match'" :question="question" />
      </b-tab>
    </b-tabs>
  </b-modal>
</template>

<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
// Questions Types
import mcq from "./QuestionsTypes/mcq.vue";
import ordering from "./QuestionsTypes/ordering.vue";
import trueFalse from "./QuestionsTypes/trueFalse.vue";
import match from "./QuestionsTypes/match.vue";

export default {
  components: {
    ShowItem,
    mcq,
    ordering,
    trueFalse,
    match,
  },
  data() {
    return {
      innerModal: false,
    };
  },
  props: {
    question: {
      type: Object,
      default: () => {},
    },
    showModal: {
      type: Boolean,
      default: false,
    },
  },
  computed: {},
  methods: {
    cancel() {
      this.$emit("cancel", false);
    },
    learningStyles(value) {
      if (value) {
        return value.map((item) => item.name).join(", ");
      }
      return "";
    },
  },
  watch: {
    showModal(newVal) {
      this.innerModal = newVal;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index";
</style>
