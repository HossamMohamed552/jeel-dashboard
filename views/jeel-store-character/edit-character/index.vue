<template>
  <section class="edit-role">
    <AddEditStoreCharacter
      :loading="loading"
      @handleEditStoreCharacter="handleEditCharacter($event)"
      @handleCancel="handleCancel"
    />
  </section>
</template>
<script>
import AddEditStoreCharacter from "@/components/Modules/JeelStoreCharacters/AddEditCharacter/index.vue";
import { putEditCharacterRequest } from "@/api/jeel-store-character";

export default {
  name: "index",
  components: { AddEditStoreCharacter },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    handleEditCharacter($event) {
      this.ApiService(putEditCharacterRequest(this.$route.params.id, $event)).then(
        (response) => {
          this.$router.push("/dashboard/jeel-store-character");
        }
      );
    },
    handleCancel() {
      this.$router.push("/dashboard/jeel-store-character");
    },
  },
};
</script>
<style scoped lang="scss"></style>
