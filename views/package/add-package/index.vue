<template>
  <div class="add-country">
    <Modal :content-message="'تمت الإضافة بنجاح'"
           :showModal="showModal"
           :is-success="true"/>
    <AddEditPackage
      :loading="loading"
      @handleAddPackage="handleAddPackage($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>

import AddEditPackage from "@/components/Modules/Packages/AddEditPackage/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import {postPackagesRequest} from "@/api/packages.js";
export default {
  name: "index",
  components:{Modal, AddEditPackage},
  data(){
    return{
      loading: false,
      showModal: false,
    }
  },
  methods:{
    handleAddPackage($event) {
      this.loading = true
      this.showModal = true
      this.ApiService(postPackagesRequest($event)).then((response) => {
        this.loading = false
        setTimeout(() => {
          this.showModal = false
        }, 3000)
      }).then(() => {
        this.$router.push("/dashboard/package");
      })
    },
    handleCancel() {
      this.$router.push("/dashboard/package");
    },
  }
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
