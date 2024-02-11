<template>
  <section class="edit-role">
    <Modal :content-message="'تمت التعديل بنجاح'"
           :showModal="showModal"
           :is-success="true"/>
    <Modal :content-message="'هذا السجل موجود من قبل'" :showModal="showModalFailed" :isUsed="true"
           @cancelWithConfirm="showModalFailed=false"/>
    <AddEditLevel
      :loading="loading"
      @handleEditLevel="handleEditLevel($event)"
      @handleCancel="handleCancel"
      :schoolGroupOptions="schoolGroupOptions"
    />
  </section>
</template>
<script>
import AddEditLevel from "@/components/Modules/Users/AddEditLevel/index.vue";
import {putLevelRequest} from "@/api/level";
import {getSchoolGroupRequest} from "@/api/schoolGroup";
import Modal from "@/components/Shared/Modal/index.vue";

export default {
  name: "index",
  components: {Modal, AddEditLevel},
  data() {
    return {
      permission: [],
      loading: false,
      showModal: false,
      showModalFailed: false,
      schoolGroupOptions: []
    };
  },
  // mounted() {
  //   this.getSchoolGroups();
  // },
  methods: {
    // getSchoolGroups() {
    //   this.ApiService(getSchoolGroupRequest()).then((response) => {
    //     this.schoolGroupOptions = response.data.data;
    //   });
    // },
    handleEditLevel($event) {
      this.loading = true
      this.ApiService(putLevelRequest(this.$route.params.id, $event)).then((response) => {
        this.loading = false
        this.showModal = true;
      }).then(() => {
        this.$router.push("/dashboard/levels");
      }).catch((error) => {
        this.showModalFailed = !!error.response.data.errors.includes('قيمة الحقل الإسم مُستخدمة من قبل');
      }).finally(() => {
        this.loading = false;
      });
    },
    handleCancel() {
      this.$router.push("/dashboard/levels");
    },
  },
};
</script>
<style scoped lang="scss"></style>
