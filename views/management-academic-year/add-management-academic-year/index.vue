<template>
  <div class="add-role">
    <Modal :content-message="$t('CONTROLS.add_successfully')" :showModal="showModal"
           :is-success="true"/>
    <AddEditAcademicYear
      :loading="loading"
      @handleAddAcademicYear="handleAddAcademicYear($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditAcademicYear from "@/components/Modules/Users/AddEditAcademicYear/index.vue";
import {postAcademicYearRequest} from "@/api/academicYear";
import Modal from "@/components/Shared/Modal/index.vue";

export default {
  components: {
    Modal,
    AddEditAcademicYear,
  },
  data() {
    return {
      loading: false,
      showModal: false,
    };
  },
  methods: {
    handleAddAcademicYear($event) {
      this.loading = true;
      this.ApiService(postAcademicYearRequest($event)).then((response) => {
        this.loading = false;
        this.showModal = true;
        console.log("response", response);
        setTimeout(() => {
          this.showModal = false
          this.loading = false;
          this.$router.push("/dashboard/management-academic-year");
        }, 1500)
      }).catch(()=>{
        this.loading = false;
      })
    },
    handleCancel() {
      this.$router.push("/dashboard/management-academic-year");
    },
  },
};
</script>
<style scoped lang="scss"></style>
