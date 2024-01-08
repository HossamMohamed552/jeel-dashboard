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
          <b-col lg="4" >
            <ShowItem class="with-border-bottom" :title="$t('OUTCOME.NAME')" :subtitle="outcomeCategory.name" />
          </b-col>
          <b-col lg="4" v-if="outcomeCategory.learningPath.name">
            <ShowItem
              class="with-border-bottom"
              :title="$t('PATH.Name')"
              :subtitle="outcomeCategory.learningPath.name"
            />
          </b-col>
          <b-col lg="4" v-if="outcomeCategory.lesson.name">
            <ShowItem
              class="with-border-bottom"
              :title="$t('LESSONS.NAME')"
              :subtitle="outcomeCategory.lesson.name"
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
