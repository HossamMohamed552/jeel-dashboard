<template>
  <section class="container-fluid custom-container">
    <div class="show-term">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h3 class="heading">تفاصيل الترم الدراسى</h3>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" md="6" lg="3">
            <ShowItem
              title="العام الدراسى"
              :subtitle="academicYear?.name"
              class="with-border-bottom"
            />
          </b-col>
          <b-col cols="12" md="6" lg="3">
            <ShowItem
              title="الترم الدراسى"
              :subtitle="academicYear?.name"
              class="with-border-bottom"
            />
          </b-col>
          <b-col cols="12" md="6" lg="3">
            <ShowItem
              title="تاريخ البداية"
              :subtitle="academicYear?.start_date"
              class="with-border-bottom"
            />
          </b-col>
          <b-col cols="12" md="6" lg="3">
            <ShowItem
              title="تاريخ النهاية"
              :subtitle="academicYear?.end_date"
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
import { getSingleAcademicYearRequest } from "@/api/academicYear";
export default {
  name: "index",
  components: {
    ShowItem,
  },
  data() {
    return {
      academicYear: {},
    };
  },
  mounted() {
    this.ApiService(getSingleAcademicYearRequest(this.$route.params.id)).then((response) => {
      this.academicYear = response.data.data;
    });
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
