<template>
  <div class="add-group">
    <Modal :content-message="isSuccess ? 'تمت الإضافة بنجاح' : 'فشل الاضافه'"
           :showModal="showModal"
           :is-success="isSuccess"
           :is-failed="isFailed"
           @cancel="showModal = false;$router.push('/dashboard/video')"/>
    <AddEditAudio
      :loading="loading"
      @handleAddAudio="handleAddAudio($event)"
      @handleCancel="handleCancel"
    />
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
  components: {Modal, AddEditAudio, ProgressModal},
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
    };
  },
  mounted() {
  },
  methods: {
    handleAddAudio($event) {
      console.log('$event', $event)
      this.audio_name = $event.name;
      const formData = new FormData()
      formData.append('title', $event.name);
      formData.append('description', $event.description);
      formData.append('learning_path_id', $event.learning_path_id);
      formData.append('thumbnail', $event.thumbnail);
      formData.append('video', $event.video);
      formData.append('video_without_music', $event.video_without_music);
      formData.append('blooms', $event.blooms);
      formData.append('lesson_id', $event.lesson_id);
      formData.append('learning_styles', $event.learning_styles);
      formData.append('language_skills', $event.language_skills);

      // formData.append('level_id', $event.level_id);
      // formData.append('term_id', $event.term_id);

      this.loading = true;
      let axiosSource = axios.CancelToken.source();
      this.cancelSource = axiosSource;
      axios.post('/videos', formData, {
        cancelToken: axiosSource.token,
        onUploadProgress: ({loaded, total}) => {
          this.progress = Math.floor((loaded / total) * 100)
        },
        headers: {
          Authorization: `Bearer ${VueCookies.get("token")}`,
          locale: 'ar',
          'Content-Type': 'multipart/form-data'
        }
      }).then((response) => {
        this.showModal = true;
        this.loading = false;
        this.isSuccess = true;
        this.isFailed = false;
        setTimeout(() => {
          this.showModal = false
          this.$router.push("/dashboard/audio");
        }, 2000)
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
  },
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
