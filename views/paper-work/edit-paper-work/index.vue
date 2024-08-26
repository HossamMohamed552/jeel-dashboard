<template>
  <div class="edit-term">
    <Modal :content-message="$t('CONTROLS.edit_successfully')" :showModal="showModal"
           :is-success="true"/>
    <AddEditPaperWork
      :loading="loading"
      @handleEditPaperWork="handleEditPaperWork($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>

import AddEditPaperWork from "@/components/Modules/Users/AddEditPaperWork/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import axios from "axios";
import VueCookies from "vue-cookies";

export default {
  name: "index",
  components: {Modal, AddEditPaperWork},
  data() {
    return {
      loading: false,
      showModal: false,
    }
  },
  methods: {
    handleEditPaperWork($event) {
      const formData = new FormData()
      formData.append('name', $event.name);
      formData.append('type', $event.type);
      formData.append('learning_path_id', $event.learning_path_id);
      formData.append('description', $event.description);
      formData.append('paper_work_final_degree', $event.paper_work_final_degree);
      // formData.append('blooms', $event.blooms);
      formData.append('lesson_id', $event.lesson_id);
      // formData.append('learning_styles', $event.learning_styles);
      // formData.append('language_skills', $event.language_skills);
      for (let bloom = 0; bloom < $event.blooms.length; bloom++) {
        formData.append(`blooms[${bloom}]`, $event.blooms[bloom]);
      }
      for (let language_skill = 0; language_skill < $event.language_skills.length; language_skill++) {
        formData.append(`language_skills[${language_skill}]`, $event.language_skills[language_skill]);
      }
      for (let learning_style = 0; learning_style < $event.learning_styles.length; learning_style++) {
        formData.append(`learning_styles[${learning_style}]`, $event.learning_styles[learning_style]);
      }
      if ($event.audioChangedRequest) {
        formData.append('audio', $event.audio);
      }
      if ($event.fileChangedRequest) {
        formData.append('file', $event.file);
      }
      if ($event.paper_work_without_colorChangedRequest) {
        formData.append('paper_work_without_color', $event.paper_work_without_color);
      }
      if ($event.thumbnailChangedRequest) {
        formData.append('thumbnail', $event.thumbnail);
      }
      formData.append('_method', 'PUT');
      this.loading = true;
      axios.post(`/peper_works/${this.$route.params.id}`, formData, {
        headers: {
          Authorization: `Bearer ${VueCookies.get("token")}`,
          locale: 'ar',
          'Content-Type': 'multipart/form-data',
          'Accept': '*/*'
        }
      }).then((response) => {
        this.showModal = true
        this.loading = false
      }).then(() => {
        setTimeout(() => {
          this.showModal = false
          this.$router.push("/dashboard/paper-work");
        }, 1500)
      }).catch(err => {
        this.loading = false;
      })
    },
    handleCancel() {
      this.$router.push("/dashboard/paper-work");
    },
  }
}
</script>
<style scoped lang="scss">
</style>
