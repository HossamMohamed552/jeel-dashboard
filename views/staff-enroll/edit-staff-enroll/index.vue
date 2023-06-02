<template>
  <div class="add-country">
    <Modal
      :content-message="'تمت التعديل بنجاح'"
      :showModal="showModal"
      :is-success="true"
    />
    <AddEditStaffEnroll
      :loading="loading"
      @handleEditStaffEnroll="handleEditStaffEnroll($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditStaffEnroll from "@/components/Modules/StaffEnroll/AddEditStaffEnroll/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import { putStaffEnrollRequest } from "@/api/staffEnroll.js";
export default {
  name: "index",
  components: { Modal, AddEditStaffEnroll },
  data() {
    return {
      loading: false,
      showModal: false,
      staffEnrollId: this.$route.params.id,
      schoolId: this.$route.params.schoolId

    };
  },
  methods: {
    handleEditStaffEnroll($event) {
      this.loading = true;
      this.ApiService(putStaffEnrollRequest(this.staffEnrollId, $event))
        .then(() => {
          this.loading = false;
        })
        .then(() => {
          this.$router.push(`/dashboard/schools/show/${this.schoolId}`);
        });
    },
    handleCancel() {
      this.$router.push(`/dashboard/schools/show/${this.schoolId}`);
    },
  },
};
</script>
<style scoped lang="scss">
</style>
