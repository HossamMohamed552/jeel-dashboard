<template>
  <div class="add-country">
    <Modal
      :content-message="'تمت الإضافة بنجاح'"
      :showModal="showModal"
      :is-success="true"
    />
    <AddEditPackage
      :loading="loading"
      @handleEditPackage="handleEditPackage($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditPackage from "@/components/Modules/Packages/AddEditPackage/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import { putPackagesRequest } from "@/api/packages.js";
export default {
  name: "index",
  components: { Modal, AddEditPackage },
  data() {
    return {
      loading: false,
      showModal: false,
      packageId: this.$route.params.id,
    };
  },
  methods: {
    handleEditPackage($event) {
      this.loading = true;
      this.ApiService(putPackagesRequest(this.packageId, $event))
        .then(() => {
          this.loading = false;
        })
        .then(() => {
          this.$router.push("/dashboard/package");
        });
    },
    handleCancel() {
      this.$router.push("/dashboard/package");
    },
  },
};
</script>
<style scoped lang="scss">
</style>
