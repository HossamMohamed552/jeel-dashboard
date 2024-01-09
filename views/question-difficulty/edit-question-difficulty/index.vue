<template>
  <section class="edit-role">
    <AddEditQuestionDifficultyPoints
      :loading="loading"
      @handleEditQuestionDifficultyPoints="handleEditQuestionDifficultyPoints($event)"
      @handleCancel="handleCancel"
    />
  </section>
</template>
<script>
import AddEditQuestionDifficultyPoints from "@/components/Modules/QuestionDifficulty/AddEditQuestionDifficultyPoints/index.vue";
import { putQuestionDifficultyPointsRequest } from "@/api/question-difficulty";

export default {
  name: "index",
  components: { AddEditQuestionDifficultyPoints },
  data() {
    return {
      permission: [],
      loading: false,
    };
  },
  mounted() {
  },
  methods: {

    handleEditQuestionDifficultyPoints($event) {
      this.ApiService(putQuestionDifficultyPointsRequest(this.$route.params.id, $event)).then((response) => {
        this.$router.push("/dashboard/question-difficulty");
      });
    },
    handleCancel() {
      this.$router.push("/dashboard/question-difficulty");
    },
  },
};
</script>
<style scoped lang="scss"></style>
