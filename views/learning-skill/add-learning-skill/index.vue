<template>
  <div class="add-country">
    <Modal :content-message="'تمت الإضافة بنجاح'" :showModal="showModal" :is-success="true" />
    <AddEditLearningSkill
      :loading="loading"
      @handleAddLearningSkill="handleAddLearningSkill($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditLearningSkill from "@/components/Modules/Users/AddEditLearningSkill/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import { postCreateLearningSkillRequest } from "@/api/learning-skill";

export default {
  name: "index",
  components: { Modal, AddEditLearningSkill },
  data() {
    return {
      loading: false,
      showModal: false,
    };
  },
  methods: {
    handleAddLearningSkill($event) {
      this.loading = true;

      this.ApiService(postCreateLearningSkillRequest({ name: $event }))
        .then((response) => {
          this.showModal = true;
          setTimeout(() => {
            this.$router.push("/dashboard/learning-skill");
          }, 3000);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleCancel() {
      this.$router.push("/dashboard/learning-skill");
    },
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
