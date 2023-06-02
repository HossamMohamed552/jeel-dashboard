<template>
  <section class="container-fluid custom-container">
    <div class="show-role">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">{{ $t("SCHOOL_TYPE.showDetails") }}</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="6">
            <ShowItem :title="$t('SCHOOL_TYPE.name')" :subtitle="singleSchoolType.name" />
          </b-col>
        </b-row>
      </div>
    </div>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import { getSingleSchoolTypesRequest } from "@/api/schoolType";
export default {
  name: "index",
  components: {
    ShowItem,
  },
  data() {
    return {
      singleSchoolType: {},
    };
  },
  mounted() {
    this.ApiService(getSingleSchoolTypesRequest(this.$route.params.id)).then(
      (response) => {
        this.singleSchoolType = response.data.data;
      }
    );
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
