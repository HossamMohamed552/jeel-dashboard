<template>
  <section class="container-fluid custom-container">
    <div class="show-role">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">تفاصيل الصف الدراسي</h2>
          </b-col>
        </b-row>
        <b-row class="divider">
          <b-col lg="4" class="mb-5">
            <ShowItem :title="$t('TABLE_FIELDS.studyYearName')" :subtitle="singleLevel.studyYear.name" />
          </b-col>
          <b-col lg="4" class="mb-5">
            <ShowItem
              :title="$t('TABLE_FIELDS.levelSchoolAdmin')"
              :subtitle="singleLevel.level.name"
            />
          </b-col>
          <b-col lg="4" class="mb-5" v-if="singleLevel.classes">
            <ShowItem :title="$t('TABLE_FIELDS.classes_count')" :subtitle="singleLevel.classes" />
          </b-col>
        </b-row>
      </div>
    </div>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import {getSingleLevelForTeacherRequest} from "@/api/teacher-module";
export default {
  name: "index",
  components: {
    ShowItem,
  },
  data() {
    return {
      singleLevel: {},
    };
  },
  mounted() {
    this.ApiService(getSingleLevelForTeacherRequest(this.$route.params.id)).then(
      (response) => {
        this.singleLevel = response.data.data;
      }
    );
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
