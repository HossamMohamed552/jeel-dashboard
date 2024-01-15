<template>
  <section class="container-fluid custom-container" >
    <div class="show-group">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">التفاصيل</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="4" sm="12">
            <ShowItem
                class="divider-show"
                :title="'الفصل الدراسى'"
                :subtitle="jeelLibrary.level.name"
            />
          </b-col>
          <b-col md="4" sm="12">
            <ShowItem
                class="divider-show"
                :title="'نوع الملف'"
                :subtitle="jeelLibrary.type.name"
            />
          </b-col>
          <b-col md="4" sm="12">
            <ShowItem
                class="divider-show"
                :title="' اسم الملف'"
                :subtitle="jeelLibrary.file_name"
            />
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="6" class="mb-5 mt-4">
            <PreviewMedia
              :header="'لوجو الملف'"
              :media-name="jeelLibrary.logo_name"
              :file-size="jeelLibrary.logo_size"
              :image-url="jeelLibrary.file"
              :typeOfMedia="'image'"
            />
          </b-col>

          <b-col lg="6" class="mb-5 mt-4"   v-if="jeelLibrary.type.id==113">
            <PreviewMedia
              :header="'ملف الفيديو'"
              :media-name="jeelLibrary.logo_name"
              :file-size="jeelLibrary.logo_size"
              :image-url="jeelLibrary.logo"
              :typeOfMedia="'image'"
            />
          </b-col>
        </b-row>

        <b-row class="mt-3 mb-5">
          <b-col md="6" sm="12"  v-if="jeelLibrary.type.id==117 || jeelLibrary.type.id==115">
            <ShowItem
              class="divider-show"
              :title="'vhf'"
              :subtitle="jeelLibrary.link"
            />
          </b-col>

          <b-col md="12" sm="12"  v-if="jeelLibrary.type.id==116">
            <ShowItem
              class="divider-show"
              :title="'النص'"
              :subtitle="jeelLibrary.note"
            />
          </b-col>
        </b-row>



      </div>
    </div>
  </section>
</template>
<script>
import { getJeelLibraryByIdRequest } from "@/api/jeel-library";
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
      jeelLibrary: {},
    };
  },
  mounted() {
    this.ApiService(getJeelLibraryByIdRequest(this.$route.params.id))
      .then((response) => {
        this.jeelLibrary = response.data.data;
      })
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
