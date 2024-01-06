<template>
  <div class="edit-term">
    <AddEditSchoolLanguage
      :loading="loading"
      @handleEditSchoolLanguage="handleEditSchoolLanguage($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditSchoolLanguage from "@/components/Modules/Users/AddEditSchoolLanguage/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import { putUpdateSchoolLanguageRequest } from "@/api/school-languages";

export default {
  name: "index",
  components: { Modal, AddEditSchoolLanguage },
  data() {
    return {
      loading: false,
      showModal: false,
    };
  },
  methods: {
    handleEditSchoolLanguage($event) {
      this.loading = true;
      const id = this.$route.params.id;
      this.ApiService(putUpdateSchoolLanguageRequest({ name: $event }, id))

        .then(() => {
          this.$router.push("/dashboard/school-languages");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleCancel() {
      this.$router.push("/dashboard/school-languages");
    },
  },
};
</script>
<style scoped lang="scss"></style>
