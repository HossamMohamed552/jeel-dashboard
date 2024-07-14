<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="$t('PARENT.seasons')"
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
import {mapGetters} from "vuex";
import {getSeasonalMissionsForParentRequest} from "@/api/parent-module";


export default {
  name: "index",
  components: {ListItems, Button},
  data() {
    return {
      seasonalMissions: [],
      seasonalMissionsSearchWord: "",
      loading: false,
      totalNumber: 0
    }
  },
  computed:{
    ...mapGetters(['currentChild']),
    fieldsList(){
      return [
        {
          key: "vid",
          label: this.$i18n.t("TABLE_FIELDS.id"),
        },
        {
          key: "name",
          label: this.$i18n.t("seasonalMissionsParent.name"),
        },
        {
          key: "start_date",
          label: this.$i18n.t("seasonalMissionsParent.start_date"),
        },
        {
          key: "end_date",
          label: this.$i18n.t("seasonalMissionsParent.end_date"),
        },
        {
          key: "seasonal_quiz_percentage",
          label: this.$i18n.t("seasonalMissionsParent.seasonal_quiz_percentage"),
        },
      ]
    },
  },
  methods: {
    getSeasonal(event) {
      this.loading = true;
      this.ApiService(getSeasonalMissionsForParentRequest(this.currentChild.id,event))
        .then((response) => {
          this.seasonalMissions = response.data.data;
          this.totalNumber = response.data.meta.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  mounted() {
    this.getSeasonal()
  }
}
</script>
<style scoped lang="scss">

</style>
