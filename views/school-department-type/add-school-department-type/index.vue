<template>
  <div class="add-edit-learning-skill">
    <Modal :content-message="'تمت الإضافة بنجاح'" :showModal="showModal" :is-success="true" />
    <Modal :content-message="'هذا السجل موجود من قبل'" :showModal="showModalFailed" :isUsed="true"
           @cancelWithConfirm="showModalFailed=false"/>
    <AddEditSchoolDepartmentType
      :loading="loading"
      @handleAddSchoolDepartmentType="handleAddSchoolDepartmentType($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditSchoolDepartmentType from "@/components/Modules/Users/AddEditSchoolDepartmentType/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import { postCreateSchoolDepartmentTypeRequest } from "@/api/school-department-type";

export default {
  name: "index",
  components: { Modal, AddEditSchoolDepartmentType },
  data() {
    return {
      loading: false,
      showModal: false,
      showModalFailed: false,
    };
  },
  methods: {
    handleAddSchoolDepartmentType($event) {
      this.loading = true;

      this.ApiService(postCreateSchoolDepartmentTypeRequest({ name: $event }))
        .then((response) => {
          this.showModal = true;
          setTimeout(() => {
            this.$router.push("/dashboard/school-department-types");
          }, 1500);
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
<style scoped lang="scss">
@import "./index";
</style>
