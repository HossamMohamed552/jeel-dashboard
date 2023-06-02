<template>
  <div class="add-country">
    <Modal :content-message="'تمت الإضافة بنجاح'"
           :showModal="showModal"
           :is-success="true"/>
    <AddEditStaffEnroll
      :loading="loading"
      @handleAddStaffEnroll="handleAddStaffEnroll($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>

import AddEditStaffEnroll from "@/components/Modules/StaffEnroll/AddEditStaffEnroll/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import {postStaffEnrollRequest} from "@/api/staffEnroll.js";
export default {
  name: "index",
  components:{Modal, AddEditStaffEnroll},
  data(){
    return{
      loading: false,
      showModal: false,
      schoolId: this.$route.params.schoolId
    }
  },
  methods:{
    handleAddStaffEnroll($event) {
      this.loading = true
      this.showModal = true
      this.ApiService(postStaffEnrollRequest($event)).then((response) => {
        this.loading = false
        setTimeout(() => {
          this.showModal = false
        }, 3000)
      }).then(() => {
        this.$router.push(`/dashboard/schools/show/${this.schoolId}`);
      })
    },
    handleCancel() {
      this.$router.push(`/dashboard/schools/show/${this.schoolId}`);
    },
  }
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
