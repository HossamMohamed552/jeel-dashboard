<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="'سجل المهام'"
      :fieldsList="fieldsList"
      :number-of-item="totalNumber"
      :table-items="missions"
      :v-search-model="missionSearchWord"
      :loading="loading"
      @refetch="getMissions"
    >
    </ListItems>
  </section>
</template>
<script>
import Button from "@/components/Shared/Button/index.vue";
import ListItems from "@/components/ListItems/index.vue";
import {getMissionsForParentRequest} from "@/api/parent-module";
import {mapGetters} from "vuex";


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
          key: "name",
          label: this.$i18n.t("TABLE_FIELDS.missionName"),
        },
        {
          key: "start_date",
          label: this.$i18n.t("TABLE_FIELDS.start_date"),
        },
        {
          key: "end_date",
          label: this.$i18n.t("TABLE_FIELDS.end_date"),
        },
        {
          key: "percentage_mission",
          label: this.$i18n.t("TABLE_FIELDS.percentage_mission"),
        },
      ],
      missions: [],
      missionSearchWord: "",
      loading: false,
      totalNumber: 0
    }
  },
  computed: {
    ...mapGetters(['currentChild'])
  },
  methods: {
    getMissions(event) {
      this.loading = true;
      const params = event;
      this.ApiService(getMissionsForParentRequest(this.currentChild.id,params))
        .then((response) => {
          this.missions = response.data.data;
          this.totalNumber = response.data.meta.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  mounted() {
    this.getMissions()
  }
}
</script>
<style scoped lang="scss">

</style>
