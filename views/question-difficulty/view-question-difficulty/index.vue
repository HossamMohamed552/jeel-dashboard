<template>
  <section class="container-fluid custom-container">
    <div class="show-role">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">{{ $t("QUESTION_DIFFICULTY") }}</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="4" class="mb-5">
            <ShowItem
              class="divider-show"
              title="اسم مستوى السؤال"
              :subtitle="singleQuestionDifficulty.name"
            />
          </b-col>
          <b-col lg="4" class="mb-5">
            <ShowItem
              class="divider-show"
              title="عدد النقاط"
              :subtitle="singleQuestionDifficulty.grade_points"
            />
          </b-col>
        </b-row>
      </div>
    </div>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import { getSingleQuestionDifficltyRequest } from "@/api/question-difficulty.js";
export default {
  name: "index",
  components: {
    ShowItem,
  },
  data() {
    return {
      singleQuestionDifficulty: {},
    };
  },
  mounted() {
    this.ApiService(
      getSingleQuestionDifficltyRequest(this.$route.params.id)
    ).then((response) => {
      this.singleQuestionDifficulty = response.data.data;
    });
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
