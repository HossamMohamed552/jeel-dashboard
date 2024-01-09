<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="'قائمة جوائز التفاعل'"
      :fieldsList="fieldsList"
      :table-items="actions"
      :v-search-model="roleSearchWord"
      :number-of-item="totalNumber"
      @detailItem="detailItem($event)"
      @editItem="editItem($event)"
      :loading="loading"
      @refetch="getRewardingActions"
      :showSortControls="false"
      :permission_edit="'edit-questionDifficulty'"
      :permission_view="'show-questionDifficulty'"
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
          label: 'إسم جائزة التفاعل',
        },
        {
          key: "jeel_xp",
          label: "عدد النقاط",
        },
        {
          key: "jeel_coins",
          label: "عدد العملات",
        },
        {
          key: "actions",
          label: this.$i18n.t("TABLE_FIELDS.actions"),
        },
      ],
    };
  },
  methods: {
    getRewardingActions(e) {
      this.loading = true;
      this.ApiService(getRewardingActionsRequest(e))
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
    detailItem($event) {
      this.$router.push(`/dashboard/rewarding-actions/show/${$event}`);
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
