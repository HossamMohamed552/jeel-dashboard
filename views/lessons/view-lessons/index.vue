<template>
  <section class="container-fluid custom-container">
    <div class="show-role">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h3 class="heading">{{ $t("LESSONS.DETAILS") }}</h3>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="4">
            <ShowItem
              title="اسم الدرس"
              :subtitle="LessonData.name"
              class="with-border-bottom"
            />
          </b-col>
          <b-col lg="4" v-if="LessonData.level">
            <ShowItem
              :title="$t('MISSIONS.level')"
              :subtitle="LessonData.level.name"
              class="with-border-bottom"
            />
          </b-col>
          <b-col lg="4" v-if="LessonData.level">
            <ShowItem
              :title="$t('MISSIONS.terms')"
              :subtitle="LessonData.term.name"
              class="with-border-bottom"
            />
          </b-col>
          <b-col lg="4" v-if="LessonData.learningPath">
            <ShowItem
              title="اسم المسار"
              :subtitle="LessonData.learningPath.name"
              class="with-border-bottom"
            />
          </b-col>
        </b-row>
      </div>
    </div>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import { getLessonByIdRequest } from "@/api/lessons";
export default {
  name: "index",
  components: {
    ShowItem,
  },
  data() {
    return {
      LessonData: {},
    };
  },
  mounted() {
    this.ApiService(getLessonByIdRequest(this.$route.params.id)).then((response) => {
      this.LessonData = response.data.data;
    });
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
