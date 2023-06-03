<template>
  <section class="container-fluid custom-container">
    <div class="show-role">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">{{ $t("STUDENT_ENROLL.showDetails") }}</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="6">
            <ShowItem :title="$t('SCHOOL_TYPE.name')" :subtitle="singleStudentEnroll.name" />
          </b-col>
        </b-row>
      </div>
    </div>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import { getSingleStudentEnrollRequest } from "@/api/studentEnroll.js";
export default {
  name: "index",
  components: {
    ShowItem,
  },
  data() {
    return {
      singleStudentEnroll: {},
    };
  },
  mounted() {
    this.ApiService(getSingleStudentEnrollRequest(this.$route.params.id)).then(
      (response) => {
        this.singleStudentEnroll = response.data.data;
      }
    );
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
