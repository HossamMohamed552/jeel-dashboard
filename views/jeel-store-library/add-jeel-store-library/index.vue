<template>
  <div class="add-role">
    <Modal
      :content-message="'تمت الإضافة بنجاح'"
      :showModal="showModal"
      :is-success="true"
    />
    <AddEditJeelStoreLibrary
      :loading="loading"
      @handleAddJeelStoreLibrary="handleAddJeelStoreLibrary($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditJeelStoreLibrary from "@/components/Modules/JeelStoreLibrary/AddEditJeelStoreLibrary/index.vue";
import { postAddJeelStoreLibraryRequest } from "@/api/jeel-store-library";
import Modal from "@/components/Shared/Modal/index.vue";

export default {
  components: {
    Modal,
    AddEditJeelStoreLibrary,
  },
  data() {
    return {
      loading: false,
      showModal: false,
    };
  },
  mounted() {},
  methods: {
    handleAddJeelStoreLibrary($event) {
      this.loading = true;
      this.ApiService(postAddJeelStoreLibraryRequest($event))
        .then((response) => {
          this.loading = false;
          this.showModal = true;
          setTimeout(() => {
            this.showModal = false;
            this.$router.push("/dashboard/jeel-store-library");
          }, 3000);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleCancel() {
      this.$router.push("/dashboard/jeel-store-library");
    },
  },
};
</script>
<style scoped lang="scss"></style>
