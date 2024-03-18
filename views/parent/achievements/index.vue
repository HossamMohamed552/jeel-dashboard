<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="'سجل الانجازات'"
      :fieldsList="fieldsList"
      :number-of-item="totalNumber"
      :table-items="achievements"
      :v-search-model="achievementSearchWord"
      :loading="loading"
      @refetch="getAchievements"
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
          key: "achievement",
          label: this.$i18n.t("TABLE_FIELDS.achievement"),
        },
        {
          key: "achievement2",
          label: this.$i18n.t("TABLE_FIELDS.achievement2"),
        },
        {
          key: "achievement3",
          label: this.$i18n.t("TABLE_FIELDS.achievement3"),
        },
      ],
      achievements: [],
      achievementSearchWord: "",
      loading: false,
      totalNumber: 0
    }
  },
  methods: {
    getAchievements(event) {
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
