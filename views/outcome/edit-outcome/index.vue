<template>
  <div class="add-country">
    <Modal
      :content-message="'تمت التعديل بنجاح'"
      :showModal="showModal"
      :is-success="true"
    />
    <AddEditOutcomeCategory
      :loading="loading"
      @editOutcomeCategory="handleEditOutcomeCategory($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditOutcomeCategory from "@/components/Modules/OutcomeCategory/AddEditOutcomeCategory/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import { putEditOutcomeCategoryRequest } from "@/api/outcome";
export default {
  name: "index",
  components: { Modal, AddEditOutcomeCategory },
  data() {
    return {
      loading: false,
      showModal: false,
      outcomeId: this.$route.params.id,
    };
  },
  methods: {
    handleEditOutcomeCategory($event) {
      this.loading = true;
      this.ApiService(putEditOutcomeCategoryRequest(this.outcomeId, $event))
        .then(() => {
          this.loading = false;
          this.showModal = true;
          setTimeout(() => {
            this.showModal = false;
            this.$router.push("/dashboard/outcome");
          }, 3000);
        })
        .catch(() => {
          this.loading = false;
        });
    },
    handleCancel() {
      this.$router.push("/dashboard/outcome");
    },
  },
};
</script>
<style scoped lang="scss"></style>
