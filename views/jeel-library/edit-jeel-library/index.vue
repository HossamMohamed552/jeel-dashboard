<template>
  <section class="edit-role">
    <AddEditJeelLibrary
      :loading="loading"
      @handleEditItem="handleEditJeelLibrary($event)"
      @handleCancel="handleCancel"
    />
  </section>
</template>
<script>

import AddEditJeelLibrary from "@/components/Modules/JeelLibrary/AddEditJeelLibrary/index.vue";
import { putEditJeelLibraryRequest } from "@/api/jeel-library";


export default {
  name: "index",
  components: { AddEditJeelLibrary },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    handleEditJeelLibrary($event) {
      this.ApiService(putEditJeelLibraryRequest(this.$route.params.id, $event)).then(
        (response) => {
          this.$router.push("/dashboard/jeel-library");
        }
      );
    },
    handleCancel() {
      this.$router.push("/dashboard/jeel-library");
    },
  },
};
</script>
<style scoped lang="scss"></style>
