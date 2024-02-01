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
                <b-col lg="3" class="mt-3 mb-3">
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
                <b-col lg="3" class="mt-3 mb-3">
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
                <b-col lg="3" class="mt-3 mb-3">
                  <div class="hold-field" v-if="classes">
                    <SelectSearch
                      v-model="enrollment.class_id"
                      :label="$t('schoolAdmin.className')"
                      :name="$t('schoolAdmin.className')"
                      :placeholder="$t('schoolAdmin.className_PLACEHOLDER')"
                      :options="classes"
                      :reduce="(option) => option.id"
                      :get-option-label="(option) => option.name"
                      :rules="'required'"
                    ></SelectSearch>
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <div class="hold-btns-form">
                  <Button @click="handleCancel" custom-class="cancel-btn margin">
                    {{ $t("GLOBAL_CANCEL") }}
                  </Button>
                  <Button
                    type="submit"
                    :loading="loading"
                    :disabled="invalid"
                    custom-class="submit-btn"
                  >
                    {{ $t("GLOBAL_SAVE") }}
                  </Button>
                </div>
              </b-row>
            </form>
          </validation-observer>
        </b-row>
      </div>
    </div>
  </section>
</template>
<script>
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import {
  getAllClassesRequest,
  getLevelsRequest,
  getSchoolAdminUserRequest,
  getStudyYearsRequest,
  postTeacherEnrollmentRequest
} from "@/api/school-info";
import Button from "@/components/Shared/Button/index.vue";
import TextField from "@/components/Shared/TextField/index.vue";
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";

export default {
  name: "index",
  components: {SelectSearch, TextField, Button, ShowItem},
  data() {
    return {
      userId: this.$route.params.id,
      userDetail: {},
      studyYears: [],
      levels: [],
      classes: [],
      enrollment: {},
      loading: false,
    }
  },
  methods: {
    getAllClasses(){
      this.ApiService(getAllClassesRequest()).then((response)=>{
        this.classes = response.data.data
      })
    },
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
    onSubmit() {
      this.$refs.addEditSchoolClassForm.validate().then((success) => {
        if (!success) return;
      });
      let data = {
        level_id: this.enrollment.level_id,
        role_id: this.userDetail.roles[0].id,
        class_id: this.enrollment.class_id,
        study_year_id: this.enrollment.study_year_id,
        user_id: this.userId,
      }
      this.ApiService(postTeacherEnrollmentRequest(data)).then((response)=>{
        console.log(response.data.data)
      })
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
  },
  mounted() {
    this.getAllStudyYear()
    this.getAllClasses()
    this.getAllLevels()
    this.getUserDetail()
  }
}
</script>
<style scoped lang="scss">

</style>
