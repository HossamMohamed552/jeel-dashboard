<template>
  <div class="add-edit-school-admin-class">
    <div class="container-fluid custom-container">
      <div class="add-edit-school-admin-class-form">
        <h3>
          {{ classId ? $t("schoolAdmin.editClass") : $t("schoolAdmin.addClass") }}
        </h3>
        <validation-observer v-slot="{ invalid }" ref="addEditSchoolClassForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="4" class="mt-3 mb-3">
                <div class="hold-field" v-if="studyYears">
                  <SelectSearch
                    v-model="classItem.study_year_id"
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
              <b-col lg="4" class="mt-3 mb-3">
                <div class="hold-field" v-if="levels">
                  <SelectSearch
                    v-model="classItem.level_id"
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
              <b-col lg="4" class="mb-3">
                <TextField
                  v-model="classItem.name"
                  :label="$t('schoolAdmin.className')"
                  :name="$t('schoolAdmin.className')"
                  :placeholder="$t('schoolAdmin.className_PLACEHOLDER')"
                  :rules="'required|max:100'"
                ></TextField>
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
                  {{ classId ? $t("GLOBAL_EDIT") : $t("GLOBAL_SAVE") }}
                </Button>
              </div>
            </b-row>
          </form>
        </validation-observer>
      </div>
    </div>
  </div>
</template>
<script>
import Button from "@/components/Shared/Button/index.vue";
import TextField from "@/components/Shared/TextField/index.vue";
import {getLevelsRequest, getSchoolClassByIdRequest, getStudyYearsRequest} from "@/api/school-info";
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";

export default {
  name: "index",
  components: {SelectSearch, TextField, Button},
  props:{
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      classItem: {
        name: "",
        study_year_id: "",
        level_id: "",
      },
      classId: this.$route.params.id,
      showModal: false,
      studyYears:[],
      levels:[],
    };
  },
  methods:{
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
    onSubmit() {
      this.$refs.addEditSchoolClassForm.validate().then((success) => {
        if (!success) return;
      });
      if (this.classId) {
        this.$emit("editSchoolClass", this.classItem);
      } else {
        this.$emit("addSchoolClass", this.classItem);
      }
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    getSchoolClassById() {
      if (this.classId) {
        this.ApiService(getSchoolClassByIdRequest(this.classId)).then((response) => {
          this.classItem.name= response.data.data.name;
          this.classItem.study_year_id = response.data.data.studyYear.id;
          this.classItem.level_id = response.data.data.level.id;
        })
      }
    },
  },
  mounted() {
    this.getAllStudyYear()
    this.getAllLevels()
    this.getSchoolClassById()
  }
}
</script>
<style scoped lang="scss">
@import "index";
</style>
