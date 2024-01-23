<template>
  <div class="add-group">
    <Modal
      :content-message="isSuccess ? 'تمت الإضافة بنجاح' : 'فشل الاضافه'"
      :showModal="showModal"
      :is-success="isSuccess"
      :is-failed="isFailed"
      @cancel="
        showModal = false;
        $router.push('/dashboard/audio');
      "
    />
    <AddEditAudio
      :loading="loading"
      @handleAddAudio="handleAddAudio($event)"
      @handleCancel="handleCancel"
    />
    <ProgressModal
      :show="loading"
      :value="progress"
      :title="audio_name"
      @cancel="cancelUpload()"
    ></ProgressModal>
  </div>
</template>
<script>
import AddEditAudio from "@/components/Modules/Audios/AddEditAudio/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import axios from "axios";
import VueCookies from "vue-cookies";
import ProgressModal from "@/components/Shared/ProgressModal/index.vue";

export default {
  name: "index",
  components: { Modal, AddEditAudio, ProgressModal },
  data() {
    return {
      loading: false,
      showModal: false,
      showProgressModal: false,
      progress: 0,
      audio_name: "",
      isSuccess: true,
      isFailed: false,
      cancelSource: null,
    };
  },
  mounted() {},
  methods: {
    handleAddAudio($event) {
      console.log("$event", $event);
      this.audio_name = $event.name;
      const formData = new FormData();
      formData.append("name", $event.name);
      formData.append("task_degree", $event.task_degree);
      formData.append("type", $event.type);
      formData.append("task_audio", $event.task_audio);
      if ($event.typeName == "text") formData.append("task", $event.task);
      if ($event.typeName == "images")
        formData.append("task_image", $event.task_image);
      formData.append("learning_path_id", $event.learning_path_id);
      formData.append("blooms", $event.blooms);
      formData.append("lesson_id", $event.lesson_id);

      for (let learning_style = 0; learning_style < $event.learning_styles.length; learning_style++) {
        formData.append(`learning_styles[${learning_style}]`, $event.learning_styles[learning_style]);
      }

      for (let language_skill = 0; language_skill < $event.language_skills.length; language_skill++) {
        formData.append(`language_skills[${language_skill}]`, $event.language_skills[language_skill]);
      }



      this.loading = true;
      let axiosSource = axios.CancelToken.source();
      this.cancelSource = axiosSource;
      axios
        .post("/tasks", formData, {
          cancelToken: axiosSource.token,
          onUploadProgress: ({ loaded, total }) => {
            this.progress = Math.floor((loaded / total) * 100);
          },
          headers: {
            Authorization: `Bearer ${VueCookies.get("token")}`,
            locale: "ar",
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.showModal = true;
          this.loading = false;
          this.isSuccess = true;
          this.isFailed = false;
          setTimeout(() => {
            this.showModal = false;
            this.$router.push("/dashboard/audio");
          }, 2000);
        })
        .catch((err) => {
          this.showModal = true;
          this.loading = false;
          this.isSuccess = false;
          this.isFailed = true;
        });
    },
    handleCancel() {
      this.$router.push("/dashboard/audio");
    },
    cancelUpload() {
      this.loading = false;
      this.cancelSource.cancel();
    },
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
