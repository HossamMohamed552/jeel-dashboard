<template>
  <div class="add-country">
    <Modal :content-message="'تمت الإضافة بنجاح'" :showModal="showModal" :is-success="true" />
    <AddEditSchoolYear
      :loading="loading"
      @handleAddSchoolYear="handleAddSchoolYear($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditSchoolYear from "@/components/Modules/Users/AddEditSchoolYear/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import { postCreateSchoolYearsRequest } from "@/api/school-year";
import axios from "axios";
import VueCookies from "vue-cookies";

export default {
  name: "index",
  components: { Modal, AddEditSchoolYear },
  data() {
    return {
      loading: false,
      showModal: false,
    };
  },
  methods: {
    handleAddSchoolYear($event) {
      this.loading = true;
      const formData = new FormData();
      formData.append("name", $event);
      axios
        .post("/study_years", formData, {
          headers: {
            Authorization: `Bearer ${VueCookies.get("token")}`,
            locale: "ar",
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.showModal = true;
          setTimeout(() => {
            this.$router.push("/dashboard/school-year");
          }, 3000);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleCancel() {
      this.$router.push("/dashboard/school-year");
    },
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
