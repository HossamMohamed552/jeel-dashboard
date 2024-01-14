<template>
  <section class="edit-role">
    <AddEditJeelStoreLibrary
      :loading="loading"
      @handleEditJeelStoreLibrary="handleEditJeelStoreLibrary($event)"
      @handleCancel="handleCancel"
    />
  </section>
</template>
<script>

import AddEditJeelStoreLibrary from "@/components/Modules/JeelStoreLibrary/AddEditJeelStoreLibrary/index.vue";
import { putEditJeelStoreLibraryRequest} from "@/api/jeel-store-library";


export default {
  name: "index",
  components: { AddEditJeelStoreLibrary },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    handleEditJeelStoreLibrary($event) {
      this.ApiService(putEditJeelStoreLibraryRequest(this.$route.params.id, $event)).then(
        (response) => {
          this.$router.push("/dashboard/jeel-store-library");
        }
      );
    },
    handleCancel() {
      this.$router.push("/dashboard/jeel-store-library");
    },
  },
};
</script>
<style scoped lang="scss"></style>
