<template>
  <section class="container-fluid custom-container">
    <div class="show-role">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">{{ $t("STAFF_ENROLL.showDetails") }}</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="6" class="mb-5">
            <ShowItem
              :title="$t('STAFF_ENROLL.USER')"
              :subtitle="singleStaffEnroll.user.name"
            />
          </b-col>
          <b-col lg="6" class="mb-5">
            <ShowItem
              :title="$t('STAFF_ENROLL.ROLE')"
              :subtitle="singleStaffEnroll.role.name"
            />
          </b-col>
          <b-col lg="6" class="mb-5">
            <ShowItem
              :title="$t('STAFF_ENROLL.CLASS')"
              :subtitle="singleStaffEnroll.class.name"
            />
          </b-col>
          <b-col lg="6" class="mb-5">
            <ShowItem
              :title="$t('STAFF_ENROLL.LEVEL')"
              :subtitle="singleStaffEnroll.level.name"
            />
          </b-col>
        </b-row>
      </div>
    </div>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import { getSingleStaffEnrollRequest } from "@/api/staffEnroll.js";
export default {
  name: "index",
  components: {
    ShowItem,
  },
  data() {
    return {
      singleStaffEnroll: {},
    };
  },
  mounted() {
    this.ApiService(getSingleStaffEnrollRequest(this.$route.params.id)).then(
      (response) => {
        this.singleStaffEnroll = response.data.data;
      }
    );
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
