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
      this.showModal = true;
      this.ApiService(postAddBadgeRequest($event))
        .then((response) => {
          this.loading = false;
          setTimeout(() => {
            this.showModal = false;
          }, 3000);
        })
        .then(() => {
          this.$router.push("/dashboard/jeel-badge");
        });
    },
    handleCancel() {
      this.$router.push("/dashboard/jeel-badge");
    },
  },
};
</script>
<style scoped lang="scss"></style>
