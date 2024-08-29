<template>
  <section class="edit-role">
    <Modal
      :content-message="$t('CONTROLS.edit_successfully')"
      :showModal="showModal"
      :is-success="true"
    />
    <AddEditJeelStoreLibrary
      :loading="loading"
      @handleEditJeelStoreLibrary="handleEditJeelStoreLibrary($event)"
      @handleCancel="handleCancel"
    />
  </section>
</template>
<script>

import AddEditJeelStoreLibrary
  from "@/components/Modules/JeelStoreLibrary/AddEditJeelStoreLibrary/index.vue";
import {putEditJeelStoreLibraryRequest} from "@/api/jeel-store-library";
import Modal from "@/components/Shared/Modal/index.vue";


export default {
  name: "index",
  components: {Modal, AddEditJeelStoreLibrary},
  data() {
    return {
      loading: false,
      showModal: false,
    };
  },
  methods: {
    handleEditJeelStoreLibrary($event) {
      this.loading = true;
      this.ApiService(putEditJeelStoreLibraryRequest(this.$route.params.id, $event)).then(
        (response) => {
          this.loading = false;
          this.showModal = true;
          setTimeout(() => {
            this.showModal = false;
            this.$router.push("/dashboard/jeel-store-library");
          }, 1500);
        }
      ).finally(() => {
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
