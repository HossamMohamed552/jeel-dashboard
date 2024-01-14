<template>
  <section class="edit-role">
    <AddEditJeelStoreGames
      :loading="loading"
      @handleEditJeelStoreGames="handleEditJeelStoreGames($event)"
      @handleCancel="handleCancel"
    />
  </section>
</template>
<script>

import AddEditJeelStoreGames from "@/components/Modules/JeelStoreGames/AddEditJeelStoreGames/index.vue";
import { putEditJeelStoreGamesRequest } from "@/api/jeel-store-games";


export default {
  name: "index",
  components: { AddEditJeelStoreGames },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    handleEditJeelStoreGames($event) {
      this.ApiService(putEditJeelStoreGamesRequest(this.$route.params.id, $event)).then(
        (response) => {
          this.$router.push("/dashboard/jeel-store-games");
        }
      );
    },
    handleCancel() {
      this.$router.push("/dashboard/jeel-store-games");
    },
  },
};
</script>
<style scoped lang="scss"></style>
