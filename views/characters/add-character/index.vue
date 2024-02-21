<template>
  <div class="add-role">
    <Modal :content-message="'تمت الإضافة بنجاح'" :showModal="showModal" :is-success="true" />
    <AddEditCharacter :loading="loading" @handleAddCharacter="handleAddCharacter($event)" @handleCancel="handleCancel" />
  </div>
</template>
<script>
import AddEditCharacter from "@/components/Modules/Characters/AddEditCharacter/index.vue";
import { postAddCharacterRequest } from "@/api/character";
import Modal from "@/components/Shared/Modal/index.vue";

export default {
  components: {
    Modal,
    AddEditCharacter,
  },
  data() {
    return {
      loading: false,
      showModal: false,
    };
  },
  mounted() { },
  methods: {
    handleAddCharacter($event) {
      this.loading = true;
      this.ApiService(postAddCharacterRequest($event))
        .then((response) => {
          this.loading = false;
          this.showModal = true;
          setTimeout(() => {
            this.showModal = false;
            this.$router.push("/dashboard/characters");
          }, 1500);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleCancel() {
      this.$router.push("/dashboard/characters");
    },
  },
};
</script>
<style scoped lang="scss"></style>
