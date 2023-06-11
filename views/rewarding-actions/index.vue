<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="''"
      :fieldsList="fieldsList"
      :table-items="actions"
      :v-search-model="roleSearchWord"
      :number-of-item="totalNumber"
      @editItem="editItem($event)"
      :loading="loading"
      @refetch="getRewardingActions"
    >
    </ListItems>
  </section>
</template>
<script>
import ListItems from "@/components/ListItems/index.vue";
import { getRewardingActionsRequest } from "@/api/system-settings.js";

export default {
  name: "index",
  components: { ListItems },
  data() {
    return {
      loading: false,
      roleSearchWord: "",
      totalNumber: 0,
      actions: [],
      fieldsList: [
        {
          key: "id",
          label: this.$i18n.t("TABLE_FIELDS.id"),
        },
        {
          key: "action_name",
          label: this.$i18n.t("TABLE_FIELDS.name"),
        },
        {
          key: "action_desc",
          label: this.$i18n.t("TABLE_FIELDS.description"),
        },
        {
          key: "edit_action",
          label: this.$i18n.t("TABLE_FIELDS.actions"),
        },
      ],
    };
  },
  methods: {
    getRewardingActions() {
      this.loading = true;
      this.ApiService(getRewardingActionsRequest())
        .then((response) => {
          if (response.data) this.actions = response.data.data;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    editItem($event) {
      this.$router.push(`/dashboard/rewarding-actions/${$event}`);
    },
  },
  mounted() {
    this.getRewardingActions();
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
