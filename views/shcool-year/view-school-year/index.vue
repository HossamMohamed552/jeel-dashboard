<template>
  <section class="container-fluid custom-container">
    <div class="show-term">
      <div class="hold-fields">
        <b-row>
          <!-- <b-col lg="12">
              <h2 class="heading">{{$t('TERM.showDetails')}}</h2>
          </b-col> -->
        </b-row>
        <b-row>
          <b-col lg="6">
            <ShowItem title="الاسم بالعربية" :subtitle="schoolYear.name" />
          </b-col>
          <b-col lg="6">
            <ShowItem title="الاسم بالانجليزية" :subtitle="schoolYear.name" />
          </b-col>
        </b-row>
      </div>
    </div>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import { getSchoolYearByIdRequest } from "@/api/school-year";
export default {
  name: "index",
  components: {
    ShowItem,
  },
  data() {
    return {
      schoolYear: {},
    };
  },
  mounted() {
    this.ApiService(getSchoolYearByIdRequest(this.$route.params.id)).then((response) => {
      this.schoolYear = response.data.data;
    });
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
