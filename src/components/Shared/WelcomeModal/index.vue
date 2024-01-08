<template>
  <div>
    <b-modal v-model="isModalVisible" hide-backdrop hide-footer hide-header hide-header-close>
      <div class="p-2 welcome-text text-center">
        <span>{{ $t("WELCOME") }}</span>
        <span class="px-1 font-weight-bold">
          {{ user.first_name }}
        </span>
        <span class="font-weight-bold">
          {{ user.last_name }}
        </span>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["isModalVisible", "user"]),
  },
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
