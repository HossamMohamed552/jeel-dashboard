<template>
  <section class="container-fluid custom-container">
    <div class="show-role">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">{{ $t("BLOOM.DETAILS") }}</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="6">
            <ShowItem :title="$t('BLOOM.BLOOM_NAME')" :subtitle="bloomCategory.name" />
          </b-col>
          <!-- <b-col lg="6">
            <ShowItem :title="$t('slug')" :subtitle="bloomCategory.slug" />
          </b-col> -->
        </b-row>
      </div>
    </div>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import { getBloomCategoryByIdRequest } from "@/api/bloom";
export default {
  name: "index",
  components: {
    ShowItem,
  },
  data() {
    return {
      bloomCategory: {},
    };
  },
  mounted() {
    this.ApiService(getBloomCategoryByIdRequest(this.$route.params.id)).then((response) => {
      this.bloomCategory = response.data.data;
    });
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
