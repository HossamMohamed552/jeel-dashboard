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
                <b-col lg="6" v-if="user.role === 5">
                  <div class="hold-field mt-3">
                    <SelectSearch
                      v-model="user.level_id"
                      :label="$t('schoolAdmin.level')"
                      :name="$t('schoolAdmin.level')"
                      :options="levels"
                      :reduce="(option) => option.id"
                      :get-option-label="(option) => option.name"
                      rules="required"
                      :deselectFromDropdown="true"
                      @input="getAllClassByLeveId"
                    ></SelectSearch>
                  </div>
                </b-col>
                <b-col lg="6" v-if="user.role === 5">
                  <div class="hold-field mt-3">
                    <SelectSearch
                      v-model="user.class_id"
                      :label="$t('schoolAdmin.classes')"
                      :name="$t('schoolAdmin.classes')"
                      :options="classes"
                      :reduce="(option) => option.id"
                      :get-option-label="(option) => option.name"
                      rules="required"
                      :disabled="!user.level_id"
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
    <ProgressModal :show="loading" :value="progress" :title="video_name"
                   @cancel="cancelUpload()"></ProgressModal>
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
import {getAllClassesRequest, getSchoolAdminLevelsRequest} from "@/api/school-info";
import ProgressModal from "@/components/Shared/ProgressModal/index.vue";

export default {
  name: "index",
  components: {ProgressModal, Modal, TextField, ImageUploader, SelectSearch, Button},
  data() {
    return {
      schoolGroupList: [],
      schoolsList: [],
      rolesTypeList: [],
      departmentsList: [],
      classes: [],
      levels: [],
      loading: false,
      showModal: false,
      loadingUploadExcel: false,
      showModalUploadExcel: false,
      showProgressModal: false,
      progress: 0,
      video_name: '',
      user: {
        file: null,
        role_category: null,
        role: null,
        level_id: null,
        class_id: null
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
    getAllRolesType() {
      this.ApiService(getAllRolesTypeRequest()).then((response) => {
        this.rolesTypeList = response.data.data;
      });
    },
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
        if(!this.user.level_id || !this.user.class_id){
          delete  this.user.level_id
          delete  this.user.class_id
        }
        this.loading = true;
        let axiosSource = axios.CancelToken.source();
        this.cancelSource = axiosSource;
        axios.post('/school-admin/excel-user-import', this.user, {
          cancelToken: axiosSource.token,
          onUploadProgress: ({loaded, total}) => {
            this.progress = Math.floor((loaded / total) * 100)
          },
          headers: {
            Authorization: `Bearer ${VueCookies.get("token")}`,
            locale: 'ar',
            'Content-Type': 'multipart/form-data'
          }
        }).then((response) => {
          this.statusOfUploadExcel = response.data.data
          this.userFailedError = response.data.errors
          this.showModal = true
          this.showModalUploadExcel = true
          this.$nextTick(()=>{
            this.$refs.addExcelForm.reset()
            this.user.file = null
          })
          setTimeout(() => {
            this.loading = false
          }, 500)
        })
      });
    },
    cancelUpload() {
      this.loading = false
      this.cancelSource.cancel();
    },
    handleCancel() {
      this.$router.back()
    },
    getAllLevels() {
      this.ApiService(getSchoolAdminLevelsRequest({list_all: true})).then((response) => {
        this.levels = response.data.data
      })
    },
    getAllClassByLeveId() {
      this.ApiService(getAllClassesRequest({
        level_id: this.user.level_id,
        list_all: true
      })).then((response) => {
        this.classes = response.data.data
      })
    },

  },
  mounted() {
    this.getAllRolesType();
    this.getAllLevels();
  }
}
</script>

<style scoped lang="scss">
@import "./index";
</style>
