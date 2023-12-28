<template>
  <section class="container-fluid custom-container" v-if="paperwork">
    <div class="show-group">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">{{ $t('PAPER_WORK.ShowDetails') }}</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="9">
            <ShowItem class="divider-show" :title="$t('PAPER_WORK.NAME')" :subtitle="paperwork.name"/>
          </b-col>
          <b-col lg="3">
            <ShowItem class="divider-show" :title="$t('PAPER_WORK.paper_work_final_degree')"
                      :subtitle="paperwork.paper_work_final_degree"/>
          </b-col>
          <b-col lg="12">
            <PreviewMedia :header="$t('PAPER_WORK.audioFile')"
                          :media-name="paperwork.audio_name"
                          :file-size="paperwork.audio_size"
                          :image-url="paperwork.audio"
                          :typeOfMedia="'audio'"
                          @showModal="showModal(paperwork,$event)"
            />
          </b-col>
          <b-col lg="6" class="mt-4">
            <ShowItem class="divider-show" :title="$t('PAPER_WORK.type')" :subtitle="paperwork.type"/>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="6" class="mt-4">
            <ShowItem class="divider-show" :title="$t('PAPER_WORK.learning_path')"
                      :subtitle="paperwork.learningPath.name"/>
          </b-col>
          <b-col lg="6" class="mt-4">
            <ShowItem class="divider-show" :title="$t('LESSONS.videoNAME')"
                      :subtitle="paperwork.lesson.name"/>
          </b-col>
          <b-col lg="6">
            <PreviewMedia :header="$t('PAPER_WORK.color')"
                          :media-name="paperwork.paper_work_with_color_name"
                          :file-size="paperwork.paper_work_with_color_size"
                          :image-url="paperwork.paper_work_with_color_full_url"
                          :typeOfMedia="'paper_work_with_color_full_url'"
                          @showModal="showModal(paperwork,$event)"
            />
          </b-col>
          <b-col lg="6">
            <PreviewMedia :header="$t('PAPER_WORK.print')"
                          :media-name="paperwork.paper_work_without_color_name"
                          :file-size="paperwork.paper_work_without_color_size"
                          :image-url="paperwork.paper_work_without_color_full_url"
                          :typeOfMedia="'paper_work_with_color_full_url'"
                          @showModal="showModal(paperwork,$event)"
            />
          </b-col>
        </b-row>
        <b-row class="mt-4">
          <b-col lg="4">
            <ShowItem v-if="paperwork && paperwork.blooms"  class="divider-show" :title="$t('PAPER_WORK.BLOOM_TITLE')" :subtitle="paperwork.blooms.name"/>
          </b-col>
          <b-col lg="4">
            <ShowItem class="divider-show" :title="$t('PAPER_WORK.languageMethods')"
                      :with-out-background="true" :listItems="paperwork.learning_styles"/>
          </b-col>
          <b-col lg="4">
            <ShowItem class="divider-show" :title="$t('PAPER_WORK.SKILL_TYPE')"
                      :with-out-background="true" :listItems="paperwork.language_skills"/>
          </b-col>
          <b-col lg="12" class="mt-4">
            <ShowItem class="divider-show" :title="$t('PAPER_WORK.Description')" :subtitle="paperwork.description"/>
          </b-col>
        </b-row>
      </div>
    </div>
    <GeneralModal :id="'holdContent'" :size="'lg'" :hide-header="true">
      <template #modalBody>
        <div class="text-center">
          <div v-if="mediaType === 'audio'">
            <audio :src="url"
                   ref="player"
                   autoplay="autoplay"
                   controls="controls"></audio>
          </div>
          <div v-else>
            <img :src="url">
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
import {getSinglePaperworkRequest} from "@/api/paperWork";
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import PreviewMedia from "@/components/Shared/PreviewMedia/PreviewMedia.vue";
import GeneralModal from "@/components/Shared/GeneralModal/index.vue";
import Button from "@/components/Shared/Button/index.vue";

export default {
  name: "index",
  components: {
    Button, GeneralModal,
    PreviewMedia,
    ShowItem
  },
  data() {
    return {
      paperwork: null,
      url:null,
      mediaType: null
    }
  },
  methods:{
    showModal(paperWork, $event) {
      this.$bvModal.show('holdContent')
      this.mediaType = $event
      if (this.mediaType === 'audio'){
        this.url = paperWork.audio
      } else if (this.mediaType === 'paper_work_with_color_full_url'){
        this.url = paperWork.paper_work_with_color_full_url
      }
      else if (this.mediaType === 'paper_work_without_color_full_url'){
        this.url = paperWork.paper_work_without_color_full_url
      }
    },
    hideModal() {
      this.$bvModal.hide('holdContent')
    },
  },
  mounted() {
    this.ApiService(getSinglePaperworkRequest(this.$route.params.id)).then((response) => {
      this.paperwork = response.data.data
    })
  }
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
