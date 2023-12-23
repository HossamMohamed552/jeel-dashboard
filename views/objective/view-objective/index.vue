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
          <b-col lg="4">
            <ShowItem
              class="with-border-bottom"
              :title="$t('OBJECTIVE.NAME')"
              :subtitle="objectiveCategory.name"
            />
          </b-col>
          <b-col lg="4" v-if="objectiveCategory.learningPath.name">
            <ShowItem
              class="with-border-bottom"
              :title="$t('PATH.Name')"
              :subtitle="objectiveCategory.learningPath.name"
            />
          </b-col>
          <b-col lg="4" v-if="objectiveCategory.lesson.name">
            <ShowItem
              class="with-border-bottom"
              :title="$t('LESSONS.NAME')"
              :subtitle="objectiveCategory.lesson.name"
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
    this.ApiService(
      getObjectiveCategoryByIdRequest(this.$route.params.id)
    ).then((response) => {
      this.objectiveCategory = response.data.data;
    });
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
