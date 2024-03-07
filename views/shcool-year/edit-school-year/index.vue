<template>
  <div class="edit-term">
    <AddEditSchoolYear
      :loading="loading"
      @handleEditSchoolYear="handleEditSchoolYear($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditSchoolYear from "@/components/Modules/Users/AddEditSchoolYear/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import axios from "axios";
import VueCookies from "vue-cookies";

export default {
  name: "index",
  components: {Modal, AddEditSchoolYear},
  data() {
    return {
      loading: false,
      showModal: false,
    };
  },
  methods: {
    handleEditSchoolYear($event) {
      this.loading = true;
      // const formData = new FormData();
      // formData.append("name", );
      // formData.append("method", "_put");
      axios
        .put(`/study_years/${this.$route.params.id}`, {name: $event}, {
          headers: {
            Authorization: `Bearer ${VueCookies.get("token")}`,
            locale: "ar",
          },
        })

        .then(() => {
          this.$router.push("/dashboard/school-year");
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
<style scoped lang="scss"></style>
