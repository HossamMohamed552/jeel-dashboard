<template>
  <div class="add-country">
    <Modal
      :content-message="$t('CONTROLS.edit_successfully')"
      :showModal="showModal"
      :is-success="true"
    />
    <Modal :content-message="$t('CONTROLS.already_exists')" :showModal="showModalFailed" :isUsed="true"
           @cancelWithConfirm="showModalFailed=false"/>
    <AddEditLesson
      :loading="loading"
      @editLessons="handleEditLessons($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditLesson from "@/components/Modules/Lessons/AddEditLesson/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import { putEditLessonRequest } from "@/api/lessons";
export default {
  name: "index",
  components: { Modal, AddEditLesson },
  data() {
    return {
      loading: false,
      showModal: false,
      showModalFailed: false,
      lessonId: this.$route.params.id,
    };
  },
  methods: {
    handleEditLessons($event) {
      this.loading = true;
      this.ApiService(putEditLessonRequest(this.lessonId, $event))
        .then(() => {
          this.loading = false;
        })
        .then(() => {
          this.showModal = true;
          setTimeout(() => {
            this.showModal = false;
            this.$router.push("/dashboard/lessons");
          }, 1500);
        })
        .catch((error) => {
          this.showModalFailed = !!error.response.data.errors.includes('قيمة الحقل الاسم مُستخدمة من قبل');
          this.loading = false;
        });
    },
    handleCancel() {
      this.$router.push("/dashboard/lessons");
    },
  },
};
</script>
<style scoped lang="scss"></style>
