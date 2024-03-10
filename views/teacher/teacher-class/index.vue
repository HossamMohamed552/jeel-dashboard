<template>
  <section class="container-fluid custom-container">
    <ListItems :header-name="'قائمة الفصول'"
               :number-of-item="totalNumber"
               :tableItems="classesList"
               :fields-list="fieldsList"
               :v-search-model="groupSearchWord"
               @detailItem="detailItem($event)"
               @refetch="getClasses"
               :loading="loading"
               :permission_view="'show-teacher-classes'"
               />
  </section>
</template>
<script>
import ListItems from "@/components/ListItems/index.vue";
import {getClassForTeacherRequest} from "@/api/teacher-module";

export default {
  name: "index",
  components: {ListItems},
  data() {
    return {
      loading: false,
      showModal: false,
      groupSearchWord: "",
      classesList: [],
      totalNumber: null,
      fieldsList: [
        {key: "id", label: "التسلسل"},
        {key: "studyYear.name", label: this.$i18n.t('TABLE_FIELDS.studyYearName')},
        {key: "level", label: this.$i18n.t('TABLE_FIELDS.levelSchoolAdmin')},
        {key: "name", label: this.$i18n.t('TABLE_FIELDS.className')},
        {key: "student_count", label: this.$i18n.t('TABLE_FIELDS.students_count')},
        {key: "actions", label: "الإجراء"},
      ],
    }
  },
  methods: {
    getClasses(event) {
      this.loading = true
      const params = !event ? { per_page: 10 } : event;
      this.ApiService(getClassForTeacherRequest(params)).then((response) => {
        this.classesList = response.data.data
        this.totalNumber = response.data.meta.total
      }) .finally(() => {
        this.loading = false;
      });
    },
    detailItem($event) {
      this.$router.push(`/dashboard/super-class/show/${$event}`)
    },
  },
  mounted() {
    this.getClasses()
  }
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
