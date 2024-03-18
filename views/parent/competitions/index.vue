<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="'سجل المنافسات'"
      :fieldsList="fieldsList"
      :number-of-item="totalNumber"
      :table-items="competitions"
      :v-search-model="competitionSearchWord"
      :loading="loading"
      @refetch="getCompetition"
    >
    </ListItems>
  </section>
</template>
<script>
import Button from "@/components/Shared/Button/index.vue";
import ListItems from "@/components/ListItems/index.vue";
import competitions from "../../competitions/index.vue";


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
          key: "achievement",
          label: this.$i18n.t("TABLE_FIELDS.achievement"),
        },
        {
          key: "achievement2",
          label: this.$i18n.t("achievement2"),
        },
        {
          key: "achievement3",
          label: this.$i18n.t("achievement3"),
        },
        {
          key: "achievement4",
          label: this.$i18n.t("achievement4"),
        },
        {
          key: "achievement5",
          label: this.$i18n.t("achievement5"),
        },
      ],
      competitions: [],
      competitionSearchWord: "",
      loading: false,
      totalNumber: 0
    }
  },
  methods: {
    getCompetition(event) {
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
