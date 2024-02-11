<template>
  <div class="add-country">
    <Modal :content-message="'تمت التعديل بنجاح'"
           :showModal="showModal"
           :is-success="true"/>
    <Modal :content-message="'هذا السجل موجود من قبل'" :showModal="showModalFailed" :isUsed="true"
           @cancelWithConfirm="showModalFailed=false"/>
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
      showModalFailed: false,
    }
  },
  methods:{
    handleEditCountry($event) {
      this.loading = true
      this.ApiService(putCountryRequest(this.$route.params.id,$event)).then(() => {
        this.loading = false
        this.showModal = true;
        setTimeout(() => {
          this.showModal = false;
          this.$router.push("/dashboard/country");
        }, 3000);
      }).catch((error) => {
          this.showModalFailed = !!error.response.data.errors.includes('قيمة الحقل الإسم مُستخدمة من قبل');
        }).finally(() => {
        this.loading = false;
      });
    },
    handleCancel() {
      this.$router.push("/dashboard/country");
    },
  }
}
</script>
<style scoped lang="scss">
</style>
