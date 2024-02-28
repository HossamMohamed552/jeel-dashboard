<template>
  <section class="container-fluid custom-container">
    <div class="show-role adjust-height">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">تفاصيل الفصل</h2>
          </b-col>
        </b-row>
        <b-row class="divider">
          <b-col lg="3" class="mb-5">
            <ShowItem :title="$t('TABLE_FIELDS.studyYearName')" :subtitle="singleClass.studyYear.name" />
          </b-col>
          <b-col lg="3" class="mb-5">
            <ShowItem
              :title="$t('TABLE_FIELDS.levelSchoolAdmin')"
              :subtitle="singleClass.level.name"
            />
          </b-col>
          <b-col lg="3" class="mb-5">
            <ShowItem
              :title="$t('TABLE_FIELDS.className')"
              :subtitle="singleClass.name"
            />
          </b-col>
          <b-col lg="3" class="mb-5" v-if="singleClass.students_count">
            <ShowItem :title="$t('CLASS.students_count')" :subtitle="singleClass.students_count" />
          </b-col>
        </b-row>
      </div>
    </div>
    <ListItems
      class="background-transparent"
      :show-sort-controls="false"
      :header-name="'قائمه طلاب الفصل'"
      :fieldsList="fieldsList"
      :table-items="singleClass.student"
      :loading="loading"
      :disableIt="true"
      :permission_view="'show-supervisor-students'"
      @detailItem="detailItem($event)"
    >
    </ListItems>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import {getSingleClassForSuperVisorRequest, getSingleClassRequest} from "@/api/class.js";
import ListItems from "@/components/ListItems/index.vue";
export default {
  name: "index",
  components: {
    ListItems,
    ShowItem,
  },
  data() {
    return {
      loading: false,
      userSearchWord: "",
      singleClass: {},
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
          key: "status.key",
          label: this.$i18n.t("TABLE_FIELDS.status"),
        },
        {
          key: "actions",
          label: this.$i18n.t("TABLE_FIELDS.actions"),
        },
      ],
    };
  },
  methods:{
    detailItem($event){
      this.$router.push(`/dashboard/super-student/show/${$event}`)
    }
  },
  mounted() {
    this.ApiService(getSingleClassForSuperVisorRequest(this.$route.params.id)).then(
      (response) => {
        this.singleClass = response.data.data;
      }
    );
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
