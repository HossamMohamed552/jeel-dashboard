<template>
  <div class="add-schools">
    <Modal :content-message="'تمت الإضافة بنجاح'"
           :showModal="showModal"
           :is-success="true"/>
    <AddEditSchool
      :loading="loading"
      @handleEditSchool="handleEditSchool($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>

import AddEditSchool from "@/components/Modules/Users/AddEditSchool/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import {putSchoolsRequest} from "@/api/school";
export default {
  name: "index",
  components:{Modal, AddEditSchool},
  data(){
    return{
      loading: false,
      showModal: false,
    }
  },
  methods:{
    handleEditSchool($event) {
      this.loading = true
      this.showModal = true
      this.ApiService(putSchoolsRequest(this.$route.params.id,$event)).then((response) => {
        if (response.data.code === 200){
          this.loading = false
          setTimeout(() => {
            this.showModal = false
          }, 1500)
        }
      }).then(() => {
        this.$router.push("/dashboard/schools");
      })
    },
    handleCancel() {
      this.$router.push("/dashboard/schools");
    },
  }
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
