<template>
  <div class="add-edit-learning-skill">
    <Modal :content-message="'تمت الإضافة بنجاح'" :showModal="showModal" :is-success="true"/>
    <Modal :content-message="'هذا السجل موجود من قبل'" :showModal="showModalFailed" :isUsed="true"
           @cancelWithConfirm="showModalFailed=false"/>
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
import {postCreateLearningSkillRequest} from "@/api/learning-skill";

export default {
  name: "index",
  components: {Modal, AddEditLearningSkill},
  data() {
    return {
      loading: false,
      showModal: false,
      showModalFailed: false,
    };
  },
  methods: {
    handleAddLearningSkill($event) {
      this.loading = true;
      this.ApiService(postCreateLearningSkillRequest({name: $event}))
        .then((response) => {
          this.showModal = true;
          setTimeout(() => {
            this.$router.push("/dashboard/learning-skill");
          }, 1500);
        }).catch((error) => {
        this.loading = false;
        this.showModalFailed = !!error.response.data.errors.includes('قيمة الحقل الإسم مُستخدمة من قبل');
      }).finally(() => {
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
