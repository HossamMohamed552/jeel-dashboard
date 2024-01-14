<template>
  <div class="add-role">
    <Modal
      :content-message="'تمت الإضافة بنجاح'"
      :showModal="showModal"
      :is-success="true"
    />
    <AddEditJeelLibrary
      :loading="loading"
      @handleAddItem="handleAddItem($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditJeelLibrary from "@/components/Modules/JeelLibrary/AddEditJeelLibrary/index.vue";
import { postAddJeelLibraryRequest } from "@/api/jeel-library";
import Modal from "@/components/Shared/Modal/index.vue";
import store from "@/store";

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
    handleAddItem($event) {
      this.loading = true;
      this.ApiService(postAddJeelLibraryRequest($event))
        .then((response) => {
          this.loading = false;
          this.showModal = true;
          setTimeout(() => {
            this.showModal = false;
            this.$router.push("/dashboard/jeel-library");
          }, 3000);
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
