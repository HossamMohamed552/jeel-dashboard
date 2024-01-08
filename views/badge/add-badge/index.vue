<template>
  <div class="add-role">
    <Modal :content-message="'تمت الإضافة بنجاح'"
           :showModal="showModal"
           :is-success="true"/>
    <AddEditRole
      :loading="loading"
      :permission="permission"
      @handleAddRole="handleAddBadge($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditRole from "@/components/Modules/Badges/AddEditBadge/index.vue";
import {getPermissionRequest} from "@/api/permission";
import {postAddBadgeRequest} from "@/api/badge"
import Modal from "@/components/Shared/Modal/index.vue";

export default {
  components: {
    Modal,
    AddEditRole,
  },
  data() {
    return {
      permission: [],
      loading: false,
      showModal: false,
    };
  },
  mounted() {
    this.getAllPermissions();
  },
  methods: {
    getAllPermissions() {
      this.ApiService(getPermissionRequest()).then((response) => {
        this.permission = response.data.data;
      });
    },
    handleAddBadge($event) {
      this.loading = true
      this.showModal = true
      this.ApiService(postAddBadgeRequest($event)).then((response) => {
        this.loading = false
        setTimeout(() => {
          this.showModal = false
        }, 3000)
      }).then(() => {
        this.$router.push("/dashboard/jeel-badge");
      })
    },
    handleCancel() {
      this.$router.push("/dashboard/jeel-badge");
    },
  },
};
</script>
<style scoped lang="scss">
</style>
