<template>
  <section class="container-fluid custom-container">
    <div class="show-role">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h3 class="heading">{{ $t("OBJECTIVE.DETAILS") }}</h3>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="4" class="with-border-bottom">
            <ShowItem :title="$t('GLOBAL_NAME')" :subtitle="objectiveCategory.name" />
          </b-col>
          <b-col lg="4" class="with-border-bottom" v-if="objectiveCategory.level">
            <ShowItem :title="$t('MISSIONS.level')" :subtitle="objectiveCategory.level.name" />
          </b-col>
          <b-col lg="4" class="with-border-bottom" v-if="objectiveCategory.learning_path">
            <ShowItem
              :title="$t('MISSIONS.LEARNING_PATH')"
              :subtitle="objectiveCategory.learning_path.name"
            />
          </b-col>
        </b-row>
      </div>
    </div>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import { getObjectiveCategoryByIdRequest } from "@/api/objective";
export default {
  name: "index",
  components: {
    ShowItem,
  },
  data() {
    return {
      objectiveCategory: {},
    };
  },
  mounted() {
    this.ApiService(getObjectiveCategoryByIdRequest(this.$route.params.id)).then((response) => {
      this.objectiveCategory = response.data.data;
    });
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
