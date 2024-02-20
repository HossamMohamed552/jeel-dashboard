<template>
  <div class="add-country">
    <Modal
      :content-message="'تم التعديل بنجاح'"
      :showModal="showModal"
      :is-success="true"
    />
    <Modal :content-message="'هذا السجل موجود من قبل'" :showModal="showModalFailed" :isUsed="true"
           @cancelWithConfirm="showModalFailed=false"/>
    <AddEditObjectiveCategory
      :loading="loading"
      @editObjectiveCategory="handleEditObjectiveCategory($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditObjectiveCategory from "@/components/Modules/ObjectiveCategory/AddEditObjectiveCategory/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import { putEditObjectiveCategoryRequest } from "@/api/objective";
export default {
  name: "index",
  components: { Modal, AddEditObjectiveCategory },
  data() {
    return {
      loading: false,
      showModal: false,
      showModalFailed: false,
      objectiveId: this.$route.params.id,
    };
  },
  methods: {
    handleEditObjectiveCategory($event) {
      this.loading = true;
      this.ApiService(putEditObjectiveCategoryRequest(this.objectiveId, $event))
        .then(() => {
          this.loading = false;
          this.showModal = true;
          setTimeout(() => {
            this.showModal = false;
            this.$router.push("/dashboard/objective");
          }, 1500);
        })
        .catch((error) => {
          this.loading = false
          this.showModalFailed = !!error.response.data.errors.includes('قيمة الحقل الإسم مُستخدمة من قبل');
        });
    },
    handleCancel() {
      this.$router.push("/dashboard/objective");
    },
  },
};
</script>
<style scoped lang="scss"></style>
