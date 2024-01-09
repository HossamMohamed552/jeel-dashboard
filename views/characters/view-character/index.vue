<template>
  <section class="container-fluid custom-container" v-if="characters">
    <div class="show-group">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">{{ $t("CHARACTER.character_details") }}</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="4" sm="12">
            <ShowItem
              class="divider-show"
              :title="$t('CHARACTER.NAME')"
              :subtitle="characters.name"
            />
          </b-col>
          <b-col md="4" sm="12">
            <ShowItem
              class="divider-show"
              :title="$t('CHARACTER.country')"
              :subtitle="characters.country.name"
            />
          </b-col>
          <b-col md="4" sm="12">
            <ShowItem
              class="divider-show"
              :title="$t('CHARACTER.type')"
              :subtitle="characters.chracter_type[0].key"
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="12" class="mb-5 mt-4">
            <PreviewMedia
              :header="$t('BADGE.character_logo')"
              :media-name="characters.image_name"
              :file-size="characters.image_size"
              :image-url="characters.image"
              :typeOfMedia="'image'"
            />
          </b-col>
        </b-row>
      </div>
    </div>
  </section>
</template>
<script>
import { getCharacterByIdRequest } from "@/api/character";
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
      characters: {},
    };
  },
  mounted() {
    this.ApiService(getCharacterByIdRequest(this.$route.params.id))
      .then((response) => {
        this.characters = response.data.data;
      })
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
