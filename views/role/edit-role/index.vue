<template>
  <section class="edit-role">
    <AddEditRole
      :loading="loading"
      :permission="permission"
      @handleEditRole="handleEditRole($event)"
      @handleCancel="handleCancel"
    />
  </section>
</template>
<script>
import AddEditRole from "@/components/Modules/Users/AddEditRole/index.vue";
import { putRoleRequest } from "@/api/role";

export default {
  name: "index",
  components: { AddEditRole },
  data() {
    return {
      permission: [],
      loading: false,
    };
  },
  mounted() {
    this.getAllPermissions();
  },
  methods: {
    handleEditRole($event) {
      this.ApiService(putRoleRequest(this.$route.params.id, $event)).then((response) => {
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
