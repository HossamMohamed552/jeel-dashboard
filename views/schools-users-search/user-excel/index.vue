<template>
  <section class="container-fluid custom-container">
    <b-modal v-model="showModal" class="custom-rounded" @hide="showModal= false" centered
             hide-footer hide-header>
      <div class="all-content">
        <div class="d-flex justify-content-start align-items-center border-bottom py-2"
             v-if="statusOfUploadExcel && statusOfUploadExcel.user_create">
          <div class="hold-correct-icon">
            <img src="@/assets/images/icons/check.png" alt="check">
          </div>
          <div class="mx-3 font-weight-bold">
            {{ $t('user_add_successfully', {userSuccessNumber: statusOfUploadExcel.user_create}) }}
          </div>
        </div>
        <div class="py-2" v-if="statusOfUploadExcel && statusOfUploadExcel.user_fail_create">
          <div class="d-flex justify-content-start align-items-center">
            <div class="hold-correct-icon">
              <img src="@/assets/images/icons/delete.png" alt="delete">
            </div>
            <div class="mx-3 font-weight-bold">
              {{ $t('user_failed', {userFailedNumber: statusOfUploadExcel.user_fail_create}) }}
            </div>
          </div>
          <b-row class="mt-2" v-for="(userError,index) in userFailedError" :key="index">
            <b-col lg="3">
              <p class="mb-1">{{ $t('userNumber', {user_number: userError.user_number}) }}</p>
            </b-col>
            <b-col lg="9" v-for="(singleError,index) in userError.errors" :key="index">
              <div :class="$i18n.locale === 'ar'? 'text-right' :''">
                <p class="mb-1">- {{ singleError }}</p>
              </div>
            </b-col>
          </b-row>
        </div>
      </div>
    </b-modal>
    <div class="upload-excel">
      <b-row>
        <b-col lg="4">
          <h3>1 - {{ $t('downloadExcel') }}</h3>
          <div class="hold-btn-download-excel" @click="downloadTemplate">
            <img src="@/assets/images/icons/excel-file.png" alt="excel">
          </div>
        </b-col>
        <b-col lg="8">
          <h3>2 - {{ $t('uploadExcel') }}</h3>
          <validation-observer v-slot="{ invalid }" ref="addExcelForm">
            <form @submit.prevent="onSubmit" class="mt-5">
              <b-row>
                <b-col lg="6">
                  <div class="hold-field mb-3">
                    <SelectSearch
                      v-model="user.school_group_id"
                      :label="$t('SCHOOL.SCHOOL_COLLECTION')"
                      :name="$t('SCHOOL.SCHOOL_COLLECTION')"
                      :options="schoolGroupList"
                      :reduce="(option) => option.id"
                      :get-option-label="(option) => option.name"
                      :rules="'required'"
                      :deselectFromDropdown="true"
                      @input="getAllSchools($event)"
                    ></SelectSearch>
                  </div>
                </b-col>
                <b-col lg="6">
                  <div class="hold-field mb-3">
                    <SelectSearch
                      v-model="user.school_id"
                      :label="$t('TABLE_FIELDS.school')"
                      :name="$t('TABLE_FIELDS.school')"
                      :options="schoolsList"
                      :reduce="(option) => option.id"
                      :get-option-label="(option) => option.name"
                      :rules="'required'"
                      :deselectFromDropdown="true"
                    ></SelectSearch>
                  </div>
                </b-col>
                <b-col lg="6">
                  <div class="hold-field">
                    <SelectSearch
                      v-model="user.role_category"
                      :label="$t('ROLES.CLASSIFICATION_DEPARTMENT')"
                      :name="$t('ROLES.CLASSIFICATION_DEPARTMENT')"
                      :options="rolesTypeList"
                      :reduce="(option) => option.id"
                      :get-option-label="(option) => option.name"
                      :rules="'required'"
                      :deselectFromDropdown="true"
                      @input="getAllDepartment($event)"
                    ></SelectSearch>
                  </div>
                </b-col>
                <b-col lg="6">
                  <div class="hold-field">
                    <SelectSearch
                      v-model="user.role"
                      :label="$t('USERS.DEPARTMENT')"
                      :name="$t('USERS.DEPARTMENT')"
                      :options="departmentsList"
                      :reduce="(option) => option.id"
                      :get-option-label="(option) => option.name"
                      rules="required"
                      :deselectFromDropdown="true"
                    ></SelectSearch>
                  </div>
                </b-col>
                <b-col lg="12">
                  <h5 class="mt-3">{{ $t('uploadFile') }}</h5>
                  <div class="input_container">
                    <input type="file" id="fileUpload"
                           accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                           @change="onFileChange">
                  </div>
                </b-col>
                <div class="action-holder">
                  <Button @click="handleCancel" custom-class="cancel-btn margin">
                    {{ $t("GLOBAL_CANCEL") }}
                  </Button>
                  <Button
                    type="submit"
                    :loading="loading"
                    :disabled="invalid || user.file === null"
                    :custom-class="'submit-btn'"
                  >
                    {{ $t("GLOBAL_SAVE") }}
                  </Button>
                </div>
              </b-row>
            </form>
          </validation-observer>
        </b-col>
      </b-row>
    </div>
  </section>
