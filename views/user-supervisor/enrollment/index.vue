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
                  <h2 class="heading mt-3">{{ $t("schoolAdmin.addRole") }}</h2>
                </b-col>
                <b-col lg="5" >
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
                <b-col lg="5">
                  <div class="hold-field" v-if="levels">
                    <SelectSearch
                      v-model="enrollment.level_id"
                      :label="$t('schoolAdmin.level')"
                      :name="$t('schoolAdmin.level')"
                      placeholder="أختر الصف الدراسي"
                      :options="levels"
                      :reduce="(option) => option.id"
                      :get-option-label="(option) => option.name"
                      :rules="'required'"
                    ></SelectSearch>
                  </div>
                </b-col>
                <b-col lg="2" class="mt-3">
                  <Button
                    type="submit"
                    :loading="loading"
                    :disabled="invalid"
                    custom-class="submit-btn margin-0"
                  >
                    {{ $t("GLOBAL_SAVE") }}
                  </Button>
<!--                  <div >-->
<!--                    <Button @click="handleCancel" custom-class="cancel-btn margin">-->
<!--                      {{ $t("GLOBAL_CANCEL") }}-->
<!--                    </Button>-->

<!--                  </div>-->
                </b-col>
              </b-row>
            </form>
          </validation-observer>
          <b-col lg="12">
            <ListItems
              :fieldsList="fieldsList"
              :table-items="supervisorEnrollmentList"
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
  deleteSupervisorEnrollmentRequest,
  getLevelsRequest,
  getSchoolAdminUserRequest,
  getStudyYearsRequest, getSuperVisorUsersRequest, postSuperVisorEnrollmentRequest,
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
      enrollment: {},
      loading: false,
      supervisorEnrollmentList: [],
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
          key: "level.name",
          label: this.$i18n.t("TABLE_FIELDS.level"),
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
    supervisorEnrollmentList(newVal) {
      return newVal
    }
  },
  methods: {
    getAllStudyYear(){
      this.ApiService(getStudyYearsRequest()).then((response)=>{
        this.studyYears = response.data.data
      })
    },
    getAllLevels(){
      this.ApiService(getLevelsRequest()).then((response)=>{
        this.levels = response.data.data
      })
    },
    getUserDetail() {
      this.ApiService(getSchoolAdminUserRequest(this.userId)).then((response) => {
        this.userDetail = response.data.data
      })
    },
    getSuperVisorUsers() {
      this.ApiService(getSuperVisorUsersRequest(this.userId)).then((response) => {
        this.supervisorEnrollmentList = response.data.data
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
      this.ApiService(deleteSupervisorEnrollmentRequest(this.itemId)).then(() => {
        this.getSuperVisorUsers();
      });
      this.cancel();
    },
    onSubmit() {
      this.$refs.addEditSchoolClassForm.validate().then((success) => {
        if (!success) return;
      });
      let data = {
        level_id: this.enrollment.level_id,
        role_id: this.userDetail.roles[0].id,
        study_year_id: this.enrollment.study_year_id,
        user_id: this.userId,
      }
      this.ApiService(postSuperVisorEnrollmentRequest(data)).then((response)=>{
        this.enrollment.level_id = ""
        this.enrollment.study_year_id = ""
        this.$nextTick(() => {
          this.$refs.addEditSchoolClassForm.reset()
        })
       this.getSuperVisorUsers()
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
    this.getSuperVisorUsers()
  }
}
</script>
<style scoped lang="scss">

</style>
