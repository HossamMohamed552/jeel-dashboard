<template>
  <div class="add-schools">
    <Modal :content-message="'تمت الإضافة بنجاح'" :showModal="showModal" :is-success="true" />
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
import { postSchoolsRequest } from "@/api/school";
export default {
  name: "index",
  components: { Modal, AddEditSchool },
  data() {
    return {
      loading: false,
      showModal: false,
    };
  },
  methods: {
    handleAddSchool($event) {
      this.loading = true;
      this.showModal = true;
      this.ApiService(postSchoolsRequest($event))
        .then((response) => {
          this.loading = false;
          setTimeout(() => {
            this.showModal = false;
          }, 3000);
        })
        .then(() => {
          this.$router.push("/dashboard/schools");
        });
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
