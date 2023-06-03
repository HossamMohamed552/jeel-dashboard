<template>
  <div class="add-role">
    <Modal :content-message="'تمت الإضافة بنجاح'" :showModal="showModal" :is-success="true" />
    <AddEditLevel
      :loading="loading"
      @handleAddLevel="handleAddLevel($event)"
      @handleCancel="handleCancel"
      :schoolGroupOptions="schoolGroupOptions"
    />
  </div>
</template>
<script>
import AddEditLevel from "@/components/Modules/Users/AddEditLevel/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import { postLevelRequest } from "@/api/level";
import { getSchoolGroupRequest } from "@/api/schoolGroup";

export default {
  components: {
    Modal,
    AddEditLevel,
  },
  data() {
    return {
      loading: false,
      showModal: false,
      schoolGroupOptions: [],
    };
  },
  mounted() {
    this.getSchoolGroups()
  },
  methods: {
    getSchoolGroups() {
      this.ApiService(getSchoolGroupRequest()).then((response) => {
        this.schoolGroupOptions = response.data.data;
      });
    },
    handleAddLevel($event) {
      this.loading = true;
      this.showModal = true;
      this.ApiService(postLevelRequest($event))
        .then((response) => {
          this.loading = false;
          setTimeout(() => {
            this.showModal = false;
          }, 3000);
        })
        .then(() => {
          this.showModal = false;
          this.$router.push("/dashboard/levels");
        });
    },
    handleCancel() {
      this.$router.push("/dashboard/levels");
    },
  },
};
</script>
<style scoped lang="scss"></style>
