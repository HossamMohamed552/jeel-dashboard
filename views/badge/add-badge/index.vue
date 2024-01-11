<template>
  <div class="add-role">
    <Modal
      :content-message="'تمت الإضافة بنجاح'"
      :showModal="showModal"
      :is-success="true"
    />
    <AddEditBadge
      :loading="loading"
      @handleAddBadge="handleAddBadge($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditBadge from "@/components/Modules/Badges/AddEditBadge/index.vue";
import { postAddBadgeRequest } from "@/api/badge";
import Modal from "@/components/Shared/Modal/index.vue";

export default {
  components: {
    Modal,
    AddEditBadge,
  },
  data() {
    return {
      loading: false,
      showModal: false,
    };
  },
  mounted() {},
  methods: {
    handleAddBadge($event) {
      this.loading = true;
      this.ApiService(postAddBadgeRequest({ name: $event }))
        .then((response) => {
          this.showModal = true;
          setTimeout(() => {
            this.$router.push("/dashboard/jeel-badge");
          }, 3000);
        })
        .finally(() => {
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
