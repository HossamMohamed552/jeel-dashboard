<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="$t('PARENT.leaderboard')"
      :fieldsList="fieldsList"
      :number-of-item="totalNumber"
      :table-items="leaderboard"
      :v-search-model="leaderboardSearchWord"
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
      leaderboard: [],
      leaderboardSearchWord: "",
      loading: false,
      totalNumber: 0
    }
  },
  computed:{
    fieldsList(){
      return [
        {
          key: "vid",
          label: this.$i18n.t("TABLE_FIELDS.id"),
        },
        {
          key: "leaderboard",
          label: this.$i18n.t("TABLE_FIELDS.leaderboard"),
        },
        {
          key: "leaderboard2",
          label: this.$i18n.t("leaderboard2"),
        },
        {
          key: "leaderboard3",
          label: this.$i18n.t("leaderboard3"),
        },
      ]
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