</template>
<script>
import Button from "@/components/Shared/Button/index.vue";
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import ImageUploader from "@/components/Shared/UploadImage/index.vue";
import TextField from "@/components/Shared/TextField/index.vue";
import {getAllSchoolGroupRequest, getSingleSchoolGroupRequest} from "@/api/schoolGroup";
import {getAllRolesByTypeRequest, getAllRolesTypeRequest} from "@/api/system";
import axios from "axios";
import VueCookies from "vue-cookies";
import Modal from "@/components/Shared/Modal/index.vue";

export default {
  name: "index",
  components: {Modal, TextField, ImageUploader, SelectSearch, Button},
  data() {
    return {
      schoolGroupList: [],
      schoolsList: [],
      rolesTypeList: [],
      departmentsList: [],
      loading: false,
      showModal:false,
      user: {
        file: null,
        role_category: null,
        role: null,
        school_id: "",
        school_group_id: "",
      },
      statusOfUploadExcel: null,
      userFailedError: []
    }
  },
  methods: {
    onFileChange(event) {
      this.user.file = event.target.files[0];
    },
    downloadTemplate() {
      axios({
        method: "post",
        url: `export-users`,
        responseType: "blob",
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${VueCookies.get("token")}`,
          locale: "ar",
        },
      }).then((response) => {
        if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `add-user-template.xlsx`);
          document.body.appendChild(link);
          link.click();
        }
      })
    },
    getAllSchoolGroup() {
      this.ApiService(getAllSchoolGroupRequest()).then((response) => {
        this.schoolGroupList = response.data.data;
      });
    },
    getAllRolesType() {
      this.ApiService(getAllRolesTypeRequest()).then((response) => {
        this.rolesTypeList = response.data.data;
      });
    },
    getAllSchools: _.debounce(function (value) {
      if (value) {
        this.user.school_id = null
        this.ApiService(getSingleSchoolGroupRequest(value)).then((response) => {
          this.schoolsList = response.data.data.schools;
        });
      }
    }, 300),
    getAllDepartment: _.debounce(function (value) {
      if (value) {
        this.user.role = null
        this.ApiService(getAllRolesByTypeRequest({'types[0]': value})).then((response) => {
          this.departmentsList = response.data.data;
        });
      }
    }, 300),
    onSubmit() {
      this.$refs.addExcelForm.validate().then((success) => {
        if (!success) return;
        axios.post('/excel-user-import', this.user, {
          headers: {
            Authorization: `Bearer ${VueCookies.get("token")}`,
            locale: 'ar',
            'Content-Type': 'multipart/form-data'
          }
        }).then((response) => {
          this.statusOfUploadExcel = response.data.data
          this.userFailedError = response.data.errors
          this.showModal = true
        })
      });
    },
    handleCancel() {
      this.$router.back()
    },
  },
  mounted() {
    this.getAllSchoolGroup();
    this.getAllRolesType();
  }
}
</script>

<style scoped lang="scss">
@import "./index";
</style>
