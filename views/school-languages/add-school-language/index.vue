<template>
  <div class="add-edit-learning-skill">
    <Modal :content-message="'تمت الإضافة بنجاح'" :showModal="showModal" :is-success="true" />
    <AddEditSchoolLanguage
      :loading="loading"
      @handleAddSchoolLanguage="handleAddSchoolLanguage($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditSchoolLanguage from "@/components/Modules/Users/AddEditSchoolLanguage/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import { postCreateSchoolLanguageRequest } from "@/api/school-languages";

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
    handleAddSchoolLanguage($event) {
      this.loading = true;

      this.ApiService(postCreateSchoolLanguageRequest({ name: $event }))
        .then((response) => {
          this.showModal = true;
          setTimeout(() => {
            this.$router.push("/dashboard/school-languages");
          }, 3000);
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
<style scoped lang="scss">
@import "./index";
</style>
