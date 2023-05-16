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
import {PutRoleRequest} from "@/api/role";
import {getPermissionRequest} from "@/api/permission";

export default {
  name: "index",
  components: {AddEditRole},
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
    handleEditRole($event) {
      this.ApiService(PutRoleRequest(this.$route.params.id, $event)).then((response) => {
        console.log('response', response)
        this.$router.push("/dashboard/role");
      })
    },
    handleCancel() {
      this.$router.push("/dashboard/role");
    },
  },
}
</script>
<style scoped lang="scss">

</style>
