<template>
  <div>
    <Modal :content-message="isSuccess ? 'تم التعديل بنجاح' : 'فشل التعديل'"
           :showModal="showModal"
           :is-success="isSuccess"
           :is-failed="isFailed"
           @cancel="showModal = false;$router.push('/dashboard/video')"/>
    <div class="edit-term">
      <AddEditVideo
        :loading="loading"
        @handleEditVideo="handleEditVideo($event)"
        @handleCancel="handleCancel"
      />
    </div>
    <ProgressModal :show="loading" :value="progress" :title="video_name"
                   @cancel="cancelUpload()"></ProgressModal>
  </div>
</template>
<script>

import AddEditVideo from "@/components/Modules/Users/AddEditVideo/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import axios from "axios";
import VueCookies from "vue-cookies";
import ProgressModal from "@/components/Shared/ProgressModal/index.vue";

export default {
  name: "index",
  components: {Modal, AddEditVideo,ProgressModal},
  data() {
    return {
      loading: false,
      showModal: false,
      showProgressModal: false,
      progress: 0,
      video_name: '',
      isSuccess: true,
      isFailed: false,
      cancelSource: null
    }
  },
  methods: {
    handleEditVideo($event) {
      console.log('$event',$event)
      const formData = new FormData()
      formData.append('title', $event.name);
      formData.append('description', $event.description);
      formData.append('learning_path_id', $event.learning_path_id);
      formData.append('blooms', $event.blooms);
      formData.append('lesson_id', $event.lesson_id);
      for (let learning=0; learning < $event.learning_styles.length; learning++){
        formData.append(`learning_styles[${learning}]`, $event.learning_styles[learning]);
      }
      for (let languageSkill=0; languageSkill < $event.learning_styles.length; languageSkill++){
        formData.append(`language_skills[${languageSkill}]`, $event.language_skills[languageSkill]);
      }
      formData.append("_method", 'PUT');
      if ($event.thumbnailChangedRequest)
        formData.append('thumbnail', $event.thumbnail);
      if ($event.videoChangedRequest)
        formData.append('video', $event.video);
      if ($event.video_without_musicChangedRequest)
        formData.append('video_without_music', $event.video_without_music);
      this.loading = true;
      let axiosSource = axios.CancelToken.source();
      this.cancelSource = axiosSource;
      axios.post(`/videos/${this.$route.params.id}`, formData, {
        cancelToken: axiosSource.token,
        onUploadProgress: ({loaded, total}) => {
          this.progress = Math.floor((loaded / total) * 100)
        },
        headers: {
          Authorization: `Bearer ${VueCookies.get("token")}`,
          locale: 'ar',
          'Content-Type': 'multipart/form-data',
          'Accept': '*/*'
        }
      }).then((response) => {
        this.showModal = true
        this.loading = false
        this.isSuccess = true;
        this.isFailed = false;
        setTimeout(() => {
          this.showModal = false
          this.$router.push("/dashboard/video");
        }, 1500)
      }).catch(err => {
        this.showModal = true
        this.loading = false;
        this.isSuccess = false;
        this.isFailed = true;
      })
    },
    handleCancel() {
      this.$router.push("/dashboard/video");
    },
    cancelUpload() {
      this.loading = false
      this.cancelSource.cancel();
    }
  }
}
</script>
<style scoped lang="scss">
</style>
