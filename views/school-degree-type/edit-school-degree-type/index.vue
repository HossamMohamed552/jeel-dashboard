<template>
  <div class="edit-term">
    <AddEditSchoolDegreeType
      :loading="loading"
      @handleEditSchoolDegreeType="handleEditSchoolDegreeType($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditSchoolDegreeType from "@/components/Modules/Users/AddEditSchoolDegreeType/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import { putUpdateSchoolDegreeTypeRequest } from "@/api/school-degree-type";

export default {
  name: "index",
  components: { Modal, AddEditSchoolDegreeType },
  data() {
    return {
      loading: false,
      showModal: false,
    };
  },
  methods: {
    handleEditSchoolDegreeType($event) {
      this.loading = true;
      const id = this.$route.params.id;
      this.ApiService(putUpdateSchoolDegreeTypeRequest({ name: $event }, id))

        .then(() => {
          this.$router.push("/dashboard/school-degree-types");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleCancel() {
      this.$router.push("/dashboard/school-degree-types");
    },
  },
};
</script>
<style scoped lang="scss"></style>
