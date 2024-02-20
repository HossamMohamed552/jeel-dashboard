<template>
  <div class="add-country">
    <Modal :content-message="'تمت الإضافة بنجاح'" :showModal="showModal" :is-success="true"/>
    <Modal :content-message="'هذا السجل موجود من قبل'" :showModal="showModalFailed" :isUsed="true"
           @cancelWithConfirm="showModalFailed=false"/>
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
import {postCountryRequest} from "@/api/country";

export default {
  name: "index",
  components: {Modal, AddEditCountry},
  data() {
    return {
      loading: false,
      showModal: false,
      showModalFailed: false,
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
          }, 1500);
        }).catch((error) => {
        this.showModalFailed = !!error.response.data.errors.includes('قيمة الحقل الإسم مُستخدمة من قبل');
      }).finally(() => {
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
