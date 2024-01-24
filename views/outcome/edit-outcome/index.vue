<template>
  <div class="add-country">
    <Modal
      :content-message="'تمت التعديل بنجاح'"
      :showModal="showModal"
      :is-success="true"
    />
    <Modal :content-message="'هذا السجل موجود من قبل'" :showModal="showModalFailed" :isUsed="true"
           @cancelWithConfirm="showModalFailed=false"/>
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
      showModalFailed: false,
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
        .catch((error) => {
          this.showModalFailed = !!error.response.data.errors.includes('قيمة الحقل الإسم مُستخدمة من قبل');
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
