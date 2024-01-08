<template>
  <section class="container-fluid custom-container">
    <div class="show-role">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">{{ $t("teacher.data") }}</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="2">
            <b-row>
              <b-col lg="12" class="img-container">
                <img class="w-100" :src="teacherObject.avatar" @error="altImage($event)"/>
              </b-col>
            </b-row>
          </b-col>
          <b-col lg="10">
            <b-row class="divider">
              <b-col lg="4">
                <ShowItem :title="$t('teacher.teacherName')" :subtitle="teacherObject.name"/>
              </b-col>
              <b-col lg="4">
                <ShowItem :title="$t('teacher.firstName')" :subtitle="teacherObject.first_name"/>
              </b-col>
              <b-col lg="4">
                <ShowItem :title="$t('teacher.lastName')" :subtitle="teacherObject.last_name"/>
              </b-col>
            </b-row>
            <b-row class="divider">
              <b-col lg="4" class="mt-4" v-if="teacherObject && teacherObject.roles">
                <ShowItem :title="$t('teacher.role')" :subtitle="teacherObject.roles[0].name"/>
              </b-col>
              <b-col lg="4" class="mt-4">
                <ShowItem :title="$t('teacher.mobile')" :subtitle="teacherObject.mobile"/>
              </b-col>
              <b-col lg="4" class="mt-4">
                <ShowItem :title="$t('teacher.email')" :subtitle="teacherObject.email"/>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="12" class="mt-4">
                <ShowItem :title="$t('teacher.social_media')"
                          :subtitle="teacherObject.social_media"/>
              </b-col>
            </b-row>
          </b-col>
          <b-col lg="12" class="hold-taps">
            <div class="taps">
              <div
                @click="activeTapStatus(1)"
                :class="activeTap === 1 ? 'active' : ''"
                class="tap"
              >
                بيانات التعين
              </div>
              <div
                @click="activeTapStatus(2)"
                :class="activeTap === 2 ? 'active' : ''"
                class="tap"
              >
                الفصول
              </div>
            </div>
            <div class="content">
              <b-row v-show="activeTap === 1">
                <b-col lg="4">
                  <ShowItem :title="$t('teacher.school')" :subtitle="user.school.name"/>
                </b-col>
                <b-col lg="4">
                  <ShowItem :title="$t('teacher.enrollment_school_date')"
                            :subtitle="enrollmentDate"/>
                </b-col>

              </b-row>
              <div class="col-12 px-0" v-show="activeTap === 2">
                <div v-if="classes">
                  <ListItems
                    class="m-0 p-0"
                    :showSortControls=false
                    :fieldsList="fieldsList"
                    :table-items="classes"
                    :loading="loading"
                    @refetch="getAllClasses"
                    @detailItem="detailItem($event)"
                    :permission_delete="'delete-classes'"
                    :permission_edit="'edit-classes'"
                    :permission_view="'show-terms'"
                  >
                  </ListItems>
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </div>
    </div>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import {getSingleUserRequest} from "@/api/user";
import {getClassRequest} from "@/api/class";
import ListItems from "@/components/ListItems/index.vue";

export default {
  name: "index",
  components: {
    ShowItem,
    ListItems
  },
  data() {
    return {
      teacherObject: {},
      activeTap: 1,
      enrollmentDate: null,
      totalNumber: 0,
      loading: false,
      classes: [],
      fieldsList: [
        {
          key: "id",
          label: this.$i18n.t("TABLE_FIELDS.id"),
        },
        {key: "term.name", label: this.$i18n.t('TABLE_FIELDS.superTerm')},
        {key: "name", label: this.$i18n.t('TABLE_FIELDS.superClass')},
        {key: "level.name", label: this.$i18n.t('TABLE_FIELDS.superLevel')},
        {key: "students_count", label: this.$i18n.t('TABLE_FIELDS.students_count')},
        {
          key: "actions",
          label: this.$i18n.t("TABLE_FIELDS.actions"),
        },
      ],
    };
  },
  methods: {
    altImage($event) {
      $event.target.src = require("@/assets/images/icons/user-avatar.png")
    },
    activeTapStatus(id) {
      this.activeTap = id
    },
    detailItem($event) {
      this.$router.push(`/dashboard/terms/show/${$event}`)
    },
    getAllClasses() {
      this.ApiService(getClassRequest({user_id: this.$route.params.id})).then((response) => {
        this.classes = response.data.data
      })
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  mounted() {
    this.ApiService(getSingleUserRequest(this.$route.params.id)).then((response) => {
      this.teacherObject = response.data.data;
      let date = new Date(this.teacherObject.enrollment_school_date)
      this.enrollmentDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    });
    this.getAllClasses()
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
