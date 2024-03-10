<template>
  <section class="container-fluid custom-container">
    <ListItems :header-name="'قائمة الصفوف الدراسية'"
               :number-of-item="totalNumber"
               :tableItems="levelList"
               :fields-list="fieldsList"
               :v-search-model="groupSearchWord"
               @detailItem="detailItem($event)"
               @deleteItem="deleteItem($event)"
               @refetch="getLevels"
               :loading="loading"
               :permission_view="'show-teacher-levels'"
               />
  </section>
</template>
<script>
import ListItems from "@/components/ListItems/index.vue";
import {deleteClassRequest, getClassForSuperRequest, getClassRequest} from "@/api/class";
import {getLevelsForSuperVisorRequest} from "@/api/level";
import {getLevelsForTeacherRequest} from "@/api/teacher-module";

export default {
  name: "index",
  components: {ListItems},
  data() {
    return {
      loading: false,
      showModal: false,
      groupSearchWord: "",
      levelList: [],
      totalNumber: null,
      fieldsList: [
        {key: "id", label: "التسلسل"},
        {key: "studyYear.name", label: this.$i18n.t('TABLE_FIELDS.studyYearName')},
        {key: "level", label: this.$i18n.t('TABLE_FIELDS.levelSchoolAdmin')},
        {key: "classes", label: this.$i18n.t('TABLE_FIELDS.classes_count')},
        {key: "actions", label: "الإجراء"},
      ],
    }
  },
  methods: {
    getLevels(event) {
      this.loading = true
      const params = !event ? { per_page: 10 } : event;
      this.ApiService(getLevelsForTeacherRequest(params)).then((response) => {
        this.levelList = response.data.data
        this.totalNumber = response.data.meta.total
      }) .finally(() => {
        this.loading = false;
      });
    },
    detailItem($event) {
      this.$router.push(`/dashboard/teacher-level/show/${$event}`)
    },
    deleteItem($event) {
      this.itemId = $event
      this.showModal = true
    },
    cancel($event) {
      this.showModal = $event
    },
    cancelWithConfirm() {
      this.ApiService(deleteClassRequest(this.itemId)).then(() => {
        this.getLevels()
      })
      this.cancel()
    }
  },
  mounted() {
    this.getLevels()
  }
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
