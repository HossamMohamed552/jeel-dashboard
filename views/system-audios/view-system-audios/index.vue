<template>
  <section class="container-fluid custom-container">
    <div class="show-role">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">تفاصيل الصوت</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="12" class="mb-5">
            <ShowItem
              class="divider-show"
              title="اسم التصنيف"
              :subtitle="singleSystemAudios.category.name"
            />
          </b-col>
          <b-col lg="6" class="mb-5">
            <ShowItem
              class="divider-show"
              title="اسم الصوت بالعربية"
              :subtitle="singleSystemAudios.name.ar"
            />
          </b-col>
          <b-col lg="6" class="mb-5">
            <ShowItem
              class="divider-show"
              title="اسم الصوت بالانجليزية"
              :subtitle="singleSystemAudios.name.en"
            />
          </b-col>
          <b-col lg="6" class="mb-5">
            <PreviewMedia
              header="ملف الصوت العربي"
              :media-name="singleSystemAudios.audio_ar_name"
              :file-size="singleSystemAudios.audio_ar_size"
              :typeOfMedia="'audio'"
              @showModal="showModal(singleSystemAudios.audio_ar)"
            />
          </b-col>
          <b-col lg="6" class="mb-5">
            <PreviewMedia
              header="ملف الصوت الانجليزي"
              :media-name="singleSystemAudios.audio_en_name"
              :file-size="singleSystemAudios.audio_en_size"
              :typeOfMedia="'audio'"
              @showModal="showModal(singleSystemAudios.audio_en)"
            />
          </b-col>
        </b-row>
      </div>
    </div>
    <GeneralModal :id="'holdContent'" :size="'lg'" :hide-header="true">
      <template #modalBody>
        <div class="text-center">
          <div>
            <audio :src="url" ref="player" autoplay="autoplay" controls="controls"></audio>
          </div>
          <Button @click="hideModal" :custom-class="'rounded-btn transparent-btn'">
            {{ $t("BACK") }}
          </Button>
        </div>
      </template>
    </GeneralModal>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import PreviewMedia from "@/components/Shared/PreviewMedia/PreviewMedia.vue";
import GeneralModal from "@/components/Shared/GeneralModal/index.vue";

import { getSingleSystemAudiosRequest } from "@/api/system-audios.js";
export default {
  name: "index",
  components: {
    ShowItem,
    PreviewMedia,
    GeneralModal,
  },
  data() {
    return {
      singleSystemAudios: {},
      url: null,
    };
  },
  methods: {
    hideModal() {
      this.$bvModal.hide("holdContent");
    },
    showModal(audio) {
      this.$bvModal.show("holdContent");
      this.url = audio;
    },
  },
  created() {
    this.ApiService(getSingleSystemAudiosRequest(this.$route.params)).then((response) => {
      this.singleSystemAudios = response.data.data;
    });
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
