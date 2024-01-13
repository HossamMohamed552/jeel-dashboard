<template>
  <section class="edit-role">
    <AddEditPowerUpBox
      :loading="loading"
      @handleEditBadge="handleEditPowerUpBox($event)"
      @handleCancel="handleCancel"
    />
  </section>
</template>
<script>

import AddEditPowerUpBox from "@/components/Modules/PowerUpBox/AddEditPowerUpBox/index.vue";
import { putEditPowerUpBoxRequest } from "@/api/power-up-boxes";


export default {
  name: "index",
  components: { AddEditPowerUpBox },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    handleEditPowerUpBox($event) {
      this.ApiService(putEditPowerUpBoxRequest(this.$route.params.id, $event)).then(
        (response) => {
          this.$router.push("/dashboard/power-up-boxes");
        }
      );
    },
    handleCancel() {
      this.$router.push("/dashboard/power-up-boxes");
    },
  },
};
</script>
<style scoped lang="scss"></style>
