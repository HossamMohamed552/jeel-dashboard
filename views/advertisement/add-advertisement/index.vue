<template>
  <div class="add-ad">
    <Modal :content-message="'تمت الإضافة بنجاح'" :showModal="showModal" :is-success="true" />
    <AddEditAdvertisementCategory
      :loading="loading"
      @handleAddAdCategory="handleAddAdCategory($event)"
      @handleCancel="handleCancel"/>
  </div>
</template>
<script>
import AddEditAdvertisementCategory from "@/components/Modules/advertisementCategory/AddEditAdvertisementCategory/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import {postAddAnnouncementRequest} from "@/api/announcement";

export default {
  name: "index",
  components: { Modal, AddEditAdvertisementCategory },
  data() {
    return {
      loading: false,
      showModal: false,
    };
  },
  methods: {
    handleAddAdCategory($event) {
      this.loading = true;
      this.ApiService(postAddAnnouncementRequest($event))
        .then((response) => {
          this.loading = false;
          this.showModal = true;
          setTimeout(() => {
            this.showModal = false;
          }, 3000);
        })
        .then(() => {
          this.$router.push("/dashboard/advertisements");
        }).catch(()=>this.loading = false)
    },
    handleCancel() {
      this.$router.push("/dashboard/advertisements");
    },
  },
};
</script>
<style scoped lang="scss">
@import "./index";
.text-field {
  label {
    margin: 0 !important;
  }
}

</style>
