<template>
  <div className="add-group">
    <Modal :content-message="'تمت التعديل بنجاح'"
           :showModal="showModal"
           :is-success="true"/>
    <Modal :content-message="'هذا السجل موجود من قبل'" :showModal="showModalFailed" :isUsed="true"
           @cancelWithConfirm="showModalFailed=false"/>
    <AddEditGroup
      :loading="loading"
      @handleEditGroup="handleEditGroup($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditGroup from "@/components/Modules/Users/AddEditGroup/index.vue";
import {putSchoolGroupRequest} from "@/api/schoolGroup";
import Modal from "@/components/Shared/Modal/index.vue";

export default {
  name: "index",
  components: {Modal, AddEditGroup},
  data() {
    return {
      loading: false,
      showModal: false,
      showModalFailed: false,
    };
  },
  mounted() {
  },
  methods: {
    handleEditGroup($event) {
      this.loading = true
      this.ApiService(putSchoolGroupRequest(this.$route.params.id,$event)).then((response) => {
        this.$router.push("/dashboard/school-group");
      }).catch((error) => {
        this.showModalFailed = !!error.response.data.errors.includes('قيمة الحقل الإسم مُستخدمة من قبل');
      }).finally(() => {
        this.loading = false;
      })
    },
    handleCancel() {
      this.$router.push("/dashboard/school-group");
    },
  },
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
