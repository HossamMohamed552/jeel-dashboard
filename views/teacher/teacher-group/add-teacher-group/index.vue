<template>
  <div>
    <Modal :content-message="'تمت الإضافة بنجاح'" :showModal="showModal" :is-success="true" />
    <Modal :content-message="'هذا السجل موجود من قبل'" :showModal="showModalFailed" :isUsed="true"
           @cancelWithConfirm="showModalFailed=false"/>
    <AddEditClassGroup
      :loading="loading"
      @handleAddClassGroup="handleAddClassGroup($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditClassGroup from "@/components/Modules/ClassGroup/AddEditClassGroup/index.vue";
import {postClassGroupRequest} from "@/api/teacher-module";
import Modal from "@/components/Shared/Modal/index.vue";
export default {
  name: "index",
  components:{
    Modal,
    AddEditClassGroup
  },
  data(){
    return{
      loading: false,
      showModal: false,
      showModalFailed: false,
    }
  },
  methods: {
    handleAddClassGroup($event) {
      this.loading = true;
      this.ApiService(postClassGroupRequest($event))
        .then((response) => {
          this.showModal = true;
          setTimeout(() => {
            this.$router.push("/dashboard/teacher-class");
          }, 1500);
        }).catch((error) => {
        this.showModalFailed = !!error.response.data.errors.includes('قيمة الحقل الإسم مُستخدمة من قبل');})
        .finally(() => {
          this.loading = false;
        });
    },
    handleCancel() {
      this.$router.push("/dashboard/teacher-class");
    },
  },
}
</script>
<style scoped lang="scss">

</style>
