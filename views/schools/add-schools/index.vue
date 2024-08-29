<template>
  <div class="add-schools">

    <AddEditSchool
      :loading="loading"
      @handleAddSchool="handleAddSchool($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditSchool from "@/components/Modules/Users/AddEditSchool/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import {postSchoolsRequest} from "@/api/school";

export default {
  name: "index",
  components: {Modal, AddEditSchool},
  data() {
    return {
      loading: false,
      showModal: false,
    };
  },
  methods: {
    handleAddSchool($event) {
      this.ApiService(postSchoolsRequest($event)).then((response) => {
          this.loading = false;
          this.showModal = true;
          setTimeout(() => {
            this.showModal = false;
            this.$router.push("/dashboard/schools");
          }, 1500);
        }).catch(() => this.loading = false)
    },
    handleCancel() {
      this.$router.push("/dashboard/schools");
    },
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
