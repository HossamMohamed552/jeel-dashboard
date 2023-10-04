<template>
  <div class="add-country">
    <Modal
      :content-message="'تمت التعديل بنجاح'"
      :showModal="showModal"
      :is-success="true"
    />
    <AddEditSchoolType
      :loading="loading"
      @handleEditSchoolType="handleEditSchoolType($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditSchoolType from "@/components/Modules/SchoolTypes/AddEditSchoolType/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import {putSchoolTypesRequest} from "@/api/schoolType.js";

export default {
  name: "index",
  components: {Modal, AddEditSchoolType},
  data() {
    return {
      loading: false,
      showModal: false,
      scholTypeId: this.$route.params.id,
    };
  },
  methods: {
    handleEditSchoolType($event) {
      this.loading = true;
      this.ApiService(putSchoolTypesRequest(this.scholTypeId, $event)).then(() => {
        this.loading = false;
        this.showModal = true
        setTimeout(() => {
          this.showModal = false
          this.$router.back()
        }, 3000)
      })
    },
    handleCancel() {
      this.$router.push("/dashboard/school-type");
    },
  },
};
</script>
<style scoped lang="scss">
</style>
