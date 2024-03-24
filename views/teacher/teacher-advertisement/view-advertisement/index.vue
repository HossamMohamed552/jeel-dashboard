<template>
  <section class="container-fluid custom-container">
    <div class="show-role">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">{{ $t("ads.DETAILS") }}</h2>
          </b-col>
        </b-row>
        <b-row class="divider">
          <b-col lg="4">
            <ShowItem :title="$t('ads.superLevel')" :subtitle="adObject.level.name"/>
          </b-col>
          <b-col lg="4">
            <ShowItem :title="$t('ads.subject')" :subtitle="adObject.subject"/>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="12" class="mt-5">
            <ShowItem :title="$t('ads.superDescription')" :subtitle="adObject.description"/>
          </b-col>
        </b-row>
      </div>
    </div>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import {getAnnouncementByIdForTeacherRequest} from "@/api/teacher-module";
export default {
  name: "index",
  components: {
    ShowItem,
  },
  data() {
    return {
      adObject: {},
    };
  },
  mounted() {
    this.ApiService(getAnnouncementByIdForTeacherRequest(this.$route.params.id)).then((response) => {
      this.adObject = response.data.data;
    });
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
