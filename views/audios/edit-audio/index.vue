<template>
  <div>
    <Modal :content-message="isSuccess ? 'تمت التعديل بنجاح' : 'فشل التعديل'"
           :showModal="showModal"
           :is-success="isSuccess"
           :is-failed="isFailed"
           @cancel="showModal = false;$router.push('/dashboard/audio')"/>
    <div class="edit-term">
      <AddEditAudio
        :loading="loading"
        @handleEditAudio="handleEditAudio($event)"
        @handleCancel="handleCancel"
      />
    </div>
    <ProgressModal :show="loading" :value="progress" :title="audio_name"
                   @cancel="cancelUpload()"></ProgressModal>
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
  components: {Modal, AddEditAudio,ProgressModal},
  data() {
    return {
      loading: false,
      showModal: false,
      showProgressModal: false,
      progress: 0,
      audio_name: '',
      isSuccess: true,
      isFailed: false,
      cancelSource: null
    }
  },
  methods: {
    handleEditAudio($event) {
      this.audio_name = $event.name;
      const formData = new FormData()
      formData.append('name', $event.name);
      formData.append('task_degree', $event.task_degree);
      formData.append('original_name', $event.name);
      formData.append('description', $event.description);
      formData.append('learning_path_id', $event.learning_path_id);
      formData.append('level_id', $event.level_id);
      formData.append('term_id', $event.term_id);
      formData.append("_method", 'PUT');
      if ($event.thumbnail)
        formData.append('thumbnail', $event.thumbnail);
      if ($event.uploadVideo)
        formData.append('video', $event.video);
      if ($event.uploadVideoWithoutMusic)
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
          this.$router.push("/dashboard/audio");
        }, 3000)
      }).catch(err => {
        this.showModal = true
        this.loading = false;
        this.isSuccess = false;
        this.isFailed = true;
      })
    },
    handleCancel() {
      this.$router.push("/dashboard/audio");
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
