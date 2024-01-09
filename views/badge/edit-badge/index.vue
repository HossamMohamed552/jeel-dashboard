<template>
  <section class="edit-role">
    <AddEditBadge
      :loading="loading"
      @handleEditBadge="handleEditBadge($event)"
      @handleCancel="handleCancel"
    />
  </section>
</template>
<script>
import AddEditBadge from "@/components/Modules/Badges/AddEditBadge/index.vue";
import { putEditBadgeRequest } from "@/api/badge";

export default {
  name: "index",
  components: { AddEditBadge },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    handleEditBadge($event) {
      this.ApiService(putEditBadgeRequest(this.$route.params.id, $event)).then(
        (response) => {
          this.$router.push("/dashboard/jeel-badge");
        }
      );
    },
    handleCancel() {
      this.$router.push("/dashboard/jeel-badge");
    },
  },
};
</script>
<style scoped lang="scss"></style>
