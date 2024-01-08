<template>
  <div class="add-country">
    <Modal :content-message="'تمت الإضافة بنجاح'" :showModal="showModal" :is-success="true" />
    <AddEditTerms
      :loading="loading"
      @handleAddTerm="handleAddTerm($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditTerms from "@/components/Modules/Users/AddEditTerms/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import { postTermsRequest } from "@/api/term";
export default {
  name: "index",
  components: { Modal, AddEditTerms },
  data() {
    return {
      loading: false,
      showModal: false,
    };
  },
  methods: {
    handleAddTerm($event) {
      this.loading = true;
      // $event.levels = $event.levels.map((item) => item.id)
      this.ApiService(postTermsRequest($event))
        .then((response) => {
          this.showModal = true;
          setTimeout(() => {
            this.$router.push("/dashboard/terms");
          }, 3000);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleCancel() {
      this.$router.push("/dashboard/terms");
    },
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
