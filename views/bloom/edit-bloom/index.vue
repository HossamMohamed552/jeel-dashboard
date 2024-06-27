<template>
  <div class="add-country">
    <Modal :content-message="$t('CONTROLS.edit_successfully')" :showModal="showModal"
           :is-success="true"/>
    <Modal :content-message="$t('CONTROLS.already_exists')" :showModal="showModalFailed"
           :isUsed="true"
           @cancelWithConfirm="showModalFailed=false"/>
    <AddEditBloomCategory
      :loading="loading"
      @editBloomCategory="handleEditBloomCategory($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditBloomCategory
  from "@/components/Modules/BloomCategory/AddEditBloomCategory/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import {putEditBloomCategoryRequest} from "@/api/bloom.js";

export default {
  name: "index",
  components: {Modal, AddEditBloomCategory},
  data() {
    return {
      loading: false,
      showModal: false,
      scholTypeId: this.$route.params.id,
      showModalFailed: false,
    };
  },
  methods: {
    handleEditBloomCategory($event) {
      this.loading = true;
      this.ApiService(putEditBloomCategoryRequest(this.scholTypeId, $event))
        .then(() => {
          this.showModal = true;
          this.loading = false;
        })
        .then(() => {
          setTimeout(() => {
            this.showModal = false;
            this.$router.push("/dashboard/bloom");
          }, 1500);
        }).catch((error) => {
        this.loading = false;
        this.showModalFailed = !!error.response.data.errors.includes('قيمة الحقل الاسم مُستخدمة من قبل');
      })
    },
    handleCancel() {
      this.$router.push("/dashboard/bloom");
    },
  },
};
</script>
<style scoped lang="scss"></style>
