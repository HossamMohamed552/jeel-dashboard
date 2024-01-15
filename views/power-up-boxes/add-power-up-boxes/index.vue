<template>
  <div class="add-role">
    <Modal
      :content-message="'تمت الإضافة بنجاح'"
      :showModal="showModal"
      :is-success="true"
    />
    <AddEditPowerUpBox
      :loading="loading"
      @handleAddBadge="handleAddBadge($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditPowerUpBox from "@/components/Modules/PowerUpBox/AddEditPowerUpBox/index.vue";
import { postAddPowerUpBoxRequest } from "@/api/power-up-boxes";
import Modal from "@/components/Shared/Modal/index.vue";

export default {
  components: {
    Modal,
    AddEditPowerUpBox,
  },
  data() {
    return {
      loading: false,
      showModal: false,
    };
  },
  mounted() {},
  methods: {
    handleAddBadge($event) {
      this.loading = true;
      this.ApiService(postAddPowerUpBoxRequest($event))
        .then((response) => {
          this.loading = false;
          this.showModal = true;
          setTimeout(() => {
            this.showModal = false;
          }, 3000);
        })
        .then(() => {
          this.$router.push("/dashboard/power-up-boxes");
        }).catch((error) => {
          this.loading = false;
        });
    },
    handleCancel() {
      this.$router.push("/dashboard/power-up-boxes");
    },
  },
};
</script>
<style scoped lang="scss"></style>
