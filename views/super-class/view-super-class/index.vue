<template>
  <section class="container-fluid custom-container">
    <div class="show-role">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">{{ $t("CLASS.showSuperDetails") }}</h2>
          </b-col>
        </b-row>
        <b-row class="divider">
          <b-col lg="4" class="mb-5">
            <ShowItem :title="$t('CLASS.ٍsuperName')" :subtitle="singleClass.name" />
          </b-col>
          <b-col lg="4" class="mb-5">
            <ShowItem
              :title="$t('CLASS.superTerm')"
              :subtitle="singleClass.term.name"
            />
          </b-col>
          <b-col lg="4" class="mb-5" v-if="singleClass.school">
            <ShowItem
              :title="$t('CLASS.superSchool')"
              :subtitle="singleClass.school.name"
            />
          </b-col>
        </b-row>
        <b-row >
          <b-col lg="4" class="mb-5" v-if="singleClass.students_count">
            <ShowItem :title="$t('CLASS.students_count')" :subtitle="singleClass.students_count" />
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
