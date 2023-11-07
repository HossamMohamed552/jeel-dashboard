<template>
  <div class="add-country">
    <Modal :content-message="'تمت التعديل بنجاح'" :showModal="showModal" :is-success="true" />
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
import {putEditObjectiveCategoryRequest} from "@/api/objective";
export default {
  name: "index",
  components: { Modal, AddEditObjectiveCategory },
  data() {
    return {
      loading: false,
      showModal: false,
      objectiveId: this.$route.params.id,
    };
  },
  methods: {
    handleEditObjectiveCategory($event) {
      this.loading = true;
      this.ApiService(putEditObjectiveCategoryRequest(this.objectiveId, $event))
        .then(() => {
          this.loading = false;
        })
        .then(() => {
          this.$router.push("/dashboard/objective");
        }).catch(()=> this.loading = false)
    },
    handleCancel() {
      this.$router.push("/dashboard/objective");
    },
  },
};
</script>
<style scoped lang="scss"></style>
