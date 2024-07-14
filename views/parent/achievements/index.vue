<template>
  <section class="container-fluid custom-container">
    <ListItems
      :header-name="$t('PARENT.achievements')"
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
import {getAchievementsForParentRequest} from "@/api/parent-module";
import {mapGetters} from "vuex";


export default {
  name: "index",
  components: {ListItems, Button},
  data() {
    return {
      achievements: [],
      achievementSearchWord: "",
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
          label: this.$i18n.t("achievements.name"),
        },
        {
          key: "jeel_gems",
          label: this.$i18n.t("achievements.jeel_gemsTable"),
        },
        {
          key: "claim_date",
          label: this.$i18n.t("achievements.claim_date"),
        },
        // {
        //   key: "user_achievements_count",
        //   label: this.$i18n.t("achievements.user_achievements_count"),
        // },
      ]
    },
  },
  methods: {
    getAchievements(event) {
      this.loading = true;
      this.ApiService(getAchievementsForParentRequest(this.currentChild.id,event))
        .then((response) => {
          this.achievements = response.data.data;
          this.totalNumber = response.data.meta.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  mounted() {
    this.getAchievements();
  }
}
</script>
<style scoped lang="scss">

</style>
