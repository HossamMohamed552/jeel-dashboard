<template>
  <section class="container-fluid custom-container">
    <div class="show-role">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">{{ $t("SCHOOL.showDetails") }}</h2>
          </b-col>
        </b-row>
        <b-row class="mb-5">
          <b-col lg="9" class="school-data">
            <b-row class="row-data">
              <b-col lg="6">
                <ShowItem
                  :title="$t('SCHOOL.name')"
                  :subtitle="singleSchool.name"
                />
              </b-col>
              <b-col lg="6" v-if="singleSchool && singleSchool.school_group">
                <ShowItem
                  :title="$t('SCHOOL.school_group')"
                  :subtitle="singleSchool.school_group.name"
                />
              </b-col>
            </b-row>
            <b-dd-divider class="my-4"/>
            <b-row class="row-data">
              <b-col lg="6" v-if="singleSchool && singleSchool.school_type">
                <ShowItem
                  :title="$t('SCHOOL.school_type')"
                  :subtitle="singleSchool.school_type.name"
                />
              </b-col>
              <b-col lg="6" v-if="singleSchool && singleSchool.admin">
                <ShowItem
                  :title="$t('SCHOOL.userName')"
                  :subtitle="singleSchool.admin.name"
                />
              </b-col>
            </b-row>
            <b-dd-divider class="my-4"/>
            <b-row class="row-data">
              <b-col lg="6">
                <ShowItem
                  :title="$t('SCHOOL.email')"
                  :subtitle="singleSchool.email"
                />
              </b-col>
            </b-row>
            <b-dd-divider class="my-4"/>
            <b-row class="row-data">
              <b-col lg="6">
                <ShowItem
                  :title="$t('SCHOOL.address')"
                  :subtitle="singleSchool.address"
                />
              </b-col>
              <b-col lg="6">
                <ShowItem
                  :title="$t('SCHOOL.contact')"
                  :subtitle="singleSchool.contact"
                />
              </b-col>
            </b-row>
            <b-dd-divider class="my-4"/>
            <b-row class="row-data">
              <b-col lg="6" v-if="singleSchool && singleSchool.admin">
                <ShowItem
                  :title="$t('SCHOOL.email')"
                  :subtitle="singleSchool.admin.email"
                />
              </b-col>
              <b-col lg="6">
                <ShowItem
                  :title="$t('SCHOOL.music')"
                  :subtitle="
                    singleSchool.music_status == 0 ? 'أكابيلا' : 'بموسيقى'
                  "
                />
              </b-col>
            </b-row>
            <b-dd-divider class="my-4"/>
            <b-row class="row-data">
<!--              <b-col lg="6" v-if="singleSchool && singleSchool.admin">-->
<!--                <ShowItem-->
<!--                  :title="$t('SCHOOL.phone')"-->
<!--                  :subtitle="singleSchool.admin.mobile"-->
<!--                />-->
<!--              </b-col>-->
              <b-col lg="6" v-if="singleSchool && singleSchool.package">
                <ShowItem
                  :title="$t('SCHOOL.package')"
                  :subtitle="singleSchool.package.name"
                />
              </b-col>
            </b-row>
            <b-dd-divider class="my-4"/>
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
          <b-col
            lg="3"
            class="d-flex justify-content-center align-items-center"
          >
            <div class="img-container">
              <img class="w-100" :src="singleSchool.logo"/>
            </div>
          </b-col>
        </b-row>
        <b-row class="mt-5">
          <b-col lg="12">
            <SchoolTabs>
              <template v-slot:classes>
                <ClassesList :schoolId="currentSchoolId" v-if="currentSchoolId"/>
              </template>
              <template v-slot:staff-enroll>
                <StaffEnrollList :schoolId="currentSchoolId"/>
              </template>
              <template v-slot:student-enroll>
                <StudentEnrollList :schoolId="currentSchoolId"/>
              </template>
              <template v-slot:school-admin-enroll>
                <SchoolAdminList :schoolId="currentSchoolId"/>
              </template>
            </SchoolTabs>
          </b-col>
        </b-row>
      </div>
    </div>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import SchoolTabs from "@/components/Modules/SchoolDetails/SchoolTabs/index.vue";
import ClassesList from "@/components/Modules/Classes/ClassesList/index.vue";
import StaffEnrollList from "@/components/Modules/StaffEnroll/StaffEnrollList/index.vue";
import StudentEnrollList from "@/components/Modules/StudentEnroll/StudentEnrollList/index.vue";
import SchoolAdminList from "@/components/Modules/SchoolAdmin/SchoolAdminList/index.vue";
import {getSingleSchoolsRequest} from "@/api/school.js";

export default {
  name: "index",
  components: {
    ShowItem,
    SchoolTabs,
    ClassesList,
    StaffEnrollList,
    StudentEnrollList,
    SchoolAdminList
  },
  data() {
    return {
      singleSchool: {},
      currentSchoolId: null,
    };
  },
  mounted() {
    this.ApiService(getSingleSchoolsRequest(this.$route.params.id)).then(
      (response) => {
        this.singleSchool = response.data.data;
        this.currentSchoolId = response.data.data.id
        localStorage.setItem('currentSchoolId',this.currentSchoolId)
      }
    );
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
