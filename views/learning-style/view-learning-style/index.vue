<template>
  <section class="container-fluid custom-container">
    <div class="show-term">
      <div class="hold-fields">
        <b-row> </b-row>
        <b-row>
          <b-col lg="6">
            <ShowItem title="الاسم " :subtitle="LearningStyle.name" />
          </b-col>
        </b-row>
      </div>
    </div>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import { getLearningStyleByIdRequest } from "@/api/learning-style";
export default {
  name: "index",
  components: {
    ShowItem,
  },
  data() {
    return {
      LearningStyle: {},
    };
  },
  mounted() {
    this.ApiService(getLearningStyleByIdRequest(this.$route.params.id)).then((response) => {
      this.LearningStyle = response.data.data;
    });
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
