<template>
  <div class="add-country">
    <Modal
      :content-message="'تمت الإضافة بنجاح'"
      :showModal="showModal"
      :is-success="true"
    />
    <Modal :content-message="'هذا السجل موجود من قبل'" :showModal="showModalFailed" :isUsed="true"
           @cancelWithConfirm="showModalFailed=false"/>
    <AddEditObjectiveCategory
      :loading="loading"
      @addObjectiveCategory="handleAddObjectiveCategory($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditObjectiveCategory
  from "@/components/Modules/ObjectiveCategory/AddEditObjectiveCategory/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import {postAddObjectiveCategoriesRequest} from "@/api/objective";

export default {
  name: "index",
  components: {Modal, AddEditObjectiveCategory},
  data() {
    return {
      loading: false,
      showModal: false,
      showModalFailed: false,
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
            this.$router.push("/dashboard/objective");
          }, 3000);
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
<style scoped lang="scss">
@import "./index";
</style>
