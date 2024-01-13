<template>
  <div class="add-role">
    <Modal
      :content-message="'تمت الإضافة بنجاح'"
      :showModal="showModal"
      :is-success="true"
    />
    <AddEditCharacter
      :loading="loading"
      @handleAddCharacter="handleAddCharacter($event)"
      @handleCancel="handleCancel"
    />
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
  mounted() {},
  methods: {
    handleAddCharacter($event) {
      this.loading = true;
      this.showModal = true;
      this.ApiService(postAddCharacterRequest($event))
        .then((response) => {
          this.loading = false;
          setTimeout(() => {
            this.showModal = false;
          }, 3000);
        })
        .then(() => {
          this.$router.push("/dashboard/characters");
        });
    },
    handleCancel() {
      this.$router.push("/dashboard/characters");
    },
  },
};
</script>
<style scoped lang="scss"></style>
