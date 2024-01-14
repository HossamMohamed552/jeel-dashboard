<template>
  <section class="container-fluid custom-container">
    <div class="show-term">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h3 class="heading">تفاصيل المجموعة</h3>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" md="6" lg="4">
            <ShowItem
              title="اسم المجموعة"
              :subtitle="seasonalMissionGroup.name"
              class="with-border-bottom"
            />
          </b-col>
          <b-col cols="12">
            <PreviewMedia
              :header="'لوجو المجموعة'"
              :typeOfMedia="'image'"
              :showDownloadButton="true"
              :mediaName="seasonalMissionGroup.logo_name"
              :fileSize="seasonalMissionGroup.logo_size"
              :imageUrl="seasonalMissionGroup.logo"
            />
          </b-col>
        </b-row>
      </div>
    </div>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import PreviewMedia from "@/components/Shared/PreviewMedia/PreviewMedia.vue";

import { getSeasonalMissionGroupByIdRequest } from "@/api/seasonal-mission-group";
export default {
  name: "index",
  components: {
    ShowItem,
    PreviewMedia,
  },
  data() {
    return {
      seasonalMissionGroup: {},
    };
  },
  mounted() {
    this.ApiService(getSeasonalMissionGroupByIdRequest(this.$route.params.id)).then((response) => {
      this.seasonalMissionGroup = response.data.data;
    });
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
