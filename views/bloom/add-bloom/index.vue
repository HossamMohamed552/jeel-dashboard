<template>
  <div class="add-country">
    <Modal :content-message="'تمت الإضافة بنجاح'" :showModal="showModal" :is-success="true" />
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
          }, 3000);
        })
        .then(() => {
          this.$router.push("/dashboard/bloom");
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
