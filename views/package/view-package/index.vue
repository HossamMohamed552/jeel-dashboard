<template>
  <section class="container-fluid custom-container">
    <div class="show-role">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">{{ $t("PACKAGE.showDetails") }}</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="4" class="mb-5">
            <ShowItem :title="$t('PACKAGE.name')" :subtitle="singlePackage.name" />
          </b-col>
          <b-col lg="4" class="mb-5">
            <ShowItem
              :title="$t('PACKAGE.classes_count')"
              :subtitle="singlePackage.classes_count"
            />
          </b-col>
          <b-col lg="4" class="mb-5" v-for="singlePackageRole in singlePackage.number_users_roles" :key="singlePackageRole.id">
            <ShowItem
              :title="singlePackageRole.name"
              :subtitle="singlePackageRole.number"
            />
          </b-col>
          <b-col lg="12">
            <ShowItem
              :title="$t('PACKAGE.description')"
              :subtitle="singlePackage.description"
            />
          </b-col>
        </b-row>
      </div>
    </div>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import { getSinglePackagesRequest } from "@/api/packages.js";
export default {
  name: "index",
  components: {
    ShowItem,
  },
  data() {
    return {
      singlePackage: {},
    };
  },
  mounted() {
    this.ApiService(getSinglePackagesRequest(this.$route.params.id)).then(
      (response) => {
        this.singlePackage = response.data.data;
      }
    );
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
