<template>
  <div class="add-role">
    <Modal
      :content-message="'تمت الإضافة بنجاح'"
      :showModal="showModal"
      :is-success="true"
    />
    <AddEditJeelStoreGames
      :loading="loading"
      @handleAddJeelStoreGames="handleAddJeelStoreGames($event)"
      @handleCancel="handleCancel"
    />
  </div>
</template>
<script>
import AddEditJeelStoreGames from "@/components/Modules/JeelStoreGames/AddEditJeelStoreGames/index.vue";
import { postAddJeelStoreGamesRequest } from "@/api/jeel-store-games";
import Modal from "@/components/Shared/Modal/index.vue";

export default {
  components: {
    Modal,
    AddEditJeelStoreGames,
  },
  data() {
    return {
      loading: false,
      showModal: false,
    };
  },
  mounted() {},
  methods: {
    handleAddJeelStoreGames($event) {
      this.loading = true;
      this.ApiService(postAddJeelStoreGamesRequest($event))
        .then((response) => {
          this.loading = false;
          this.showModal = true;
          setTimeout(() => {
            this.showModal = false;
            this.$router.push("/dashboard/jeel-store-games");
          }, 3000);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleCancel() {
      this.$router.push("/dashboard/jeel-store-games");
    },
  },
};
</script>
<style scoped lang="scss"></style>
