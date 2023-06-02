<template>
  <div class="add-country">
    <Modal :content-message="'تمت الإضافة بنجاح'"
           :showModal="showModal"
           :is-success="true"/>
    <AddEditClasses
      :loading="loading"
      :levelTerms="levelTerms"
      :schoolId="schoolId"
      @handleAddClass="handleAddClass($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>

import AddEditClasses from "@/components/Modules/Classes/AddEditClasses/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import {postClassRequest, getLevelTermRequest} from "@/api/class.js";
export default {
  name: "index",
  components:{Modal, AddEditClasses},
  data(){
    return{
      loading: false,
      showModal: false,
      schoolId: this.$route.params.schoolId,
      levelTerms: []
    }
  },
  mounted() {
    this.getLevelTerm();
  },
  methods:{
    handleAddClass($event) {
      this.loading = true
      this.showModal = true
      this.ApiService(postClassRequest($event)).then((response) => {
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
    getLevelTerm() {
      this.ApiService(getLevelTermRequest(this.schoolId)).then((response) => {
        this.levelTerms = response.data.data;
        this.totalNumber = response.data.meta.total;
      });
    },
  }
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
