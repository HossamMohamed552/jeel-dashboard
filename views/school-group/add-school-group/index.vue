<template>
  <div class="add-group">
    <Modal :content-message="'تمت الإضافة بنجاح'"
           :showModal="showModal"
           :is-success="true"/>
    <AddEditGroup
      :loading="loading"
      @handleAddGroup="handleAddGroup($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditGroup from "@/components/Modules/Users/AddEditGroup/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import {postSchoolGroupRequest} from "@/api/schoolGroup";

export default{
  name: "index",
  components: {Modal, AddEditGroup},
  data() {
    return {
      loading: false,
      showModal: false,
    };
  },
  mounted() {
  },
  methods: {
    handleAddGroup($event) {
      this.loading = true
      this.ApiService(postSchoolGroupRequest($event)).then((response) => {
        this.showModal = true
        this.loading = false
        setTimeout(() => {
          this.showModal = false
        }, 3000)
      }).then(() => {
        this.$router.push("/dashboard/school-group");
      })
    },
    handleCancel() {
      this.$router.push("/dashboard/school-group");
    },
  },
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
