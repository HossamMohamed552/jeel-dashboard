<template>
  <section class="container-fluid custom-container" v-if="paperwork">
    <div class="show-group">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">{{ $t('PAPER_WORK.ShowDetails') }}</h2>
          </b-col>
        </b-row>
        <b-row class="divider">
          <b-col lg="3">
            <ShowItem :title="$t('PAPER_WORK.NAME')" :subtitle="paperwork.name"/>
          </b-col>
          <b-col lg="3">
            <ShowItem :title="$t('PAPER_WORK.type')" :subtitle="paperwork.type"/>
          </b-col>
          <b-col lg="3">
            <ShowItem :title="$t('PAPER_WORK.Description')" :subtitle="paperwork.description"/>
          </b-col>
          <b-col lg="3">
            <ShowItem :title="$t('PAPER_WORK.paper_work_final_degree')"
                      :subtitle="paperwork.paper_work_final_degree"/>
          </b-col>
        </b-row>
        <b-row class="divider">
          <b-col lg="3" class="mt-4">
            <ShowItem :title="$t('PAPER_WORK.level')" :subtitle="paperwork.level.name"/>
          </b-col>
          <b-col lg="3" class="mt-4">
            <ShowItem :title="$t('PAPER_WORK.learning_path')"
                      :subtitle="paperwork.learningPath.name"/>
          </b-col>
          <b-col lg="3" class="mt-4">
            <ShowItem :title="$t('MISSIONS.terms')" :subtitle="paperwork.term.name"/>
          </b-col>
        </b-row>
        <b-row class="mt-4">
          <b-col v-if="paperwork.thumbnail" lg="4">
            <ShowItem :title="$t('PAPER_WORK.UPLOAD_IMAGE')"/>
            <img :src="paperwork.thumbnail" class="paper-img"/>
          </b-col>
          <b-col :lg="paperwork.thumbnail ? 4 : 6">
            <ShowItem :title="$t('PAPER_WORK.print')"/>
            <a class="hold-permissions" :href="paperwork.paper_work_without_color_full_url">
              <div class="permission-item item">
                <div class="hold-icon">
                  <b-icon icon="file-earmark-pdf"></b-icon>
                </div>
                <div class="d-flex justify-content-between align-items-center" v-if="paperwork">
                  <p class="video-title">{{ paperwork.paper_work_without_color_disk }}</p>
                </div>
              </div>
            </a>
          </b-col>
          <b-col :lg="paperwork.thumbnail ? 4 : 6">
            <ShowItem :title="$t('PAPER_WORK.color')"/>
            <a class="hold-permissions" :href="paperwork.paper_work_full_url">
              <div class="permission-item item">
                <div class="hold-icon">
                  <b-icon icon="file-earmark-pdf"></b-icon>
                </div>
                <div class="d-flex justify-content-between align-items-center" v-if="paperwork">
                  <p class="video-title">{{ paperwork.paper_work_without_color_disk }}</p>
                </div>
              </div>
            </a>
          </b-col>

        </b-row>

      </div>
    </div>
  </section>
</template>
<script>
import {getSinglePaperworkRequest} from "@/api/paperWork";
import ShowItem from "@/components/Shared/ShowItem/index.vue";

export default {
  name: "index",
  components: {
    ShowItem
  },
  data() {
    return {
      paperwork: null
    }
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
