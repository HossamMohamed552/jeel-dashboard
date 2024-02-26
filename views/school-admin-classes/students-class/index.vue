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
            <ShowItem class="divider-show" :title="$t('schoolAdmin.studyYear')"
                      :subtitle="classItem.studyYear.name"/>
          </b-col>
          <b-col lg="4" class="mb-5">
            <ShowItem class="divider-show" :title="$t('schoolAdmin.level')"
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
                      placeholder="ادخل اسم الطالب"
                      :options="studentList"
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
            <ListItems
              :fieldsList="fieldsList"
              :table-items="classItem.student"
              :disableIt="true"
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
import {
  getAllStudentUsersRequest,
  getClassByIdRequest,
  postStudentEnrollmentRequest
} from "@/api/school-info";
import ListItems from "@/components/ListItems/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";

export default {
  name: "index",
  components: {SelectSearch, Button, ListItems, ShowItem},
  data() {
    return {
      classItem: {},
      studentList: [],
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
          key: "status.key",
          label: this.$i18n.t("TABLE_FIELDS.status"),
        },
        {
          key: "actions",
          label: this.$i18n.t("TABLE_FIELDS.actions"),
        },
      ],
      enrollment: {
        student_id: ""
      }
    };
  },
  methods: {
    getAllStudents() {
      this.ApiService(getAllStudentUsersRequest()).then((response) => {
        this.studentList = response.data.data;
      })
        .finally(() => {
          this.loading = false;
        });
    },
    getClassDetail() {
      this.ApiService(getClassByIdRequest(this.$route.params.id)).then((response) => {
        this.classItem = response.data.data;
      });
    },
    onSubmit() {
      this.$refs.addEditSchoolClassForm.validate().then((success) => {
        if (!success) return;
      });
      let data = {
        class_id: this.$route.params.id,
        user_id: this.enrollment.student_id,
        study_year_id: this.classItem.studyYear.id
      }
      this.ApiService(postStudentEnrollmentRequest(data)).then((response) => {
        this.enrollment.user_id = ""
        this.$nextTick(() => {
          this.$refs.addEditSchoolClassForm.reset()
        })
        this.getClassDetail()
      })
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
