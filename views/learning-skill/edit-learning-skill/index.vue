<template>
  <div class="edit-term">
    <Modal :content-message="'هذا السجل موجود من قبل'" :showModal="showModalFailed" :isUsed="true"
           @cancelWithConfirm="showModalFailed=false"/>
    <AddEditLearningSkill
      :loading="loading"
      @handleEditLearningSkill="handleEditLearningSkill($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditLearningSkill from "@/components/Modules/Users/AddEditLearningSkill/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import {putUpdateLearningSkillRequest} from "@/api/learning-skill";

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
    handleEditLearningSkill($event) {
      this.loading = true;
      const id = this.$route.params.id;
      this.ApiService(putUpdateLearningSkillRequest({name: $event}, id))
        .then(() => {
          this.$router.push("/dashboard/learning-skill");
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
<style scoped lang="scss"></style>
