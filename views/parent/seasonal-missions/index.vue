<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="'سجل المواسم'"
      :fieldsList="fieldsList"
      :number-of-item="totalNumber"
      :table-items="seasonalMissions"
      :v-search-model="seasonalMissionsSearchWord"
      :loading="loading"
      @refetch="getSeasonal"
    >
    </ListItems>
  </section>
</template>
<script>
import Button from "@/components/Shared/Button/index.vue";
import ListItems from "@/components/ListItems/index.vue";


export default {
  name: "index",
  components: {ListItems, Button},
  data() {
    return {
      fieldsList: [
        {
          key: "id",
          label: this.$i18n.t("TABLE_FIELDS.id"),
        },
        {
          key: "seasonalMissions",
          label: this.$i18n.t("TABLE_FIELDS.seasonal"),
        },
        {
          key: "seasonalMissions2",
          label: this.$i18n.t("seasonal2"),
        },
        {
          key: "seasonalMissions3",
          label: this.$i18n.t("seasonal3"),
        },
        {
          key: "seasonalMissions4",
          label: this.$i18n.t("seasonal4"),
        },
        {
          key: "seasonalMissions5",
          label: this.$i18n.t("seasonal5"),
        },
      ],
      seasonalMissions: [],
      seasonalMissionsSearchWord: "",
      loading: false,
      totalNumber: 0
    }
  },
  methods: {
    getSeasonal(event) {
      this.loading = true;
      const params = event;
      // this.ApiService(getBloomCategoriesRequest(params))
      //   .then((response) => {
      //     this.bloomCategories = response.data.data;
      //     this.totalNumber = response.data.meta.total;
      //   })
      //   .finally(() => {
      //     this.loading = false;
      //   });
    },
  }
}
</script>
<style scoped lang="scss">

</style>
