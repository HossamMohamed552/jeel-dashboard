<template>
  <div class="add-role">
    <Modal
      :content-message="$t('CONTROLS.add_successfully')"
      :showModal="showModal"
      :is-success="true"
    />
    <AddEditJeelLibrary
      :loading="loading"
      @handleAddJeelLibrary="handleAddJeelLibrary($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import { postAddJeelLibraryRequest } from "@/api/jeel-library";
import Modal from "@/components/Shared/Modal/index.vue";
import AddEditJeelLibrary from "@/components/Modules/JeelLibrary/AddEditJeelLibrary/index.vue";

export default {
  components: {
    Modal,
    AddEditJeelLibrary,
  },
  data() {
    return {
      loading: false,
      showModal: false,
    };
  },
  mounted() {},
  methods: {
    handleAddJeelLibrary($event) {
      console.log('$event',$event)
      this.loading = true;
      this.ApiService(postAddJeelLibraryRequest($event))
        .then((response) => {
          this.loading = false;
          this.showModal = true;
          setTimeout(() => {
            this.showModal = false;
            this.$router.push("/dashboard/jeel-library");
          }, 1500);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleCancel() {
      this.$router.push("/dashboard/jeel-library");
    },
  },
};
</script>
<style scoped lang="scss"></style>
