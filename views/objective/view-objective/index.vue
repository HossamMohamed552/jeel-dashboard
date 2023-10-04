<template>
  <section class="container-fluid custom-container">
    <div class="show-role">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">{{ $t("OBJECTIVE.DETAILS") }}</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="6" class="mb-3">
            <ShowItem :title="$t('GLOBAL_NAME')" :subtitle="objectiveCategory.name" />
          </b-col>
          <b-col lg="6">
            <ShowItem :title="$t('learningPath')" :subtitle="objectiveCategory.learning_path.name" />
          </b-col>
        </b-row>
      </div>
    </div>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import {getObjectiveCategoryByIdRequest} from "@/api/objective";
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
