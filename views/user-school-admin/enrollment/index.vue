<template>
  <section class="container-fluid custom-container fix-display">
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
          <b-col lg="3" class="mb-4" v-if="userDetail &&  userDetail.status">
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
          <b-col lg="3" class="mb-4" v-if="userDetail && userDetail.roles">
            <ShowItem
              class="divider-show"
              :title="$t('schoolAdmin.roleDetail')"
              :subtitle="userDetail.roles[0].name"
            />
          </b-col>
          <validation-observer class="w-100 px-2" v-slot="{ invalid }" ref="addEditSchoolClassForm">
            <form @submit.prevent="onSubmit">
              <b-row>
                <b-col lg="12">
                  <h2 class="heading mt-3">{{ $t("schoolAdmin.addRole") }}</h2>
                </b-col>
                <b-col lg="10" class="">
                  <div class="hold-field" v-if="studyYears">
                    <SelectSearch
                      v-model="enrollment.study_year_id"
                      :label="$t('schoolAdmin.studyYear')"
                      :name="$t('schoolAdmin.studyYear')"
                      placeholder="اختر العام الدراسى"
                      :options="studyYears"
                      :reduce="(option) => option.id"
                      :get-option-label="(option) => option.name"
                      :rules="'required'"
                    ></SelectSearch>
                  </div>
                </b-col>
                <b-col lg="2" class="d-flex justify-content-start align-items-end">
                  <Button
                    type="submit"
                    :loading="loading"
                    :disabled="invalid"
                    custom-class="submit-btn margin-0-all"
                  >
                    {{ $t("GLOBAL_SAVE") }}
                  </Button>
                </b-col>
              </b-row>
              <b-row>
                <div class="hold-btns-form">
<!--                  <Button @click="handleCancel" custom-class="cancel-btn margin">-->
<!--                    {{ $t("GLOBAL_CANCEL") }}-->
<!--                  </Button>-->

                </div>
              </b-row>
            </form>
          </validation-observer>
          <b-col lg="12">
            <h2 class="heading m-0">{{ $t("schoolAdmin.studyYearsList") }}</h2>
          </b-col>
          <b-col lg="12">
            <ListItems
              :fieldsList="fieldsList"
              :table-items="schoolAdminEnrollmentList"
              :loading="loading"
              :permission_delete="'delete-enrollment-schooladmins-users'"
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
  deleteSchoolAdminEnrollmentRequest,
  getAllClassesRequest,
  getLevelsRequest,
  getSchoolAdminUserRequest, getSchoolAdminUsersRequest,
  getStudyYearsRequest, postSchoolAdminEnrollmentRequest,
  postTeacherEnrollmentRequest
} from "@/api/school-info";
import Button from "@/components/Shared/Button/index.vue";
import TextField from "@/components/Shared/TextField/index.vue";
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import ListItems from "@/components/ListItems/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import {deleteBloomRequest} from "@/api/bloom";

export default {
  name: "index",
  components: {Modal, ListItems, SelectSearch, TextField, Button, ShowItem},
  data() {
    return {
      userId: this.$route.params.id,
      userDetail: {},
      studyYears: [],
      enrollment: {},
      loading: false,
      schoolAdminEnrollmentList: [],
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
          key: "actions",
          label: this.$i18n.t("TABLE_FIELDS.actions"),
        },
      ],
      showModal: false,
    }
  },
  watch: {
    schoolAdminEnrollmentList(newVal) {
      return newVal
    }
  },
  methods: {
    getAllStudyYear() {
      this.ApiService(getStudyYearsRequest()).then((response) => {
        this.studyYears = response.data.data
      })
    },
    getUserDetail() {
      this.ApiService(getSchoolAdminUserRequest(this.userId)).then((response) => {
        this.userDetail = response.data.data
      })
    },
    getSchoolAdminUsers() {
      this.ApiService(getSchoolAdminUsersRequest(this.userId)).then((response) => {
        this.schoolAdminEnrollmentList = response.data.data
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
      this.ApiService(deleteSchoolAdminEnrollmentRequest(this.itemId)).then(() => {
        this.getSchoolAdminUsers();
      });
      this.cancel();
    },
    onSubmit() {
      this.$refs.addEditSchoolClassForm.validate().then((success) => {
        if (!success) return;
      });
      let data = {
        role_id: this.userDetail.roles[0].id,
        study_year_id: this.enrollment.study_year_id,
        user_id: this.userId,
      }
      this.ApiService(postSchoolAdminEnrollmentRequest(data)).then(() => {
      }).then(() => {
        this.enrollment.study_year_id = ""
        this.$nextTick(() => {
          this.$refs.addEditSchoolClassForm.reset()
        })
        this.getSchoolAdminUsers()
      })
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
  },
  mounted() {
    this.getAllStudyYear()
    this.getUserDetail()
    this.getSchoolAdminUsers()
  }
}
</script>
<style scoped lang="scss">
@import "./index";
</style>
