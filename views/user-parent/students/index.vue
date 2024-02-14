<template>
  <section class="container-fluid custom-container">
    <div class="show-role">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">{{ $t("schoolAdmin.role") }}</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="3" class="mb-4">
            <ShowItem
              class="divider-show"
              :title="$t('schoolAdmin.firstName')"
              :subtitle="userDetail.first_name"
            />
          </b-col>
          <b-col lg="3" class="mb-4">
            <ShowItem
              class="divider-show"
              :title="$t('schoolAdmin.midName')"
              :subtitle="userDetail.middle_name"
            />
          </b-col>
          <b-col lg="3" class="mb-4">
            <ShowItem
              class="divider-show"
              :title="$t('schoolAdmin.lastName')"
              :subtitle="userDetail.last_name"
            />
          </b-col>
          <b-col lg="3" class="mb-4">
            <ShowItem
              class="divider-show"
              :title="$t('schoolAdmin.status')"
              :subtitle="userDetail.status.name"
            />
          </b-col>
          <b-col lg="6" class="mb-4">
            <ShowItem
              class="divider-show"
              :title="$t('schoolAdmin.email')"
              :subtitle="userDetail.email"
            />
          </b-col>
          <b-col lg="3" class="mb-4">
            <ShowItem
              class="divider-show"
              :title="$t('schoolAdmin.mobile')"
              :subtitle="userDetail.mobile"
            />
          </b-col>
          <b-col lg="3" class="mb-4">
            <ShowItem
              class="divider-show"
              :title="$t('schoolAdmin.roleDetail')"
              :subtitle="userDetail.roles[0].name"
            />
          </b-col>
          <validation-observer class="w-100" v-slot="{ invalid }" ref="addEditSchoolClassForm">
            <form @submit.prevent="onSubmit">
              <b-row>
                <b-col lg="12">
                  <h2 class="heading mt-3">{{ $t("schoolAdmin.addStudent") }}</h2>
                </b-col>
                <b-col lg="9" class="mt-3 mb-3">
                  ikugfsdsf
                </b-col>
                <b-col lg="3" class="mt-3 mb-3">
                  <Button type="submit" :loading="loading" :disabled="invalid" custom-class="submit-btn">
                    {{ $t("GLOBAL_SAVE") }}
                  </Button>
                </b-col>
              </b-row>
            </form>
          </validation-observer>
          <b-col lg="12">
            <ListItems
              :fieldsList="fieldsList"
              :table-items="studentEnrollmentList"
              :loading="loading"
              :permission_delete="'delete-enrollment-supervisors-users'"
              @deleteItem="deleteItem($event)"
              :showSortControls="false"
              class="m-0 p-0"
            >
            </ListItems>
          </b-col>
        </b-row>
      </div>
    </div>
    <Modal
      :content-message="'حذف العنصر'"
      :content-message-question="'هل انت متأكد من حذف العنصر ؟'"
      :showModal="showModal"
      @cancel="cancel($event)"
      :is-warning="true"
      @cancelWithConfirm="cancelWithConfirm($event)"
    />
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import {
  deleteStudentEnrollmentRequest,
  deleteSupervisorEnrollmentRequest, getAllClassesRequest,
  getLevelsRequest,
  getSchoolAdminUserRequest, getStudentForParentUserRequest, getStudentsUsersRequest,
  getStudyYearsRequest,
  getSuperVisorUsersRequest,
  postStudentEnrollmentRequest,
  postSuperVisorEnrollmentRequest,
} from "@/api/school-info";
import Button from "@/components/Shared/Button/index.vue";
import TextField from "@/components/Shared/TextField/index.vue";
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import ListItems from "@/components/ListItems/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";

export default {
  name: "index",
  components: {Modal, ListItems, SelectSearch, TextField, Button, ShowItem},
  data() {
    return {
      userId: this.$route.params.id,
      userDetail: {},
      studyYears: [],
      levels: [],
      classes: [],
      enrollment: {},
      loading: false,
      studentList: [],
      fieldsList: [
        {
          key: "id",
          label: this.$i18n.t("TABLE_FIELDS.id"),
        },
        {
          key: "studyYear.name",
          label: this.$i18n.t("TABLE_FIELDS.studyYearName"),
        },
        {
          key: "class.name",
          label: this.$i18n.t("TABLE_FIELDS.class"),
        },
        {
          key: "actions",
          label: this.$i18n.t("TABLE_FIELDS.actions"),
        },
      ],
      showModal: false,
    }
  },
  watch: {
    studentList(newVal) {
      return newVal
    },
    "enrollment.level_id"(newVal){
      this.setClassesBasedOnLevel(newVal)
    }
  },
  methods: {
    setClassesBasedOnLevel($event) {
      if (this.enrollment.level_id) {
        this.ApiService(getAllClassesRequest({
          level_id: $event
        })).then((response) => {
          this.classes = response.data.data
        })
      }
    },
    getUserDetail() {
      this.ApiService(getSchoolAdminUserRequest(this.userId)).then((response) => {
        this.userDetail = response.data.data
      })
    },
    deleteItem($event) {
      this.itemId = $event;
      this.showModal = true;
    },
    cancel($event) {
      this.showModal = $event;
    },
    cancelWithConfirm() {
      this.ApiService(deleteStudentEnrollmentRequest(this.itemId)).then(() => {
        this.getStudentUsers();
      });
      this.cancel();
    },
    onSubmit() {
      this.$refs.addEditSchoolClassForm.validate().then((success) => {
        if (!success) return;
      });
      let data = {
        // level_id: this.enrollment.level_id,
        // role_id: this.userDetail.roles[0].id,
        class_id: this.enrollment.class_id,
        study_year_id: this.enrollment.study_year_id,
        user_id: this.userId,
        // school_id
      }
      this.ApiService(postStudentEnrollmentRequest(data)).then((response)=>{
        this.enrollment.level_id = ""
        this.enrollment.study_year_id = ""
        this.enrollment.class_id = ""
        this.$nextTick(() => {
          this.$refs.addEditSchoolClassForm.reset()
        })
       this.getStudentUsers()
      })
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
  },
  mounted() {
    this.getAllStudyYear()
    this.getAllLevels()
    this.getUserDetail()
    this.getStudentUsers()
  }
}
</script>
<style scoped lang="scss">

</style>
