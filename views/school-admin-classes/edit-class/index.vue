<template>
  <div class="add-country">
    <Modal :content-message="'تم التعديل بنجاح'" :showModal="showModal" :is-success="true" />
    <Modal :content-message="'هذا السجل موجود من قبل'" :showModal="showModalFailed" :isUsed="true"
           @cancelWithConfirm="showModalFailed=false"/>
    <AddEditSchoolClass
      :loading="loading"
      @editSchoolClass="editSchoolClass($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import Modal from "@/components/Shared/Modal/index.vue";
import AddEditSchoolClass
  from "@/components/Modules/SchoolAdminClass/AddEditSchoolClass/index.vue";
import {postAddSchoolClassRequest, putSchoolClassRequest} from "@/api/school-info";


export default {
  name: "index",
  components: {AddEditSchoolClass, Modal},
  data(){
    return{
      loading: false,
      showModal: false,
      showModalFailed: false,
    }
  },
  methods:{
    editSchoolClass($event){
      this.loading = true;
      this.ApiService(putSchoolClassRequest(this.$route.params.id,$event))
        .then((response) => {
          this.loading = false;
          this.showModal = true;
          setTimeout(() => {
            this.showModal = false;
            this.$router.push("/dashboard/school-admin-classes");
          }, 3000);
        })
        .catch((error) => {
          this.showModalFailed = !!error.response.data.errors.includes('قيمة الحقل الإسم مُستخدمة من قبل');
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleCancel() {
      this.$router.push("/dashboard/school-admin-classes");
    },
  }
}
</script>
<style scoped lang="scss">

</style>
