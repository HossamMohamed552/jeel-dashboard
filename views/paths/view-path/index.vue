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
          <b-col lg="12">
            <PreviewMedia :header="$t('PAPER_WORK.audioFile')"
                          :media-name="path.audio_name"
                          :file-size="path.audio_size"
                          :image-url="path.audio"
                          :typeOfMedia="'audio'"
                          @showModal="showModal(path,$event)"
            />
          </b-col>
          <!-- <b-col cols="12" md="4">
            <ShowItem
              :title="$t('PATH.Description')"
              :subtitle="path.description"
              class="with-border-bottom"
            />
          </b-col> -->
          <GeneralModal :id="'holdContent'" :size="'lg'" :hide-header="true">
            <template #modalBody>
              <div class="text-center">
                <div v-if="mediaType === 'audio'">
                  <audio :src="url"
                         ref="player"
                         autoplay="autoplay"
                         controls="controls"></audio>
                </div>
                <div v-else class="height-modal">
                  <img :src="url" class="image-modal">
                </div>
                <Button @click="hideModal" :custom-class="'rounded-btn transparent-btn'">
                  {{ $t("BACK") }}
                </Button>
              </div>
            </template>
          </GeneralModal>
        </b-row>
      </div>
    </div>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import { getSingleLearningPathRequest } from "@/api/learningPath";
import PreviewMedia from "@/components/Shared/PreviewMedia/PreviewMedia.vue";
import Button from "@/components/Shared/Button/index.vue";
import GeneralModal from "@/components/Shared/GeneralModal/index.vue";
export default {
  name: "index",
  components: {
    GeneralModal, Button,
    PreviewMedia,
    ShowItem,
  },
  data() {
    return {
      path: {},
      url:null,
      mediaType: null
    };
  },
  methods:{
    showModal(path, $event, fileUrl='') {
      this.$bvModal.show('holdContent')
      this.mediaType = $event
      if (this.mediaType === 'audio'){
        this.url = path.audio
      } else {
        this.url = fileUrl
      }
    },
    hideModal() {
      this.$bvModal.hide('holdContent')
    },
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
