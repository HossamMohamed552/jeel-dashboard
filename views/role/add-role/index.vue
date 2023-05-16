<template>
  <div class="add-role">
    <AddEditRole
      :loading="loading"
      :permission="permission"
      @handleAddEditRole="handleAddEditRole($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditRole from "@/components/Modules/Users/AddEditRole/index.vue";
import {getPermissionRequest} from "@/api/permission";
import {postRolesRequest} from "@/api/role"

export default {
  components: {
    AddEditRole,
  },
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
    getAllPermissions() {
      this.ApiService(getPermissionRequest()).then((response) => {
        this.permission = response.data.data;
      });
    },

    handleAddEditRole($event) {
      this.ApiService(postRolesRequest($event)).then((response) => {
        console.log('response', response)
        this.$router.push("/dashboard/role");
      })
    },
    handleCancel() {
      this.$router.push("/dashboard/role");
    },
  },
};
</script>
<style scoped lang="scss">
@import "index";
</style>
