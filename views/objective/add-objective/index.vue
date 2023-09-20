<template>
  <div class="add-country">
    <Modal :content-message="'تمت الإضافة بنجاح'" :showModal="showModal" :is-success="true" />
    <AddEditObjectiveCategory
      :loading="loading"
      @addObjectiveCategory="handleAddObjectiveCategory($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditObjectiveCategory from "@/components/Modules/ObjectiveCategory/AddEditObjectiveCategory/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import {postAddObjectiveCategoriesRequest} from "@/api/objective";
export default {
  name: "index",
  components: { Modal, AddEditObjectiveCategory },
  data() {
    return {
      loading: false,
      showModal: false,
    };
  },
  methods: {
    handleAddObjectiveCategory($event) {
      this.loading = true;
      this.ApiService(postAddObjectiveCategoriesRequest($event))
        .then((response) => {
          this.loading = false;
          this.showModal = true;
          setTimeout(() => {
            this.showModal = false;
          }, 3000);
        })
        .then(() => {
          this.$router.push("/dashboard/objective");
        });
    },
    handleCancel() {
      this.$router.push("/dashboard/objective");
    },
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
