<template>
  <section class="container-fluid custom-container">
    <div class="show-role">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">إضافة طالب إلى ولى الأمر</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="3" class="mb-4">
            <ShowItem
              class="divider-show"
              :title="$t('schoolAdmin.firstName')"
              :subtitle="singleUser.first_name"
            />
          </b-col>
          <b-col lg="3" class="mb-4">
            <ShowItem
              class="divider-show"
              :title="$t('schoolAdmin.midName')"
              :subtitle="singleUser.middle_name"
            />
          </b-col>
          <b-col lg="3" class="mb-4">
            <ShowItem
              class="divider-show"
              :title="$t('schoolAdmin.lastName')"
              :subtitle="singleUser.last_name"
            />
          </b-col>
          <b-col lg="3" class="mb-4" v-if="singleUser && singleUser.status">
            <ShowItem
              class="divider-show"
              :title="$t('schoolAdmin.status')"
              :subtitle="singleUser.status.name"
            />
          </b-col>
          <b-col lg="6" class="mb-4">
            <ShowItem
              class="divider-show"
              :title="$t('schoolAdmin.email')"
              :subtitle="singleUser.email"
            />
          </b-col>
          <b-col lg="3" class="mb-4">
            <ShowItem
              class="divider-show"
              :title="$t('schoolAdmin.mobile')"
              :subtitle="singleUser.mobile"
            />
          </b-col>
          <b-col lg="3" class="mb-4" v-if="singleUser && singleUser?.roles?.[0]">
            <ShowItem
              class="divider-show"
              :title="$t('schoolAdmin.roleDetail')"
              :subtitle="singleUser?.roles?.[0].name"
            />
          </b-col>
          <validation-observer class="w-100 px-3" v-slot="{ invalid }" ref="addEditSchoolClassForm">
            <form @submit.prevent="onSubmit">
              <b-row>
                <b-col lg="12">
                  <h2 class="heading mt-3">{{ $t("schoolAdmin.addStudent") }}</h2>
                </b-col>
                <b-col lg="10">
                  <SelectSearch
                    v-model="enrollment.student_id"
                    :label="$t('schoolAdmin.selectStudent')"
                    :name="$t('schoolAdmin.selectStudent')"
                    :placeholder="$t('schoolAdmin.selectStudent')"
                    :options="studentList"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                  ></SelectSearch>
                </b-col>
                <b-col lg="2" class="mt-3 mb-3">
                  <Button type="submit" :loading="loading" :disabled="invalid"
                          custom-class="submit-btn margin-0">
                    {{ $t("GLOBAL_SAVE") }}
                  </Button>
                </b-col>
              </b-row>
            </form>
          </validation-observer>
          <b-col lg="12">
            <ListItems
              :fieldsList="fieldsList"
              :table-items="singleUser.students"
              :loading="loading"
              :permission_delete="'delete-enrollment-students-parents-users'"
              @deleteItem="deleteItem($event)"
              :showSortControls="false"
              :disableIt="true"
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
  deleteStudentEnrollmentRequest, deleteStudentParentEnrollmentRequest,
  deleteSupervisorEnrollmentRequest, getAllClassesRequest, getAllStudentUsersListTrueRequest,
  getLevelsRequest,
  getSchoolAdminUserRequest, getStudentForParentUserRequest, getStudentsUsersRequest,
  getStudyYearsRequest,
  getSuperVisorUsersRequest,
  postStudentEnrollmentRequest, postStudentForParentRequest,
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
      singleUser: {},
      loading: false,
      studentList: [],
      enrollment: {
        student_id: "",
        parent_id: Number(this.$route.params.id)
      },
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
          key: "last_name",
          label: this.$i18n.t("TABLE_FIELDS.last_name"),
        },
        {
          key: "email",
          label: this.$i18n.t("USERS.name"),
        },
        {
          key: "class.level.name",
          label: this.$i18n.t("schoolAdmin.level"),
        },
        {
          key: "class.name",
          label: this.$i18n.t("schoolAdmin.class"),
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
      showModal: false,
    }
  },
  watch: {
    "singleUser"(newVal) {
      return newVal
    },
  },
  methods: {
    getStudentsForParent() {
      this.ApiService(getStudentForParentUserRequest(this.$route.params.id)).then((response) => {
        this.singleUser = response.data.data
      })
    },

    getAllStudentUsers() {
      this.ApiService(getAllStudentUsersListTrueRequest()).then((response) => {
        this.studentList = response.data.data
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
      this.ApiService(deleteStudentParentEnrollmentRequest(this.itemId)).then(() => {
        this.getStudentsForParent();
      });
      this.cancel();
    },
    onSubmit() {
      this.$refs.addEditSchoolClassForm.validate().then((success) => {
        if (!success) return;
      });
      this.ApiService(postStudentForParentRequest(this.enrollment)).then((response) => {
        this.$nextTick(() => {
          this.student_id = []
          this.$refs.addEditSchoolClassForm.reset()
        })
        this.getStudentsForParent()
      })
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
  },
  mounted() {
    this.getStudentsForParent()
    this.getAllStudentUsers()
  }
}
</script>
<style scoped lang="scss">

</style>
