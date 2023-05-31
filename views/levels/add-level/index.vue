<template>
  <div class="add-role">
    <Modal :content-message="'تمت الإضافة بنجاح'"
           :showModal="showModal"
           :is-success="true"/>
    <AddEditLevel
      :loading="loading"
      @handleAddLevel="handleAddLevel($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditLevel from "@/components/Modules/Users/AddEditLevel/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import {postLevelRequest} from "@/api/level";

export default {
  components: {
    Modal,
    AddEditLevel,
  },
  data() {
    return {
      loading: false,
      showModal: false,
    };
  },
  mounted() {

  },
  methods: {
    handleAddLevel($event) {
      this.loading = true
      this.showModal = true
      this.ApiService(postLevelRequest($event)).then((response) => {
        this.loading = false
        setTimeout(() => {
          this.showModal = false
        }, 3000)
      }).then(() => {
        this.showModal = false
        this.$router.push("/dashboard/levels");
      })
    },
    handleCancel() {
      this.$router.push("/dashboard/levels");
    },
  },
};
</script>
<style scoped lang="scss">
</style>
