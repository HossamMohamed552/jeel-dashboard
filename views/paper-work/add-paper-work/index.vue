<template>
  <div class="add-group">
    <Modal :content-message="$t('CONTROLS.add_successfully')" :showModal="showModal" :is-success="true" />
    <AddEditPaperWork
      :loading="loading"
      @handleAddPaperWork="handleAddPaperWork($event)"
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
  components: { Modal, AddEditPaperWork },
  data() {
    return {
      loading: false,
      showModal: false,
    };
  },
  mounted() {},
  methods: {
    handleAddPaperWork($event) {
      const formData = new FormData();
      formData.append("name", $event.name);
      formData.append("audio", $event.audio);
      formData.append("file", $event.file);
      formData.append("paper_work_without_color", $event.paper_work_without_color);
      formData.append("thumbnail", $event.thumbnail);
      formData.append("type", $event.type);
      formData.append("learning_path_id", $event.learning_path_id);
      formData.append("level_id", $event.level_id);
      formData.append("term_id", $event.term_id);
      formData.append("description", $event.description);
      formData.append("paper_work_final_degree", $event.paper_work_final_degree);
      // formData.append("blooms", $event.blooms);
      formData.append("lesson_id", $event.lesson_id);
      for (let bloom = 0; bloom < $event.blooms.length; bloom++) {
        formData.append(`blooms[${bloom}]`, $event.blooms[bloom]);
      }
      for (let language_skill = 0; language_skill < $event.language_skills.length; language_skill++) {
        formData.append(`language_skills[${language_skill}]`, $event.language_skills[language_skill]);
      }
      for (let learning_style = 0; learning_style < $event.learning_styles.length; learning_style++) {
        formData.append(`learning_styles[${learning_style}]`, $event.learning_styles[learning_style]);
      }

      this.loading = true;
      axios
        .post("/peper_works", formData, {
          headers: {
            Authorization: `Bearer ${VueCookies.get("token")}`,
            locale: "ar",
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.showModal = true;
          this.loading = false;
        })
        .then(() => {
          setTimeout(() => {
            this.showModal = false;
            this.$router.push("/dashboard/paper-work");
          }, 1500);
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    handleCancel() {
      this.$router.push("/dashboard/paper-work");
    },
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
