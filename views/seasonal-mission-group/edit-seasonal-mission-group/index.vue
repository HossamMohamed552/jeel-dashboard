<template>
  <div class="edit-term">
    <AddEditSeasonalMissionGroup
      :loading="loading"
      @handleEditSeasonalMissionGroup="handleEditSeasonalMissionGroup($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditSeasonalMissionGroup from "@/components/Modules/Users/AddEditSeasonalMissionGroup/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import { putUpdateSeasonalMissionGroupRequest } from "@/api/seasonal-mission-group";

export default {
  name: "index",
  components: { Modal, AddEditSeasonalMissionGroup },
  data() {
    return {
      loading: false,
      showModal: false,
    };
  },
  methods: {
    handleEditSeasonalMissionGroup($event) {
      this.loading = true;
      const id = this.$route.params.id;
      this.ApiService(putUpdateSeasonalMissionGroupRequest($event, id))
        .then(() => {
          this.$router.push("/dashboard/seasonal-mission-group");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleCancel() {
      this.$router.push("/dashboard/seasonal-mission-group");
    },
  },
};
</script>
<style scoped lang="scss"></style>
