<template>
  <div class="add-country">
    <Modal :content-message="'تمت التعديل بنجاح'" :showModal="showModal" :is-success="true"/>
    <Modal :content-message="'هذا السجل موجود من قبل'" :showModal="showModalFailed" :isUsed="true"
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
          this.loading = false;
        })
        .then(() => {
          this.$router.push("/dashboard/bloom");
        }).catch((error) => {
        this.loading = false;
        this.showModalFailed = !!error.response.data.errors.includes('قيمة الحقل الإسم مُستخدمة من قبل');
      })
    },
    handleCancel() {
      this.$router.push("/dashboard/bloom");
    },
  },
};
</script>
<style scoped lang="scss"></style>
