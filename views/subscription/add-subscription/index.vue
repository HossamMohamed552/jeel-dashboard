<template>
  <div class="add-country">
    <Modal :content-message="$t('CONTROLS.add_successfully')"
           :showModal="showModal"
           :is-success="true"/>
    <Modal :content-message="$t('CONTROLS.already_exists_subscription')" :showModal="showModalFailed" :isUsed="true"
           @cancelWithConfirm="showModalFailed=false"/>
    <AddEditSubscribtion
      :loading="loading"
      @handleAddSubscribtion="handleAddSubscribtion($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>

import AddEditSubscribtion from "@/components/Modules/Subscribtions/AddEditSubscribtion/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import {postSubscribtionsRequest} from "@/api/subscription.js";
export default {
  name: "index",
  components:{Modal, AddEditSubscribtion},
  data(){
    return{
      loading: false,
      showModal: false,
      showModalFailed: false,
    }
  },
  methods:{
    handleAddSubscribtion($event) {
      this.loading = true
      $event.clone =  $event.clone ? 1 : 0
      this.ApiService(postSubscribtionsRequest($event)).then((response) => {
        this.loading = false
        this.showModal = true
        setTimeout(() => {
          this.showModal = false
          this.$router.push("/dashboard/subscription");
        }, 1500)
      }).catch((error)=>{
        this.loading = false
        this.showModal = false
        this.showModalFailed = error.response.data.code === 422;
      })
    },
    handleCancel() {
      this.$router.push("/dashboard/subscribtion");
    },
  }
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
