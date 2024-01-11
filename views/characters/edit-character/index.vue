<template>
  <section class="edit-role">
    <AddEditCharacter
      :loading="loading"
      @handleEditCharacter="handleEditCharacter($event)"
      @handleCancel="handleCancel"
    />
  </section>
</template>
<script>
import AddEditCharacter from "@/components/Modules/Characters/AddEditCharacter/index.vue";
import { putEditCharacterRequest } from "@/api/character";

export default {
  name: "index",
  components: { AddEditCharacter },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    handleEditCharacter($event) {
      this.ApiService(putEditCharacterRequest(this.$route.params.id, $event)).then(
        (response) => {
          this.$router.push("/dashboard/characters");
        }
      );
    },
    handleCancel() {
      this.$router.push("/dashboard/characters");
    },
  },
};
</script>
<style scoped lang="scss"></style>
