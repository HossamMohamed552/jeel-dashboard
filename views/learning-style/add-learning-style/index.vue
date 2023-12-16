<template>
  <div class="add-country">
    <Modal :content-message="'تمت الإضافة بنجاح'" :showModal="showModal" :is-success="true" />
    <AddEditLearningStyle
      :loading="loading"
      @handleAddLearningStyle="handleAddLearningStyle($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditLearningStyle from "@/components/Modules/Users/addEditLearningStyle/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import { postCreateLearningStyleRequest } from "@/api/learning-style";

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
    handleAddLearningStyle($event) {
      this.loading = true;
      this.ApiService(postCreateLearningStyleRequest({ name: $event }))
        .then((response) => {
          this.showModal = true;
          setTimeout(() => {
            this.$router.push("/dashboard/learning-style");
          }, 3000);
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
<style scoped lang="scss">
@import "./index";
</style>
