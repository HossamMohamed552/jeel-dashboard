<template>
  <section class="container-fluid custom-container">
    <div class="show-term">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h3 class="heading">تفاصيل العام الدراسي</h3>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" md="6" lg="4">
            <ShowItem
              title="اسم العام الدراسي"
              :subtitle="schoolYear.name"
              class="with-border-bottom"
            />
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
