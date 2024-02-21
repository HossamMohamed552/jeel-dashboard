<template>
  <div class="add-role">
    <Modal :content-message="'تمت الإضافة بنجاح'" :showModal="showModal" :is-success="true" />
    <AddEditRole
      :loading="loading"
      @handleAddRole="handleAddRole($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditRole from "@/components/Modules/Users/AddEditRole/index.vue";
import { postRolesRequest } from "@/api/role";
import Modal from "@/components/Shared/Modal/index.vue";
import th from "vue2-datepicker/locale/es/th";

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
    handleAddRole($event) {
      this.loading = true;
      this.showModal = true;
      this.ApiService(postRolesRequest($event))
        .then((response) => {
          this.loading = false;
          setTimeout(() => {
            this.showModal = false;
          }, 1500);
        })
        .then(() => {
          this.$router.push("/dashboard/role");
        });
    },
    handleCancel() {
      this.$router.push("/dashboard/role");
    },
  },
};
</script>
<style scoped lang="scss"></style>
