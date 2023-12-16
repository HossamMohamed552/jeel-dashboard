<template>
  <div class="edit-term">
    <AddEditLearningStyle
      :loading="loading"
      @handleEditLearningStyle="handleEditLearningStyle($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditLearningStyle from "@/components/Modules/Users/addEditLearningStyle/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import { putUpdateLearningStyleRequest } from "@/api/learning-style";

export default {
  name: "index",
  components: { Modal, AddEditLearningStyle },
  data() {
    return {
      loading: false,
      showModal: false,
    };
  },
  methods: {
    handleEditLearningStyle($event) {
      this.loading = true;
      const id = this.$route.params.id;
      this.ApiService(putUpdateLearningStyleRequest({ name: $event }, id))

        .then(() => {
          this.$router.push("/dashboard/learning-style");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleCancel() {
      this.$router.push("/dashboard/learning-style");
    },
  },
};
</script>
<style scoped lang="scss"></style>
