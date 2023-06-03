<template>
  <div class="add-country">
    <Modal
      :content-message="'تمت التعديل بنجاح'"
      :showModal="showModal"
      :is-success="true"
    />
    <AddEditStudentEnroll
      :schoolId="schoolId"
      :studentUsers="studentUsers"
      :studentClasses="studentClasses"
      :loading="loading"
      @handleEditStudentEnroll="handleEditStudentEnroll($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditStudentEnroll from "@/components/Modules/StudentEnroll/AddEditStudentEnroll/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import {
  putStudentEnrollRequest,
  getStudentEnrollUsersRequest,
  getStudentEnrollClassesRequest,
} from "@/api/studentEnroll.js";
export default {
  name: "index",
  components: { Modal, AddEditStudentEnroll },
  data() {
    return {
      loading: false,
      showModal: false,
      studentEnrollId: this.$route.params.id,
      schoolId: this.$route.params.schoolId,
      studentUsers: [],
      studentClasses: [],
    };
  },
  mounted() {
    this.getStudentEnrollUsers();
    this.getStudentEnrollClasses();
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
    getStudentEnrollUsers() {
      this.ApiService(getStudentEnrollUsersRequest(this.schoolId)).then(
        (response) => {
          this.studentUsers = response.data.data;
        }
      );
    },
    getStudentEnrollClasses() {
      this.ApiService(getStudentEnrollClassesRequest(this.schoolId)).then(
        (response) => {
          this.studentClasses = response.data.data;
        }
      );
    },
  },
};
</script>
<style scoped lang="scss">
</style>
