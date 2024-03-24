<template>
  <section class="container-fluid custom-container">
    <div class="show-role">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">{{ $t("superVisor.studentData") }}</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="2">
            <b-row>
              <b-col lg="12" class="img-container">
                <img class="w-100"
                     :src="studentObject.avatar ? studentObject.avatar :'@/assets/images/icons/user-avatar.png'"
                     @error="altImage($event)"/>
              </b-col>
            </b-row>
          </b-col>
          <b-col lg="10">
            <b-row class="divider">
              <b-col lg="3">
                <ShowItem :title="$t('teacher.teacherName')" :subtitle="studentObject.email"/>
              </b-col>
              <b-col lg="3">
                <ShowItem :title="$t('teacher.firstName')" :subtitle="studentObject.first_name"/>
              </b-col>
              <b-col lg="3">
                <ShowItem :title="$t('teacher.middle_name')" :subtitle="studentObject.middle_name"/>
              </b-col>
              <b-col lg="3">
                <ShowItem :title="$t('teacher.lastName')" :subtitle="studentObject.last_name"/>
              </b-col>
            </b-row>
          </b-col>
          <b-col lg="12" class="mt-5">
            <ListItems
              class="m-0 p-0"
              :header-name="'قائمة المهام الدراسية'"
              :fieldsList="fieldsList"
              :number-of-item="totalNumber"
              :table-items="missions"
              :v-search-model="missionSearchWord"
              :loading="loading"
              @detailItem="detailItem($event)"
              @refetch="getMissionsPerStudent"
              :permission_view="'show-users'"
            >
            </ListItems>
          </b-col>
        </b-row>
      </div>
    </div>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import ListItems from "@/components/ListItems/index.vue";
import TextField from "@/components/Shared/TextField/index.vue";
import ScholasticData from "@/components/SuperVisor/ScholasticData/index.vue";
import DailyLogin from "@/components/SuperVisor/DailyLogin/index.vue";
import {getMissionsPerStudentForTeacherRequest, getStudentForTeacher} from "@/api/teacher-module";

export default {
  name: "index",
  components: {
    TextField,
    ShowItem,
    ListItems,
    ScholasticData,
    DailyLogin
  },
  data() {
    return {
      studentObject: {},
      activeTap: 1,
      missions:[],
      totalNumber: 0,
      loading: false,
      fieldsList: [
        {
          key: "id",
          label: this.$i18n.t("TABLE_FIELDS.id"),
        },
        {
          key: "name",
          label: this.$i18n.t("TABLE_FIELDS.name"),
        },
        {
          key: "start_date",
          label: this.$i18n.t("TABLE_FIELDS.start_date"),
        },
        {
          key: "end_date",
          label: this.$i18n.t("TABLE_FIELDS.end_date"),
        },
        {
          key: "percentage_mission",
          label: this.$i18n.t("TABLE_FIELDS.percentage_mission"),
        },
        {
          key: "missionContent",
          label: this.$i18n.t("TABLE_FIELDS.missionContent"),
        },
      ],
      missionSearchWord:""
    };
  },
  methods: {
    altImage($event) {
      $event.target.src = require("@/assets/images/icons/user-avatar.png")
    },
    getMissionsPerStudent($event){
      this.ApiService(getMissionsPerStudentForTeacherRequest(this.$route.params.id,$event)).then((response) => {
        this.missions = response.data.data;
        this.totalNumber = response.data.meta.total
      });
    },
    detailItem($event){
      this.$router.push(`/dashboard/teacher/missions-student/show/${this.$route.params.id}/${$event}`)
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  mounted() {
    this.ApiService(getStudentForTeacher(this.$route.params.id)).then((response) => {
      this.studentObject = response.data.data;
    });
    this.getMissionsPerStudent()
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
