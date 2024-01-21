<template>
  <section class="container-fluid custom-container">
    <div class="show-role">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">{{ $t("SCHOOL.showDetails") }}</h2>
          </b-col>
          <b-col lg="4" class="showItem">
            <ShowItem :title="$t('SCHOOL.name')" :subtitle="singleSchool.name" />
          </b-col>
          <b-col lg="4" class="showItem">
            <ShowItem :title="$t('SCHOOL.COUNTRY')" :subtitle="singleSchool.country.name" />
          </b-col>
          <b-col lg="4" class="showItem">
            <ShowItem
              :title="$t('SCHOOL.SCHOOL_COLLECTION')"
              :subtitle="singleSchool.school_group.name"
            />
          </b-col>
          <b-col lg="4" class="showItem">
            <ShowItem
              :title="$t('SCHOOL.SCHOOL_TYPE')"
              :subtitle="singleSchool.management_type.name"
            />
          </b-col>
          <b-col lg="4" class="showItem">
            <ShowItem
              :title="$t('SCHOOL.SCHOOL_CERTIFICATE_TYPE')"
              :subtitle="singleSchool.certificate.name"
            />
          </b-col>
          <b-col lg="4" class="showItem">
            <ShowItem
              :title="$t('SCHOOL.LEARNING_LANGAUAGE')"
              :subtitle="singleSchool.teaching_language.name"
            />
          </b-col>
          <b-col lg="4" class="showItem">
            <ShowItem :title="$t('SCHOOL.STUDENT_TYPE')" :subtitle="singleSchool.students_type" />
          </b-col>
          <b-col lg="4" class="showItem">
            <ShowItem :title="$t('SCHOOL.MOBILE')" :subtitle="singleSchool.phone" />
          </b-col>
          <b-col lg="4" class="showItem">
            <ShowItem :title="$t('SCHOOL.VOICE')" :subtitle="singleSchool.music_status.name" />
          </b-col>
          <b-col lg="4" class="showItem">
            <ShowItem :title="$t('SCHOOL.status')" :subtitle="singleSchool.status.name" />
          </b-col>

          <b-col lg="12">
            <PreviewMedia
              :header="$t('SCHOOL.SCHOOL_LOGO')"
              :media-name="singleSchool.logo_name"
              :file-size="singleSchool.logo_size"
              :image-url="singleSchool.logo"
              :typeOfMedia="'image'"
              :showRemoveButton="false"
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="12">
            <h2 class="heading">{{ $t("SCHOOL.SCHOOL_MANAGER_INFO") }}</h2>
          </b-col>
          <b-col lg="4" class="showItem">
            <ShowItem :title="$t('SCHOOL.MANAGER_NAME')" :subtitle="singleSchool.owner_name" />
          </b-col>
          <b-col lg="4" class="showItem">
            <ShowItem :title="$t('SCHOOL.MANAGER_MOBILE')" :subtitle="singleSchool.owner_phone" />
          </b-col>
          <b-col lg="4" class="showItem">
            <ShowItem :title="$t('SCHOOL.MANAGER_TYPE')" :subtitle="singleSchool.owner_role" />
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="12">
            <h2 class="heading">{{ $t("SCHOOL.address") }}</h2>
          </b-col>
          <b-col lg="12" class="showItem">
            <ShowItem :title="$t('SCHOOL.SCHOOL_ADDRESS')" :subtitle="singleSchool.address" />
          </b-col>
          <b-col lg="12" class="showItem">
            <ShowItem :title="$t('SCHOOL.NOTES')" :subtitle="singleSchool.notes" />
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
import { getSingleSchoolsRequest } from "@/api/school.js";
import PreviewMedia from "@/components/Shared/PreviewMedia/PreviewMedia.vue";

export default {
  name: "index",
  components: {
    ShowItem,
    SchoolTabs,
    ClassesList,
    StaffEnrollList,
    StudentEnrollList,
    SchoolAdminList,
    PreviewMedia,
  },
  data() {
    return {
      singleSchool: {},
      currentSchoolId: null,
    };
  },
  mounted() {
    this.ApiService(getSingleSchoolsRequest(this.$route.params.id)).then((response) => {
      this.singleSchool = response.data.data;
      this.currentSchoolId = response.data.data.id;
      localStorage.setItem("currentSchoolId", this.currentSchoolId);
    });
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
