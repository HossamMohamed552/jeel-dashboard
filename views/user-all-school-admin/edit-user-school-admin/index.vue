<template>
  <div class="add-user">
    <AddEditSchoolUser
      :loading="loading"
      :system-roles="systemRoles"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditSchoolUser from "@/components/Modules/Users/AddEditSchoolUser";

export default {
  components: {
    AddEditSchoolUser,
  },
  data() {
    return {
      systemRoles: [],
      loading: false,
    };
  },
  mounted() {},
  methods: {
    handleCancel() {
      this.$router.push("/dashboard/all-school-users");
    },
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
