<template>
  <div class="add-country">
    <Modal :content-message="'تمت الإضافة بنجاح'"
           :showModal="showModal"
           :is-success="true"/>
    <AddEditStudentEnroll
      :loading="loading"
      @handleAddStudentEnroll="handleAddStudentEnroll($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>

import AddEditStudentEnroll from "@/components/Modules/StudentEnroll/AddEditStudentEnroll/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import {postStudentEnrollRequest} from "@/api/studentEnroll.js";
export default {
  name: "index",
  components:{Modal, AddEditStudentEnroll},
  data(){
    return{
      loading: false,
      showModal: false,
      schoolId: this.$route.params.schoolId
    }
  },
  methods:{
    handleAddStudentEnroll($event) {
      this.loading = true
      this.showModal = true
      this.ApiService(postStudentEnrollRequest($event)).then((response) => {
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
