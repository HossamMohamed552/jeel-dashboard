<template>
  <div class="add-edit-learning-skill">
    <Modal :content-message="'تمت الإضافة بنجاح'" :showModal="showModal" :is-success="true" />
    <AddEditSeasonalMissionGroup
      :loading="loading"
      @handleAddSeasonalMissionGroup="handleAddSeasonalMissionGroup($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditSeasonalMissionGroup from "@/components/Modules/Users/AddEditSeasonalMissionGroup/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import { postCreateSeasonalMissionGroupRequest } from "@/api/seasonal-mission-group";

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
    handleAddSeasonalMissionGroup($event) {
      this.loading = true;
      this.ApiService(postCreateSeasonalMissionGroupRequest($event))
        .then((response) => {
          this.showModal = true;
          setTimeout(() => {
            this.$router.push("/dashboard/seasonal-mission-group");
          }, 1500);
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
<style scoped lang="scss">
@import "./index";
</style>
