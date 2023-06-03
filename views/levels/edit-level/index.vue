<template>
  <section class="edit-role">
    <AddEditLevel
      :loading="loading"
      @handleEditLevel="handleEditLevel($event)"
      @handleCancel="handleCancel"
      :schoolGroupOptions="schoolGroupOptions"
    />
  </section>
</template>
<script>
import AddEditLevel from "@/components/Modules/Users/AddEditLevel/index.vue";
import { putLevelRequest } from "@/api/level";
import { getSchoolGroupRequest } from "@/api/schoolGroup";

export default {
  name: "index",
  components: { AddEditLevel },
  data() {
    return {
      permission: [],
      loading: false,
      schoolGroupOptions: []
    };
  },
  mounted() {
    this.getSchoolGroups();
  },
  methods: {
    getSchoolGroups() {
      this.ApiService(getSchoolGroupRequest()).then((response) => {
        this.schoolGroupOptions = response.data.data;
      });
    },
    handleEditLevel($event) {
      this.ApiService(putLevelRequest(this.$route.params.id, $event)).then((response) => {
        this.$router.push("/dashboard/levels");
      });
    },
    handleCancel() {
      this.$router.push("/dashboard/levels");
    },
  },
};
</script>
<style scoped lang="scss"></style>
