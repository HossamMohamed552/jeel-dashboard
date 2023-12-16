<template>
  <div class="edit-term">
    <AddEditCurrency
      :loading="loading"
      @handleEditCurrency="handleEditCurrency($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditCurrency from "@/components/Modules/Users/AddEditCurrency/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import { putUpdateCurrencyRequest } from "@/api/currency";

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
    handleEditCurrency($event) {
      this.loading = true;
      const id = this.$route.params.id;
      this.ApiService(putUpdateCurrencyRequest({ name: $event }, id))
        .then(() => {
          this.$router.push("/dashboard/currency");
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
<style scoped lang="scss"></style>
