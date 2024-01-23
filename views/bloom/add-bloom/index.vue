<template>
  <div class="add-country">
    <Modal :content-message="'تمت الإضافة بنجاح'" :showModal="showModal" :is-success="true" />
    <Modal :content-message="'هذا السجل موجود من قبل'" :showModal="showModalFailed" :isUsed="true"
           @cancelWithConfirm="showModalFailed=false"/>
    <AddEditBloomCategory
      :loading="loading"
      @addBloomCategory="handleAddBloomCategory($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditBloomCategory from "@/components/Modules/BloomCategory/AddEditBloomCategory/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import { postAddBloomCategoriesRequest } from "@/api/bloom";
export default {
  name: "index",
  components: { Modal, AddEditBloomCategory },
  data() {
    return {
      loading: false,
      showModal: false,
      showModalFailed: false,
    };
  },
  methods: {
    handleAddBloomCategory($event) {
      this.loading = true;
      this.ApiService(postAddBloomCategoriesRequest($event))
        .then((response) => {
          this.loading = false;
          this.showModal = true;
          setTimeout(() => {
            this.showModal = false;
            this.$router.push("/dashboard/bloom");
          }, 3000);
        })
        .catch(() => {
          this.showModalFailed = true
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleCancel() {
      this.$router.push("/dashboard/bloom");
    },
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
