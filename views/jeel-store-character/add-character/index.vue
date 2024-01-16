<template>
  <div class="add-role">
    <Modal :content-message="'تمت الإضافة بنجاح'" :showModal="showModal" :is-success="true" />
    <AddEditStoreCharacter :loading="loading" @handleAddStoreCharacter="handleAddStoreCharacter($event)"
      @handleCancel="handleCancel" />
  </div>
</template>
<script>
import AddEditStoreCharacter from "@/components/Modules/JeelStoreCharacters/AddEditCharacter/index.vue";
import { postAddCharacterRequest } from "@/api/jeel-store-character";
import Modal from "@/components/Shared/Modal/index.vue";

export default {
  components: {
    Modal,
    AddEditStoreCharacter
  },
  data() {
    return {
      loading: false,
      showModal: false,
    };
  },
  mounted() { },
  methods: {
    handleAddStoreCharacter($event) {
      this.loading = true;
      this.ApiService(postAddCharacterRequest($event))
        .then((response) => {
          this.loading = false;
          this.showModal = true;
          setTimeout(() => {
            this.showModal = false;
            this.$router.push("/dashboard/jeel-store-character");
          }, 3000);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleCancel() {
      this.$router.push("/dashboard/jeel-store-character");
    },
  },
};
</script>
<style scoped lang="scss"></style>
