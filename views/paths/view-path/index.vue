<template v-if="path">
  <section class="container-fluid custom-container">
    <div class="show-group">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h3 class="heading">{{ $t("PATH.ShowDetails") }}</h3>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" md="4">
            <ShowItem :title="$t('PATH.Name')" :subtitle="path.name" class="with-border-bottom" />
          </b-col>
          <!-- <b-col cols="12" md="4">
            <ShowItem
              :title="$t('PATH.Description')"
              :subtitle="path.description"
              class="with-border-bottom"
            />
          </b-col> -->
        </b-row>
      </div>
    </div>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import { getSingleLearningPathRequest } from "@/api/learningPath";
export default {
  name: "index",
  components: {
    ShowItem,
  },
  data() {
    return {
      path: {},
    };
  },
  mounted() {
    this.ApiService(getSingleLearningPathRequest(this.$route.params.id)).then((response) => {
      this.path = response.data.data;
    });
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
