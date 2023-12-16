<template>
  <section class="container-fluid custom-container">
    <div class="show-term">
      <div class="hold-fields">
        <b-row> </b-row>
        <b-row>
          <b-col lg="6">
            <ShowItem title="الاسم " :subtitle="LearningSkill.name" />
          </b-col>
        </b-row>
      </div>
    </div>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import { getLearningSkillByIdRequest } from "@/api/learning-skill";
export default {
  name: "index",
  components: {
    ShowItem,
  },
  data() {
    return {
      LearningSkill: {},
    };
  },
  mounted() {
    this.ApiService(getLearningSkillByIdRequest(this.$route.params.id)).then((response) => {
      this.LearningSkill = response.data.data;
    });
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
