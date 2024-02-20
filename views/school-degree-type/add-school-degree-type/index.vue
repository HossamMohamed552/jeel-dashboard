<template>
  <div class="add-edit-learning-skill">
    <Modal :content-message="'تمت الإضافة بنجاح'" :showModal="showModal" :is-success="true" />
    <Modal :content-message="'هذا السجل موجود من قبل'" :showModal="showModalFailed" :isUsed="true"
           @cancelWithConfirm="showModalFailed=false"/>
    <AddEditSchoolDegreeType
      :loading="loading"
      @handleAddSchoolDegreeType="handleAddSchoolDegreeType($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditSchoolDegreeType from "@/components/Modules/Users/AddEditSchoolDegreeType/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import { postCreateSchoolDegreeTypeRequest } from "@/api/school-degree-type";

export default {
  name: "index",
  components: { Modal, AddEditSchoolDegreeType },
  data() {
    return {
      loading: false,
      showModal: false,
      showModalFailed: false,
    };
  },
  methods: {
    handleAddSchoolDegreeType($event) {
      this.loading = true;
      this.ApiService(postCreateSchoolDegreeTypeRequest({ name: $event }))
        .then((response) => {
          this.showModal = true;
          setTimeout(() => {
            this.$router.push("/dashboard/school-degree-types");
          }, 1500);
        }).catch((error) => {
          this.showModalFailed = !!error.response.data.errors.includes('قيمة الحقل الإسم مُستخدمة من قبل');
        }).finally(() => {
          this.loading = false;
        });
    },
    handleCancel() {
      this.$router.push("/dashboard/school-degree-types");
    },
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
