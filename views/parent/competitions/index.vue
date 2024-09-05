<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="$t('PARENT.competitions')"
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
import {getCompetitionsForParentRequest} from "@/api/parent-module";
import {mapGetters} from "vuex";


export default {
  name: "index",
  components: {ListItems, Button},
  data() {
    return {
      competitions: [],
      competitionSearchWord: "",
      loading: false,
      totalNumber: 0
    }
  },
  computed: {
    ...mapGetters(['currentChild']),
    fieldsList() {
      return [
        {
          key: "vid",
          label: this.$i18n.t("TABLE_FIELDS.id"),
        },
        {
          key: "name",
          label: this.$i18n.t("competitionsParent.name"),
        },
        {
          key: "finish_solving",
          label: this.$i18n.t("competitionsParent.finish_solving"),
        },
        {
          key: "competitionType.name",
          label: this.$i18n.t("competitionsParent.competition_type"),
        },
        {
          key: "competition_percentage",
          label: this.$i18n.t("competitionsParent.competition_percentage"),
        },
      ]
    }
  },
  methods: {
    getCompetition(event) {
      this.loading = true;
      this.ApiService(getCompetitionsForParentRequest(this.currentChild.id,event))
        .then((response) => {
          this.competitions = response.data.data;
          this.totalNumber = response.data.meta.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  mounted() {
    this.getCompetition()
  }
}
</script>
<style scoped lang="scss">

</style>
