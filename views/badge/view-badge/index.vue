<template>
  <section class="container-fluid custom-container" v-if="badges">
    <div class="show-group">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">{{ $t("BADGE.bade_details") }}</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="4" sm="12">
            <ShowItem
              class="divider-show"
              :title="$t('BADGE.NAME')"
              :subtitle="badges.name"
            />
          </b-col>
          <b-col md="4" sm="12">
            <ShowItem
              class="divider-show"
              :title="$t('BADGE.main_percentage')"
              :subtitle="badges.main_percentage"
            />
          </b-col>
          <b-col md="4" sm="12">
            <ShowItem
              class="divider-show"
              :title="$t('BADGE.max_percentage')"
              :subtitle="badges.max_percentage"
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="12" class="mb-5 mt-4">
            <PreviewMedia
              :header="$t('BADGE.bade_logo')"
              :media-name="badges.logo_name"
              :file-size="badges.logo_size"
              :image-url="badges.logo"
              :typeOfMedia="'image'"
            />
          </b-col>
        </b-row>
      </div>
    </div>
  </section>
</template>
<script>
import { getBadgeByIdRequest } from "@/api/badge";
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import PreviewMedia from "@/components/Shared/PreviewMedia/PreviewMedia.vue";

export default {
  name: "index",
  components: {
    ShowItem,
    PreviewMedia,
  },
  data() {
    return {
      badges: {},
    };
  },
  mounted() {
    this.ApiService(getBadgeByIdRequest(this.$route.params.id))
      .then((response) => {
        this.badges = response.data.data;
      })
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
