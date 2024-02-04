<template>
  <section class="container-fluid custom-container">
    <div class="show-role">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">{{ $t("schoolAdmin.classDETAILS") }}</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="4" class="mb-5">
            <ShowItem class="divider-show" :title="$t('schoolAdmin.className')" :subtitle="classItem.name" />
          </b-col>
          <b-col lg="4" class="mb-5">
            <ShowItem class="divider-show" :title="$t('schoolAdmin.schoolName')" :subtitle="classItem.school.name" />
          </b-col>
          <b-col lg="4" class="mb-5">
            <ShowItem class="divider-show" :title="$t('schoolAdmin.studyYear')" :subtitle="classItem.studyYear.name" />
          </b-col>
          <b-col lg="4" class="mb-5">
            <ShowItem class="divider-show" :title="$t('schoolAdmin.level')" :subtitle="classItem.level.name" />
          </b-col>
          <b-col lg="4">
            <ShowItem class="divider-show" :title="$t('schoolAdmin.students_count')" :subtitle="classItem.student_count" />
          </b-col>
        </b-row>
      </div>
    </div>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import {getClassByIdRequest} from "@/api/school-info";

export default {
  name: "index",
  components: {ShowItem},
  data() {
    return {
      classItem: {},
    };
  },
  mounted() {
    this.ApiService(getClassByIdRequest(this.$route.params.id)).then((response) => {
      this.classItem = response.data.data;
    });
  },
}
</script>
<style scoped lang="scss">

</style>
