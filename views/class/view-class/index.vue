<template>
  <section class="container-fluid custom-container">
    <div class="show-role">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">{{ $t("CLASS.showDetails") }}</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="6" class="mb-5">
            <ShowItem :title="$t('CLASS.name')" :subtitle="singleClass.name" />
          </b-col>
          <b-col lg="6" class="mb-5">
            <ShowItem
              :title="$t('CLASS.term')"
              :subtitle="singleClass.term.name"
            />
          </b-col>
          <b-col lg="6" class="mb-5">
            <ShowItem
              :title="$t('CLASS.level')"
              :subtitle="singleClass.level.name"
            />
          </b-col>
        </b-row>
      </div>
    </div>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import { getSingleClassRequest } from "@/api/class.js";
export default {
  name: "index",
  components: {
    ShowItem,
  },
  data() {
    return {
      singleClass: {},
    };
  },
  mounted() {
    this.ApiService(getSingleClassRequest(this.$route.params.id)).then(
      (response) => {
        this.singleClass = response.data.data;
      }
    );
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
