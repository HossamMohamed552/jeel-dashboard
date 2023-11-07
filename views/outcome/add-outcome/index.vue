<template>
  <div class="add-country">
    <Modal :content-message="'تمت الإضافة بنجاح'" :showModal="showModal" :is-success="true" />
    <AddEditOutcomeCategory
      :loading="loading"
      @addOutcomeCategory="handleAddOutcomeCategory($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditOutcomeCategory from "@/components/Modules/OutcomeCategory/AddEditOutcomeCategory/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import {postAddOutcomeCategoriesRequest} from "@/api/outcome";
export default {
  name: "index",
  components: { Modal, AddEditOutcomeCategory },
  data() {
    return {
      loading: false,
      showModal: false,
    };
  },
  methods: {
    handleAddOutcomeCategory($event) {
      this.loading = true;
      this.ApiService(postAddOutcomeCategoriesRequest($event))
        .then((response) => {
          this.loading = false;
          this.showModal = true;
          setTimeout(() => {
            this.showModal = false;
          }, 3000);
        })
        .then(() => {
          this.$router.push("/dashboard/outcome");
        }).catch(()=>{
        this.loading = false;
      })
    },
    handleCancel() {
      this.$router.push("/dashboard/outcome");
    },
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
