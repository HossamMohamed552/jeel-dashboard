<template>
  <div class="add-group">
    <Modal :content-message="'تمت الإضافة بنجاح'"
           :showModal="showModal"
           :is-success="true"/>
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

export default{
  name: "index",
  components: {Modal, AddEditPaperWork},
  data() {
    return {
      loading: false,
      showModal: false,
    };
  },
  mounted() {
  },
  methods: {
    handleAddPaperWork($event) {
      const formData = new FormData()
      formData.append('name',$event.name);
      formData.append('type',$event.type);
      formData.append('learning_path_id',$event.learning_path_id);
      formData.append('file',$event.file);
      formData.append('paper_work_without_color',$event.paper_work_without_color);
      formData.append('level_id',$event.level_id);
      formData.append('term_id',$event.term_id);
      formData.append('description',$event.description);
      formData.append('thumbnail', $event.thumbnail);
      formData.append('paper_work_final_degree', $event.paper_work_final_degree);
      this.loading = true;
      axios.post('/peper_works', formData, {
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
        this.$router.push("/dashboard/paper-work");
      }).catch(err=>{
        this.loading = false;
      })
    },
    handleCancel() {
      this.$router.push("/dashboard/paper-work");
    },
  },
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
