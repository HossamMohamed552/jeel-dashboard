<template>
  <div className="add-group">
    <AddEditGroup
      :loading="loading"
      @handleEditGroup="handleEditGroup($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditGroup from "@/components/Modules/Users/AddEditGroup/index.vue";
import {putSchoolGroupRequest} from "@/api/schoolGroup";

export default {
  name: "index",
  components: {AddEditGroup},
  data() {
    return {
      loading: false,
      showModal: false,
    };
  },
  mounted() {
  },
  methods: {
    handleEditGroup($event) {
      this.loading = true
      this.ApiService(putSchoolGroupRequest(this.$route.params.id,$event)).then((response) => {
        this.$router.push("/dashboard/school-group");
      })
    },
    handleCancel() {
      this.$router.push("/dashboard/school-group");
    },
  },
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
