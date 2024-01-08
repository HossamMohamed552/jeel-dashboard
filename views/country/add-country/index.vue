<template>
  <div class="add-country">
    <Modal :content-message="'تمت الإضافة بنجاح'" :showModal="showModal" :is-success="true" />
    <AddEditCountry
      :loading="loading"
      @handleAddCountry="handleAddCountry($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditCountry from "@/components/Modules/Users/AddEditCountry/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import { postCountryRequest } from "@/api/country";
export default {
  name: "index",
  components: { Modal, AddEditCountry },
  data() {
    return {
      loading: false,
      showModal: false,
    };
  },
  methods: {
    handleAddCountry($event) {
      this.loading = true;
      this.ApiService(postCountryRequest($event))
        .then((response) => {
          this.showModal = true;
          this.loading = false;
          setTimeout(() => {
            this.showModal = false;
            this.$router.push("/dashboard/country");
          }, 3000);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleCancel() {
      this.$router.push("/dashboard/country");
    },
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
