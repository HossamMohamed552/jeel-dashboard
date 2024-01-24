<template>
  <div class="add-group">
    <Modal :content-message="'تمت الإضافة بنجاح'"
           :showModal="showModal"
           :is-success="true"/>
    <Modal :content-message="'هذا السجل موجود من قبل'" :showModal="showModalFailed" :isUsed="true"
           @cancelWithConfirm="showModalFailed=false"/>
    <AddEditPath
      :loading="loading"
      @handleAddPath="handleAddPath($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditPath from "@/components/Modules/Users/AddEditPath/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import {postLearningPathRequest} from "@/api/learningPath";



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
    handleAddPath($event) {
      this.loading = true;
      delete $event.audioChanged
      delete $event.audioChangedRequest
      this.ApiService(postLearningPathRequest($event)).then((response) => {
        this.loading = false
        this.showModal = true;
        setTimeout(() => {
          this.showModal = false
        }, 3000)
      }).then(() => {
        this.$router.push("/dashboard/path");
      }).catch((error)=>{
        this.showModal = false
        this.showModalFailed = !!error.response.data.errors.includes('قيمة الحقل الإسم مُستخدمة من قبل');
        this.loading = false;
        // setTimeout(() => {
        //   this.showModal = false
        // }, 3000)
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
