<template>
  <section class="container-fluid custom-container">
    <div class="show-role">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">{{ $t("OUTCOME.DETAILS") }}</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="6" class="mb-3">
            <ShowItem :title="$t('GLOBAL_NAME')" :subtitle="outcomeCategory.name" />
          </b-col>
<!--          <b-col lg="6" class="mb-3">-->
<!--            <ShowItem :title="$t('slug')" :subtitle="outcomeCategory.slug" />-->
<!--          </b-col>-->
          <b-col lg="6">
            <ShowItem :title="$t('learningPath')" :subtitle="outcomeCategory.learning_path.name" />
          </b-col>
        </b-row>
      </div>
    </div>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import {getOutcomeCategoryByIdRequest} from "@/api/outcome";
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
