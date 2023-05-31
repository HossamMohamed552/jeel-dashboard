<template>
  <div class="add-country">
    <Modal :content-message="'تمت الإضافة بنجاح'"
           :showModal="showModal"
           :is-success="true"/>
    <AddEditCountry
      :loading="loading"
      @handleEditCountry="handleEditCountry($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>

import AddEditCountry from "@/components/Modules/Users/AddEditCountry/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import {putCountryRequest} from "@/api/country";
export default {
  name: "index",
  components:{Modal, AddEditCountry},
  data(){
    return{
      loading: false,
      showModal: false,
    }
  },
  methods:{
    handleEditCountry($event) {
      this.loading = true
      this.ApiService(putCountryRequest(this.$route.params.id,$event)).then(() => {
        this.loading = false
      }).then(() => {
        this.$router.push("/dashboard/country");
      })
    },
    handleCancel() {
      this.$router.push("/dashboard/country");
    },
  }
}
</script>
<style scoped lang="scss">
</style>
