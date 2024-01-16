<template>
  <div class="add-country">
    <Modal
      :content-message="'تم التعديل بنجاح'"
      :showModal="showModal"
      :is-success="true"
    />
    <AddEditSubscribtion
      :loading="loading"
      @handleEditSubscribtion="handleEditSubscribtion($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditSubscribtion from "@/components/Modules/Subscribtions/AddEditSubscribtion/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import { putSubscriptionsRequest } from "@/api/subscription.js";
export default {
  name: "index",
  components: { Modal, AddEditSubscribtion },
  data() {
    return {
      loading: false,
      showModal: false,
      subscribtionId: this.$route.params.id,
    };
  },
  methods: {
    handleEditSubscribtion($event) {
      this.loading = true;
      delete $event.clone
      this.ApiService(putSubscriptionsRequest(this.subscribtionId, $event))
        .then(() => {
          this.loading = false;
          this.showModal = true;
          setTimeout(() => {
            this.showModal = false;
            this.$router.push("/dashboard/subscription");
          }, 3000);
        })
        .catch(() => {
          this.loading = false;
          this.showModal = false;
        });
    },
    handleCancel() {
      this.$router.push("/dashboard/subscription");
    },
  },
};
</script>
<style scoped lang="scss">
</style>
