<template>
  <section class="container-fluid custom-container">
    <div class="show-role">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <h2 class="heading">{{ $t("schoolAdmin.addStudentClassDETAILS") }}</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="4" class="mb-5">
            <ShowItem v-if="classItem?.studyYear" class="divider-show"
                      :title="$t('schoolAdmin.studyYear')"
                      :subtitle="classItem?.studyYear?.name"/>
          </b-col>
          <b-col lg="4" class="mb-5">
            <ShowItem v-if="classItem.level" class="divider-show" :title="$t('schoolAdmin.level')"
                      :subtitle="classItem.level.name"/>
          </b-col>
          <b-col lg="4" class="mb-5">
            <ShowItem class="divider-show" :title="$t('schoolAdmin.className')"
                      :subtitle="classItem.name"/>
          </b-col>
          <validation-observer class="w-100 px-3" v-slot="{ invalid }" ref="addEditSchoolClassForm">
            <form @submit.prevent="onSubmit">
              <b-row>
                <b-col lg="12">
                  <h2 class="heading mt-3">{{ $t("schoolAdmin.studentName") }}</h2>
                </b-col>
                <b-col lg="10" class="">
                  <div class="hold-field" v-if="getAllStudents">
                    <SelectSearch
                      v-model="enrollment.student_id"
                      :label="$t('schoolAdmin.studentName')"
                      :name="$t('schoolAdmin.studentName')"
                      :placeholder="$t('teacher.enterStudentName')"
                      :options="studentList"
                      :reduce="(option) => option.id"
                      :get-option-label="(option) => option.name"
                      :rules="'required'"
                      multiple
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
            </form>
          </validation-observer>
          <b-col lg="12">
            <ListItems
              :fieldsList="fieldsList"
              :table-items="classItem.student"
              :disableIt="true"
              :notHidePagination="false"
              :loading="loading"
              :permission_delete="'delete-enrollment-supervisors-users'"
              :showSortControls="false"
              class="m-0 p-0"
              @deleteItem="deleteItem($event)"
            >
              <!--              @deleteItem="deleteItem($event)"-->
            </ListItems>
          </b-col>
        </b-row>
      </div>
    </div>
    <Modal :content-message="$t('CONTROLS.add_successfully')" :showModal="showModalSuccess"
           :is-success="true"/>
    <Modal
      :content-message="$t('CONTROLS.studentAlreadyAdd')"
      :showModal="showModalAlreadyAdd"
      :info="true"
      @cancel="showModalAlreadyAdd=false"
      @cancelWithConfirm="cancelWithConfirmAlreadyAdd($event)"
    />
    <Modal
      :content-message="$t('CONTROLS.studentInClass',{className:selectStudent?.class?.name})"
      :content-message-question="$t('CONTROLS.transferStudent')"
      :showModal="showModalChangeClass"
      @cancel="showModalChangeClass=false"
      :info="true"
      :infoWithConfirm="true"
      @cancelWithConfirm="cancelWithConfirmChangeClass($event)"
    />
    <Modal
      :content-message="$t('CONTROLS.remove_student')"
      :content-message-question="$t('CONTROLS.remove_student_paragraph')"
      :showModal="removeStudentModal"
      @cancel="cancel($event)"
      :is-warning="true"
      @cancelWithConfirm="cancelWithConfirm($event)"
    />
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import {
  deleteSchoolAdminClassRequest, deleteStudentFromClassByIdRequest,
  getAllStudentUsersRequest,
  getClassByIdRequest,
  postStudentEnrollmentRequest
} from "@/api/school-info";
import ListItems from "@/components/ListItems/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import {log} from "video.js";

export default {
  name: "index",
  components: {Modal, SelectSearch, Button, ListItems, ShowItem},
  data() {
    return {
      classItem: {},
      selectStudent: {},
      studentList: [],
      loading: false,
      showModalAlreadyAdd: false,
      showModalChangeClass: false,
      showModalSuccess: false,
      removeStudentModal: false,
      itemId: null,
      fieldsList: [
        {
          key: "vid",
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
      enrollment: {
        student_id: []
      }
    };
  },
  watch: {
    "enrollment.student_id"(newId) {
      this.selectStudentFromList(newId)
    }
  },
  methods: {
    deleteItem($event) {
      this.itemId = $event;
      this.removeStudentModal = true;
    },
    cancel($event) {
      this.removeStudentModal = $event;
    },
    cancelWithConfirm() {
      this.ApiService(deleteStudentFromClassByIdRequest(this.itemId,this.$route.params.id)).then(() => {
        this.getClassDetail()
        this.getAllStudents()
      });
      this.cancel();
    },
    selectStudentFromList(selectStudent) {
      this.selectStudent = this.studentList.filter((item) => {
        return item.id === selectStudent
      })
      // [0]
    },
    getAllStudents() {
      this.ApiService(getAllStudentUsersRequest({
        list_all: true,
        without_class: true
      })).then((response) => {
        this.studentList = response.data.data;
      }).finally(() => {
        this.loading = false;
      });
    },
    getClassDetail() {
      this.ApiService(getClassByIdRequest(this.$route.params.id)).then((response) => {
        this.classItem = response.data.data;
      });
    },
    cancelWithConfirmAlreadyAdd($event) {
      this.showModalAlreadyAdd = $event
    },
    cancelWithConfirmChangeClass($event) {
      let data = {
        class_id: this.$route.params.id,
        user_id: this.enrollment.student_id,
        study_year_id: this.classItem.studyYear.id
      }
      this.addStudentOnClass(data)
      this.showModalChangeClass = $event
    },
    addStudentOnClass(data) {
      this.ApiService(postStudentEnrollmentRequest(data)).then((response) => {
        this.showModalSuccess = true
        this.getClassDetail()
        this.getAllStudents()
        this.enrollment.student_id = ""
        this.$nextTick(() => {
          this.$refs.addEditSchoolClassForm.reset()
        })
        setTimeout(() => {
          this.showModalSuccess = false
        }, 500)
      })
    },
    onSubmit() {
      this.$refs.addEditSchoolClassForm.validate().then((success) => {
        if (!success) return;
      });
      let data = {
        class_id: this.$route.params.id,
        users: this.enrollment.student_id,
        study_year_id: this.classItem.studyYear.id
      }
      if (this.selectStudent.class && (this.classItem.id === this.selectStudent.class.id)) {
        this.showModalAlreadyAdd = true
      } else if (this.selectStudent.class && (this.classItem.id !== this.selectStudent.class.id)) {
        this.showModalChangeClass = true
      } else {
        this.addStudentOnClass(data)
      }
    },
  },
  mounted() {
    this.getClassDetail()
    this.getAllStudents()
  },
}
</script>
<style scoped lang="scss">

</style>
