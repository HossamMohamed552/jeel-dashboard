<template>
  <section class="edit-role">
    <Modal :content-message="'تم التعديل بنجاح'"
           :showModal="showModal"
           :is-success="true"/>
    <Modal :content-message="'هذا السجل موجود من قبل'" :showModal="showModalFailed" :isUsed="true"
           @cancelWithConfirm="showModalFailed=false"/>
    <AddEditBadge
      :loading="loading"
      @handleEditBadge="handleEditBadge($event)"
      @handleCancel="handleCancel"
    />
  </section>
</template>
<script>
import AddEditBadge from "@/components/Modules/Badges/AddEditBadge/index.vue";
import { putEditBadgeRequest } from "@/api/badge";
import Modal from "@/components/Shared/Modal/index.vue";

export default {
  name: "index",
  components: {Modal, AddEditBadge },
  data() {
    return {
      loading: false,
      showModal: false,
      showModalFailed: false,
    };
  },
  methods: {
    handleEditBadge($event) {
      this.ApiService(putEditBadgeRequest(this.$route.params.id, $event)).then((response) => {
        this.loading = true
        this.showModal = true
        }
      ).then(() => {
        this.$router.push("/dashboard/jeel-badge");
      }).catch((error) => {
        this.showModalFailed = !!error.response.data.errors.includes('قيمة الحقل الإسم مُستخدمة من قبل');
      }).finally(() => {
        this.loading = false;
      });
    },
    handleCancel() {
      this.$router.push("/dashboard/jeel-badge");
    },
  },
};
</script>
<style scoped lang="scss"></style>
