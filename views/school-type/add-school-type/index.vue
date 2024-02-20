<template>
  <div class="add-country">
    <Modal :content-message="'تمت الإضافة بنجاح'"
           :showModal="showModal"
           :is-success="true"/>
    <AddEditSchoolType
      :loading="loading"
      @handleAddSchoolType="handleAddSchoolType($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>

import AddEditSchoolType from "@/components/Modules/SchoolTypes/AddEditSchoolType/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import {postSchoolTypesRequest} from "@/api/schoolType";
export default {
  name: "index",
  components:{Modal, AddEditSchoolType},
  data(){
    return{
      loading: false,
      showModal: false,
    }
  },
  methods:{
    handleAddSchoolType($event) {
      this.loading = true
      this.showModal = true
      this.ApiService(postSchoolTypesRequest($event)).then((response) => {
        this.loading = false
        setTimeout(() => {
          this.showModal = false
        }, 1500)
      }).then(() => {
        this.$router.push("/dashboard/school-type");
      })
    },
    handleCancel() {
      this.$router.push("/dashboard/school-type");
    },
  }
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
