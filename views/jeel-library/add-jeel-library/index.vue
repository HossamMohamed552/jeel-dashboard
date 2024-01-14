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
          }, 3000);
        })
        .then(() => {
          this.$router.push("/dashboard/jeel-library");
        })
        .catch((error)=>{
        this.loading = false
        this.showModal = false
          store.dispatch("showToast", {
            type: "danger",
            message: "server error",
            time:5000
          });
      })
    },
    handleCancel() {
      this.$router.push("/dashboard/jeel-library");
    },
  },
};
</script>
<style scoped lang="scss"></style>
