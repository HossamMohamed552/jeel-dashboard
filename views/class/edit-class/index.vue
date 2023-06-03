<template>
  <div class="add-country">
    <Modal
      :content-message="'تمت التعديل بنجاح'"
      :showModal="showModal"
      :is-success="true"
    />
    <AddEditClasses
      :loading="loading"
      @handleEditClass="handleEditClass($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditClasses from "@/components/Modules/Classes/AddEditClasses/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import { putClassRequest } from "@/api/class.js";
export default {
  name: "index",
  components: { Modal, AddEditClasses },
  data() {
    return {
      loading: false,
      showModal: false,
      classId: this.$route.params.id,
      schoolId: this.$route.params.schoolId

    };
  },
  methods: {
    handleEditClass($event) {
      this.loading = true;
      this.ApiService(putClassRequest(this.classId, $event))
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
