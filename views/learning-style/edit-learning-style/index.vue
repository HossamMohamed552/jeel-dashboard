<template>
  <div class="edit-term">
    <Modal :content-message="$t('CONTROLS.edit_successfully')" :showModal="showModal" :is-success="true"/>
    <Modal :content-message="$t('CONTROLS.already_exists')" :showModal="showModalFailed" :isUsed="true"
           @cancelWithConfirm="showModalFailed=false"/>
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
import {putUpdateLearningStyleRequest} from "@/api/learning-style";

export default {
  name: "index",
  components: {Modal, AddEditLearningStyle},
  data() {
    return {
      loading: false,
      showModal: false,
      showModalFailed: false,
    };
  },
  methods: {
    handleEditLearningStyle($event) {
      this.loading = true;
      const id = this.$route.params.id;
      this.ApiService(putUpdateLearningStyleRequest({name: $event}, id))
        .then(() => {
          this.showModal = true
        }).catch((error) => {
        this.showModalFailed = !!error.response.data.errors.includes('قيمة الحقل الاسم مُستخدمة من قبل');
      }).finally(() => {
        this.loading = false;
        setTimeout(() => {
          this.showModal = false;
          this.$router.push("/dashboard/learning-style");
        }, 1500);
      });
    },
    handleCancel() {
      this.$router.push("/dashboard/learning-style");
    },
  },
};
</script>
<style scoped lang="scss"></style>
