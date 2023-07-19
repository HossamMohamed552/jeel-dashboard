<template>
  <div class="add-user">
    <AddEditUser
      :loading="loading"
      :system-roles="systemRoles"
      @handleAddEditUser="handleAddEditUser"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditUser from "@/components/Modules/Users/AddEditUser/index.vue";
import {getAllRolesRequest, postAddUserRequest} from "@/api/user";
export default {
  components: {
    AddEditUser,
  },
  data() {
    return {
      systemRoles: [],
      loading: false,
    };
  },
  mounted() {
    this.getSystemRoles();
  },
  methods: {
    getSystemRoles() {
      this.ApiService(getAllRolesRequest()).then((response) => {
        this.systemRoles = response.data.data;
      });
    },
    handleAddEditUser(userFormData) {
      this.ApiService(postAddUserRequest(userFormData)).then((response) => {
        //***when success remove the comment below*****
        //this.$router.push("/dashboard/users")
      });
    },
    handleCancel() {
      this.$router.push("/dashboard/users");
    },
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
