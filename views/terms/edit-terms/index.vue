<template>
  <div class="edit-term">
    <AddEditTerms
      :loading="loading"
      @handleEditTerm="handleEditTerm($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>

import AddEditTerms from "@/components/Modules/Users/AddEditTerms/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import {putTermsRequest} from "@/api/term";
export default {
  name: "index",
  components:{Modal, AddEditTerms},
  data(){
    return{
      loading: false,
      showModal: false,
    }
  },
  methods:{
    handleEditTerm($event) {
      this.loading = true
      this.ApiService(putTermsRequest(this.$route.params.id,$event)).then(() => {
        this.loading = false
      }).then(() => {
        this.$router.push("/dashboard/terms");
      })
    },
    handleCancel() {
      this.$router.push("/dashboard/terms");
    },
  }
}
</script>
<style scoped lang="scss">
</style>
