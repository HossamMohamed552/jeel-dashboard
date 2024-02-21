<template>
  <div class="add-group">
    <Modal :content-message="' تم التعديل بنجاح'"
           :showModal="showModal"
           :is-success="true"/>
    <Modal :content-message="'هذا السجل موجود من قبل'" :showModal="showModalFailed" :isUsed="true"
           @cancelWithConfirm="showModalFailed=false"/>
    <AddEditPath
      :loading="loading"
      @handleEditPath="handleEditPath($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditPath from "@/components/Modules/Users/AddEditPath/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import {putLearningPathRequest} from "@/api/learningPath";



export default{
  name: "index",
  components: {Modal, AddEditPath},
  data() {
    return {
      loading: false,
      showModal: false,
      showModalFailed: false,
    };
  },
  mounted() {
  },
  methods: {
    handleEditPath($event) {
      this.loading = true;
      if (!$event.audioChangedRequest){
        delete $event.audio
      }
      this.ApiService(putLearningPathRequest(this.$route.params.id,$event)).then((response) => {
        this.loading = false
        this.showModal = true;
        setTimeout(() => {
          this.showModal = false
          this.$router.push("/dashboard/path");
        }, 1500)
      }).catch((error)=>{
        this.showModalFailed = !!error.response.data.errors.includes('قيمة الحقل الإسم مُستخدمة من قبل');
        this.loading = false;
        setTimeout(() => {
          this.showModal = false
        }, 1500)
      })
    },
    handleCancel() {
      this.$router.push("/dashboard/path");
    },
  },
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
