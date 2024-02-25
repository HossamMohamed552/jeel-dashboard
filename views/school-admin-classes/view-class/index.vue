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
            <ShowItem class="divider-show" :title="$t('schoolAdmin.studyYear')" :subtitle="classItem.studyYear.name" />
          </b-col>
          <b-col lg="4" class="mb-5">
            <ShowItem class="divider-show" :title="$t('schoolAdmin.level')" :subtitle="classItem.level.name" />
          </b-col>
          <b-col lg="4" class="mb-5">
            <ShowItem class="divider-show" :title="$t('schoolAdmin.className')" :subtitle="classItem.name" />
          </b-col>
          <b-col lg="12">
            <ListItems
              :fieldsList="fieldsList"
              :table-items="classItem.student"
              :loading="loading"
              :permission_delete="'delete-enrollment-supervisors-users'"
              @deleteItem="deleteItem($event)"
              :showSortControls="false"
              class="m-0 p-0"
            >
            </ListItems>
          </b-col>
<!--          <b-col lg="4" class="mb-5">-->
<!--            <ShowItem class="divider-show" :title="$t('schoolAdmin.schoolName')" :subtitle="classItem.school.name" />-->
<!--          </b-col>-->
<!--          <b-col lg="4">-->
<!--            <ShowItem class="divider-show" :title="$t('schoolAdmin.students_count')" :subtitle="classItem.student_count" />-->
<!--          </b-col>-->
        </b-row>
      </div>
    </div>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import {getClassByIdRequest} from "@/api/school-info";
import ListItems from "@/components/ListItems/index.vue";

export default {
  name: "index",
  components: {ListItems, ShowItem},
  data() {
    return {
      classItem: {},
      loading: false,
      fieldsList: [
        {
          key: "id",
          label: this.$i18n.t("TABLE_FIELDS.id"),
        },
        {
          key: "image",
          label: this.$i18n.t("TABLE_FIELDS.image"),
        },
        {
          key: "first_name",
          label: this.$i18n.t("TABLE_FIELDS.first_name"),
        },
        {
          key: "middle_name",
          label: this.$i18n.t("TABLE_FIELDS.middle_name"),
        },
        {
          key: "last_name",
          label: this.$i18n.t("TABLE_FIELDS.last_name"),
        },
        {
          key: "email",
          label: this.$i18n.t("USERS.name"),
        },
        {
          key: "user_religion.name",
          label: this.$i18n.t("USERS.religion"),
        },
        {
          key: "actions",
          label: this.$i18n.t("TABLE_FIELDS.actions"),
        },
      ],
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
