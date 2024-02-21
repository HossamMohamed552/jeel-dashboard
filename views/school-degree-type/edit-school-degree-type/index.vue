<template>
  <div class="edit-term">
    <Modal :content-message="'تم التعديل بنجاح'"
           :showModal="showModal"
           :is-success="true"/>
    <Modal :content-message="'هذا السجل موجود من قبل'" :showModal="showModalFailed" :isUsed="true"
           @cancelWithConfirm="showModalFailed=false"/>
    <AddEditSchoolDegreeType
      :loading="loading"
      @handleEditSchoolDegreeType="handleEditSchoolDegreeType($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditSchoolDegreeType from "@/components/Modules/Users/AddEditSchoolDegreeType/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import {putUpdateSchoolDegreeTypeRequest} from "@/api/school-degree-type";

export default {
  name: "index",
  components: {Modal, AddEditSchoolDegreeType},
  data() {
    return {
      loading: false,
      showModal: false,
      showModalFailed: false,
    };
  },
  methods: {
    handleEditSchoolDegreeType($event) {
      this.loading = true;
      const id = this.$route.params.id;
      this.ApiService(putUpdateSchoolDegreeTypeRequest({name: $event}, id))
        .then(() => {
          this.$router.push("/dashboard/school-degree-types");
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
<style scoped lang="scss"></style>
