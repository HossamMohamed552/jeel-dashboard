<template>
  <section class="container-fluid custom-container">
    <div class="show-role">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h3 class="heading">{{ $t("OUTCOME.DETAILS") }}</h3>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="4" class="with-border-bottom">
            <ShowItem :title="$t('GLOBAL_NAME')" :subtitle="outcomeCategory.name" />
          </b-col>
          <b-col lg="4" class="with-border-bottom" v-if="outcomeCategory.level">
            <ShowItem :title="$t('MISSIONS.level')" :subtitle="outcomeCategory.level.name" />
          </b-col>
          <b-col lg="4" class="with-border-bottom" v-if="outcomeCategory.learning_path">
            <ShowItem
              :title="$t('MISSIONS.LEARNING_PATH')"
              :subtitle="outcomeCategory.learning_path.name"
            />
          </b-col>
        </b-row>
      </div>
    </div>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import { getOutcomeCategoryByIdRequest } from "@/api/outcome";
export default {
  name: "index",
  components: {
    ShowItem,
  },
  data() {
    return {
      outcomeCategory: {},
    };
  },
  mounted() {
    this.ApiService(getOutcomeCategoryByIdRequest(this.$route.params.id)).then((response) => {
      this.outcomeCategory = response.data.data;
    });
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
