<template>
  <div class="add-role">
    <Modal :content-message="'تمت الإضافة بنجاح'" :showModal="showModal" :is-success="true" />
    <Modal :content-message="'هذا السجل موجود من قبل'" :showModal="showModalFailed" :isUsed="true"
           @cancelWithConfirm="showModalFailed=false"/>
    <AddEditLevel
      :loading="loading"
      @handleAddLevel="handleAddLevel($event)"
      @handleCancel="handleCancel"
      :schoolGroupOptions="schoolGroupOptions"
    />
  </div>
</template>
<script>
import AddEditLevel from "@/components/Modules/Users/AddEditLevel/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import {postLevelRequest} from "@/api/level";
import {getAllSchoolGroupRequest} from "@/api/schoolGroup";

export default {
  components: {
    Modal,
    AddEditLevel,
  },
  data() {
    return {
      loading: false,
      showModal: false,
      showModalFailed: false,
      schoolGroupOptions: [],
    };
  },
  mounted() {
    this.getSchoolGroups()
  },
  methods: {
    getSchoolGroups() {
      this.ApiService(getAllSchoolGroupRequest()).then((response) => {
        this.schoolGroupOptions = response.data.data;
      });
    },
    handleAddLevel($event) {
      this.loading = true;
      this.ApiService(postLevelRequest($event)).then((response) => {
        this.loading = false;
        this.showModal = true;
        setTimeout(() => {
          this.showModal = false;
        }, 3000);
      }).then(() => {
        this.$router.push("/dashboard/levels");
      }).catch((error) => {
        this.showModalFailed = !!error.response.data.errors.includes('قيمة الحقل الإسم مُستخدمة من قبل');})
        .finally(() => {
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
