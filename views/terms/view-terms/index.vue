<template>
  <section class="container-fluid custom-container">
    <div class="show-term">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h3 class="heading">{{ $t("TERM.showDetails") }}</h3>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="4" md="4">
            <ShowItem class="with-border-bottom" :title="$t('TERM.name')" :subtitle="term.name" />
          </b-col>
          <b-col cols="4" md="4" v-if="term.min_missions">
            <ShowItem class="with-border-bottom" title="الحد الادني للمهام" :subtitle="`${term.min_missions}`" />
          </b-col>
          <!-- <b-col lg="4" v-if="term.levels">
            <ShowItem :title="$t('TERM.phases')" :list-items="term.levels" />
          </b-col>
          <b-col lg="4" v-if="term.classes_count">
            <ShowItem :title="$t('TERM.classes_count')" :subtitle="`${term.classes_count} فصل `" />
          </b-col> -->
        </b-row>
      </div>
    </div>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import { getSingleTermsRequest } from "@/api/term";
export default {
  name: "index",
  components: {
    ShowItem,
  },
  data() {
    return {
      term: {},
    };
  },
  mounted() {
    this.ApiService(getSingleTermsRequest(this.$route.params.id)).then((response) => {
      this.term = response.data.data;
    });
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
