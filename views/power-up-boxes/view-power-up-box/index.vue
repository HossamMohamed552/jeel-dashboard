<template>
  <section class="container-fluid custom-container" v-if="powerUpBox">
    <div class="show-group">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">{{ $t('power_up_box.details') }}</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="4" sm="12">
            <ShowItem
                class="divider-show"
                :title="$t('power_up_box.name')"
                :subtitle="powerUpBox.name"
            />
          </b-col>
          <b-col md="4" sm="12">
            <ShowItem
                class="divider-show"
                :title="$t('power_up_box.level')"
                :subtitle="powerUpBox.level.name"
            />
          </b-col>
          <b-col md="4" sm="12">
            <ShowItem
                class="divider-show"
                :title="$t('power_up_box.term')"
                :subtitle="powerUpBox.term.name"
            />
          </b-col>
        </b-row>
        <b-row class="mt-5">
          <b-col md="4" sm="12">
            <ShowItem
                class="divider-show"
                :title="$t('power_up_box.country')"
                :subtitle="powerUpBox.country.name"
            />
          </b-col>
          <b-col md="4" sm="12">
            <ShowItem
                class="divider-show"
                :title="$t('power_up_box.appear_after_missions')"
                :subtitle="powerUpBox.appear_after_missions"
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="6" class="mb-5 mt-4">
            <PreviewMedia
              :header="$t('BADGE.bade_logo')"
              :media-name="powerUpBox.logo_name"
              :file-size="powerUpBox.logo_size"
              :image-url="powerUpBox.logo"
              :typeOfMedia="'image'"
            />
          </b-col>
        </b-row>
        <b-row class="mt-5 mb-5">
          <b-col md="4" sm="12" v-if="powerUpBox.jeel_xp">
            <ShowItem
                class="divider-show"
                :title="$t('power_up_box.numberOfPoints')"
                :subtitle="powerUpBox.jeel_xp"
            />
          </b-col>
          <b-col md="4" sm="12" v-if="powerUpBox.jeel_coins">
            <ShowItem
                class="divider-show"
                :title="$t('power_up_box.numberOfGeelCoins')"
                :subtitle="powerUpBox.jeel_coins"
            />
          </b-col>
        </b-row>
      </div>
    </div>
  </section>
</template>
<script>
import { getPowerUpBoxByIdRequest } from "@/api/power-up-boxes";
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
      powerUpBox: {},
    };
  },
  mounted() {
    this.ApiService(getPowerUpBoxByIdRequest(this.$route.params.id))
      .then((response) => {
        this.powerUpBox = response.data.data;
      })
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
