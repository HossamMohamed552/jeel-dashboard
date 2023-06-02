<template>
  <section class="container-fluid custom-container">
    <div class="show-role">
      <div class="hold-fields">
        <!-- <b-row>
          <b-col lg="12">
            <h2 class="heading">{{ $t("SCHOOL.showDetails") }}</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="6">
            <ShowItem :title="$t('SCHOOL_TYPE.name')" :subtitle="singleSchool.name" />
          </b-col>
        </b-row> -->
        <b-row>
          <b-col lg="12">
            <h2 class="heading">{{ $t("SCHOOL.showDetails") }}</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="9" class="school-data">
            <b-row class="row-data">
              <b-col lg="6">
                <ShowItem
                  :title="$t('SCHOOL.name')"
                  :subtitle="singleSchool.name"
                />
              </b-col>
              <b-col lg="6">
                <ShowItem
                  :title="$t('SCHOOL.school_group')"
                  :subtitle="singleSchool.school_group.name"
                />
              </b-col>
            </b-row>
            <b-dd-divider class="my-4" />
            <b-row class="row-data">
              <b-col lg="6">
                <ShowItem
                  :title="$t('SCHOOL.school_type')"
                  :subtitle="singleSchool.school_type.name"
                />
              </b-col>
              <b-col lg="6">
                <ShowItem
                  :title="$t('SCHOOL.userName')"
                  :subtitle="singleSchool.admin.name"
                />
              </b-col>
            </b-row>
            <b-dd-divider class="my-4" />
            <b-row class="row-data">
              <b-col lg="6">
                <ShowItem
                  :title="$t('SCHOOL.email')"
                  :subtitle="singleSchool.admin.email"
                />
              </b-col>
              <b-col lg="6">
                <ShowItem
                  :title="$t('SCHOOL.music')"
                  :subtitle="
                    singleSchool.music_status == 0 ? 'غير متاح' : 'متاح'
                  "
                />
              </b-col>
            </b-row>
            <b-dd-divider class="my-4" />
            <b-row class="row-data">
              <b-col lg="6">
                <ShowItem
                  :title="$t('SCHOOL.phone')"
                  :subtitle="singleSchool.admin.mobile"
                />
              </b-col>
              <b-col lg="6">
                <ShowItem
                  :title="$t('SCHOOL.package')"
                  :subtitle="singleSchool.package.name"
                />
              </b-col>
            </b-row>
            <b-dd-divider class="my-4" />
            <b-row class="row-data">
              <b-col lg="6">
                <ShowItem
                  :title="$t('SCHOOL.dateFrom')"
                  :subtitle="singleSchool.subscription_start_date"
                />
              </b-col>
              <b-col lg="6">
                <ShowItem
                  :title="$t('SCHOOL.dateTo')"
                  :subtitle="singleSchool.subscription_end_date"
                />
              </b-col>
            </b-row>
          </b-col>
          <b-col lg="3" class="d-flex justify-content-center align-items-center">
            <div class="img-container">
              <img class="w-100" :src="singleSchool.logo" />
            </div>
          </b-col>
        </b-row>
      </div>
    </div>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import { getSingleSchoolsRequest } from "@/api/school.js";
export default {
  name: "index",
  components: {
    ShowItem,
  },
  data() {
    return {
      singleSchool: {},
      currentSchoolId: this?.singleSchool?.id,
    };
  },
  mounted() {
    this.ApiService(getSingleSchoolsRequest(this.$route.params.id)).then(
      (response) => {
        this.singleSchool = response.data.data;
      }
    );
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
