<template>
  <div class="seasonal-mission">
    <Modal :content-message="'تمت الإضافة بنجاح'" :showModal="showModal" :is-success="true" />
    <AddEditSeasonalMission
      :loading="loading"
      @handleAddSeasonalMissionGroup="handleAddSeasonalMissionGroup($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditSeasonalMission from "@/components/Modules/Users/AddEditSeasonalMission/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";

export default {
  name: "index",
  components: { Modal, AddEditSeasonalMission },
  data() {
    return {
      loading: false,
      showModal: false,
    };
  },
  methods: {
    handleCancel() {
      this.$router.push("/dashboard/seasonal-mission");
    },
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
