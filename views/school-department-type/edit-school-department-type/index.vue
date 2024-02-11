<template>
  <div class="edit-term">
    <Modal :content-message="'تمت التعديل بنجاح'"
           :showModal="showModal"
           :is-success="true"/>
    <Modal :content-message="'هذا السجل موجود من قبل'" :showModal="showModalFailed" :isUsed="true"
           @cancelWithConfirm="showModalFailed=false"/>
    <AddEditSchoolDepartmentType
      :loading="loading"
      @handleEditSchoolDepartmentType="handleEditSchoolDepartmentType($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditSchoolDepartmentType
  from "@/components/Modules/Users/AddEditSchoolDepartmentType/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import {putUpdateSchoolDepartmentTypeRequest} from "@/api/school-department-type";

export default {
  name: "index",
  components: {Modal, AddEditSchoolDepartmentType},
  data() {
    return {
      loading: false,
      showModal: false,
      showModalFailed:false
    };
  },
  methods: {
    handleEditSchoolDepartmentType($event) {
      this.loading = true;
      const id = this.$route.params.id;
      this.ApiService(putUpdateSchoolDepartmentTypeRequest({name: $event}, id))
        .then(() => {
          this.$router.push("/dashboard/school-department-types");
        }).catch((error) => {
        this.showModalFailed = !!error.response.data.errors.includes('قيمة الحقل الإسم مُستخدمة من قبل');
      }).finally(() => {
        this.loading = false;
      });
    },
    handleCancel() {
      this.$router.push("/dashboard/school-department-types");
    },
  },
};
</script>
<style scoped lang="scss"></style>
