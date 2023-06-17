<template>
  <div class="add-group">
    <Modal :content-message="'تمت الإضافة بنجاح'"
           :showModal="showModal"
           :is-success="true"/>
    <AddEditVideo
      :loading="loading"
      @handleAddVideo="handleAddVideo($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditVideo from "@/components/Modules/Users/AddEditVideo/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import axios from "axios";
import VueCookies from "vue-cookies";

export default{
  name: "index",
  components: {Modal, AddEditVideo},
  data() {
    return {
      loading: false,
      showModal: false,
    };
  },
  mounted() {
  },
  methods: {
    handleAddVideo($event) {
      const formData = new FormData()
      formData.append('name',$event.name);
      formData.append('title',$event.name);
      formData.append('original_name',$event.name);
      formData.append('description',$event.description);
      formData.append('learning_path_id',$event.learning_path_id);
      formData.append('video',$event.video);
      formData.append('level_id', $event.level_id);
      if($event.thumbnail)
      formData.append('thumbnail', $event.thumbnail);
      
      this.loading = true;
      axios.post('/videos', formData, {
        headers: {
          Authorization: `Bearer ${VueCookies.get("token")}`,
          locale: 'ar',
          'Content-Type': 'multipart/form-data'
        }
      }).then((response) => {
        this.showModal = true
        this.loading = false
        setTimeout(() => {
          this.showModal = false
        }, 3000)
      }).then(()=>{
        this.$router.push("/dashboard/video");
      }).catch(err=>{
        this.loading = false;
      })
    },
    handleCancel() {
      this.$router.push("/dashboard/video");
    },
  },
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
