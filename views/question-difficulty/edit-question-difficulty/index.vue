<template>
  <section class="edit-role">
    <Modal
      :content-message="'تم التعديل بنجاح'"
      :showModal="showModal"
      :is-success="true"
    />
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
import Modal from "@/components/Shared/Modal/index.vue";

export default {
  name: "index",
  components: { AddEditQuestionDifficultyPoints, Modal },
  data() {
    return {
      permission: [],
      loading: false,
      showModal: false,
    };
  },
  mounted() {
  },
  methods: {

    handleEditQuestionDifficultyPoints($event) {
      this.ApiService(putQuestionDifficultyPointsRequest(this.$route.params.id, $event)).then((response) => {
        this.loading = true;
        this.showModal = true;
        setTimeout(() => {
          this.showModal = false;
          this.$router.push("/dashboard/question-difficulty");
          }, 3000);
      }) .catch(() => {
          this.loading = false;
        });
    },
    handleCancel() {
      this.$router.push("/dashboard/question-difficulty");
    },
  },
};
</script>
<style scoped lang="scss"></style>
