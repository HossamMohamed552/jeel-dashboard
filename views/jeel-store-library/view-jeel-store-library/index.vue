<template>
  <section class="container-fluid custom-container" v-if="jeelStoreLibrary">
    <div class="show-group">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">تفاصيل المحتوى</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="4" sm="12">
            <ShowItem
                class="divider-show"
                :title="'اسم المحتوي'"
                :subtitle="jeelStoreLibrary.name"
            />
          </b-col>
          <b-col md="4" sm="12">
            <ShowItem
                class="divider-show"
                :title="'الصف الدراسى'"
                :subtitle="jeelStoreLibrary.level.name"
            />
          </b-col>
          <b-col md="4" sm="12">
            <ShowItem
                class="divider-show"
                :title="'عدد الجيمز'"
                :subtitle="jeelStoreLibrary.gems"
            />
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="6" class="mb-5 mt-4">
            <PreviewMedia
              :header="'لوجو المحتوى'"
              :media-name="jeelStoreLibrary.file_name"
              :file-size="jeelStoreLibrary.file_size"
              :image-url="jeelStoreLibrary.file"
              :typeOfMedia="'image'"
            />
          </b-col>
        </b-row>

        <!-- <b-row class="mt-5 mb-5">
          <b-col md="12" sm="12">
            <ShowItem
                class="divider-show"
                :title="'الوصف'"
                :subtitle="jeelStoreLibrary.jeel_xp"
            />
          </b-col>
        </b-row>

        <b-row class="mt-5">

          <b-col md="4" sm="12">
            <ShowItem
                class="divider-show"
                :title="'نوع المحتوى'"
                :subtitle="jeelStoreLibrary.appear_after_missions"
            />
          </b-col>


            <b-col md="4" sm="12">
              <ShowItem
                  class="divider-show"
                  :title="'الرابط'"
                  :subtitle="jeelStoreLibrary.appear_after_missions"
              />
              <b-col md="8" sm="12">

              </b-col>
          </b-col>
        </b-row>
        <b-row class="mt-5 mb-5">
          <b-col md="12" sm="12">
            <ShowItem
                class="divider-show"
                :title="'النص'"
                :subtitle="jeelStoreLibrary.jeel_xp"
            />
          </b-col>
        </b-row> -->


      </div>
    </div>
  </section>
</template>
<script>
import { getJeelStoreLibraryByIdRequest } from "@/api/jeel-store-library";
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
      jeelStoreLibrary: {},
    };
  },
  mounted() {
    this.ApiService(getJeelStoreLibraryByIdRequest(this.$route.params.id))
      .then((response) => {
        this.jeelStoreLibrary = response.data.data;
      })
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
