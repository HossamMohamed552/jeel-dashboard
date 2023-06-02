<template>
  <div class="add-country">
    <Modal
      :content-message="'تمت التعديل بنجاح'"
      :showModal="showModal"
      :is-success="true"
    />
    <AddEditStudentEnroll
      :loading="loading"
      @handleEditStudentEnroll="handleEditStudentEnroll($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditStudentEnroll from "@/components/Modules/StudentEnroll/AddEditStudentEnroll/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import { putStudentEnrollRequest } from "@/api/studentEnroll.js";
export default {
  name: "index",
  components: { Modal, AddEditStudentEnroll },
  data() {
    return {
      loading: false,
      showModal: false,
      studentEnrollId: this.$route.params.id,
      schoolId: this.$route.params.schoolId

    };
  },
  methods: {
    handleEditStudentEnroll($event) {
      this.loading = true;
      this.ApiService(putStudentEnrollRequest(this.studentEnrollId, $event))
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
