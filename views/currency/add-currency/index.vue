<template>
  <div class="add-country">
    <Modal :content-message="'تمت الإضافة بنجاح'" :showModal="showModal" :is-success="true" />
    <AddEditCurrency
      :loading="loading"
      @handleAddCurrency="handleAddCurrency($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditCurrency from "@/components/Modules/Users/AddEditCurrency/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import { postCreateCurrencyRequest } from "@/api/currency";
export default {
  name: "index",
  components: { Modal, AddEditCurrency },
  data() {
    return {
      loading: false,
      showModal: false,
    };
  },
  methods: {
    handleAddCurrency($event) {
      this.loading = true;
      this.ApiService(postCreateCurrencyRequest({ name: $event }))
        .then((response) => {
          this.showModal = true;
          setTimeout(() => {
            this.$router.push("/dashboard/currency");
          }, 1500);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleCancel() {
      this.$router.push("/dashboard/currency");
    },
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
