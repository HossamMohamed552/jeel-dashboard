<template>
  <div class="add-group">
    <Modal :content-message="'تمت الإضافة بنجاح'"
           :showModal="showModal"
           :is-success="true"/>
    <AddEditPath
      :loading="loading"
      @handleAddPath="handleAddPath($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditPath from "@/components/Modules/Users/AddEditPath/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import {postLearningPathRequest} from "@/api/learningPath";



export default{
  name: "index",
  components: {Modal, AddEditPath},
  data() {
    return {
      loading: false,
      showModal: false,
    };
  },
  mounted() {
  },
  methods: {
    handleAddPath($event) {
      this.loading = true;
      this.showModal = true;
      this.ApiService(postLearningPathRequest($event)).then((response) => {
        this.loading = false
        setTimeout(() => {
          this.showModal = false
        }, 3000)
      }).then(() => {
        this.$router.push("/dashboard/path");
      }).catch(err=>{
        setTimeout(() => {
          this.showModal = false
        }, 3000)
      })
    },
    handleCancel() {
      this.$router.push("/dashboard/path");
    },
  },
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
