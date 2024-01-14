<template>
  <section class="container-fluid custom-container" v-if="jeelStoreGames">
    <div class="show-group">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">تفاصيل مجموعة جيمز</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="4" sm="12">
            <ShowItem
                class="divider-show"
                :title="'اسم المجموعة'"
                :subtitle="jeelStoreGames.name"
            />
          </b-col>
          <b-col md="4" sm="12">
            <ShowItem
                class="divider-show"
                :title="'الصف الدراسى'"
                :subtitle="jeelStoreGames.level.name"
            />
          </b-col>
          <b-col md="4" sm="12">
            <ShowItem
                class="divider-show"
                :title="'عدد الجيمز'"
                :subtitle="jeelStoreGames.term.name"
            />
          </b-col>
        </b-row>
        <b-row class="mt-5">

          <b-col md="4" sm="12">
            <ShowItem
                class="divider-show"
                :title="'عدد العملات'"
                :subtitle="jeelStoreGames.appear_after_missions"
            />
            <b-col md="8" sm="12">

            </b-col>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="6" class="mb-5 mt-4">
            <PreviewMedia
              :header="'لوجو المجموعة'"
              :media-name="jeelStoreGames.logo_name"
              :file-size="jeelStoreGames.logo_size"
              :image-url="jeelStoreGames.logo"
              :typeOfMedia="'image'"
            />
          </b-col>
        </b-row>
        <b-row class="mt-5 mb-5">
          <b-col md="12" sm="12">
            <ShowItem
                class="divider-show"
                :title="'الوصف'"
                :subtitle="jeelStoreGames.jeel_xp"
            />
          </b-col>
        </b-row>


      </div>
    </div>
  </section>
</template>
<script>
import { getJeelStoreGamesByIdRequest } from "@/api/jeel-store-games";
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
      jeelStoreGames: {},
    };
  },
  mounted() {
    this.ApiService(getJeelStoreGamesByIdRequest(this.$route.params.id))
      .then((response) => {
        this.jeelStoreGames = response.data.data;
      })
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
