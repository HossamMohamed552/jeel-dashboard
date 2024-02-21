<template>
  <div class="add-country">
    <Modal
      :content-message="'تم التعديل بنجاح'"
      :showModal="showModal"
      :is-success="true"
    />
    <AddEditStaffEnroll
      :schoolId="schoolId"
      :staffRoles="staffRoles"
      :staffUsers="staffUsers"
      :staffLevels="staffLevels"
      :staffClasses="staffClasses"
      :loading="loading"
      @handleEditStaffEnroll="handleEditStaffEnroll($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditStaffEnroll from "@/components/Modules/StaffEnroll/AddEditStaffEnroll/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import {
  putStaffEnrollRequest,
  getStaffEnrollUsersRequest,
  getStaffEnrollRolesRequest,
  getStaffEnrollClassesRequest,
  getStaffEnrollLevelsRequest,
} from "@/api/staffEnroll.js";
export default {
  name: "index",
  components: { Modal, AddEditStaffEnroll },
  data() {
    return {
      loading: false,
      showModal: false,
      staffEnrollId: this.$route.params.id,
      schoolId: this.$route.params.schoolId,
      staffUsers: [],
      staffRoles: [],
      staffLevels: [],
      staffClasses: [],
    };
  },
  mounted() {
    this.getStaffEnrollUsers();
    this.getStaffEnrollRoles();
    this.getStaffEnrollLevels();
    this.getStaffEnrollClasses();
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
    getStaffEnrollUsers() {
      this.ApiService(getStaffEnrollUsersRequest(this.schoolId)).then(
        (response) => {
          this.staffUsers = response.data.data;
        }
      );
    },
    getStaffEnrollRoles() {
      this.ApiService(getStaffEnrollRolesRequest(this.schoolId)).then(
        (response) => {
          this.staffRoles = response.data.data;
        }
      );
    },
    getStaffEnrollLevels() {
      this.ApiService(getStaffEnrollLevelsRequest(this.schoolId)).then(
        (response) => {
          this.staffLevels = response.data.data;
        }
      );
    },
    getStaffEnrollClasses() {
      this.ApiService(getStaffEnrollClassesRequest(this.schoolId)).then(
        (response) => {
          this.staffClasses = response.data.data;
        }
      );
    },
  },
};
</script>
<style scoped lang="scss">
</style>
