<template>
  <section class="container-fluid custom-container" v-if="powerUpBox">
    <div class="show-group">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">تفاصيل صندوق الطاقة</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="4" sm="12">
            <ShowItem
                class="divider-show"
                :title="'اسم الصندوق'"
                :subtitle="powerUpBox.name"
            />
          </b-col>
          <b-col md="4" sm="12">
            <ShowItem
                class="divider-show"
                :title="'الصف الدراسى'"
                :subtitle="powerUpBox.level.name"
            />
          </b-col>
          <b-col md="4" sm="12">
            <ShowItem
                class="divider-show"
                :title="'الترم الدراسى'"
                :subtitle="powerUpBox.term.name"
            />
          </b-col>
        </b-row>
        <b-row class="mt-5">
          <b-col md="4" sm="12">
            <ShowItem
                class="divider-show"
                :title="'الدولة'"
                :subtitle="powerUpBox.country.name"
            />
          </b-col>
          <b-col md="4" sm="12">
            <ShowItem
                class="divider-show"
                :title="'ظهور بعد مدة'"
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
          <b-col md="4" sm="12">
            <ShowItem
                class="divider-show"
                :title="'عدد النقاط'"
                :subtitle="powerUpBox.jeel_xp"
            />
          </b-col>
          <b-col md="4" sm="12">
            <ShowItem
                class="divider-show"
                :title="'عدد عملات جيل'"
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
