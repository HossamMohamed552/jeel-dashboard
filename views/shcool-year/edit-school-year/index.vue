<template>
  <div class="edit-term">
    <Modal :content-message="$t('CONTROLS.edit_successfully')" :showModal="showModal"
           :is-success="true"/>
    <Modal :content-message="$t('CONTROLS.already_exists')" :showModal="showModalFailed"
           :isUsed="true"
           @cancelWithConfirm="showModalFailed=false"/>
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
      showModalFailed: false,
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
          this.showModal = true;
        }).catch((error) => {
        this.loading = false;
        this.showModalFailed = !!error.response.data.errors.includes('قيمة الحقل الاسم مُستخدمة من قبل');
      })
        .finally(() => {
          setTimeout(() => {
            this.showModal = false;
            this.$router.push("/dashboard/school-year");
          }, 1500);
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
