<template>
  <div class="add-edit-school">
    <div class="container-fluid custom-container">
      <div class="add-edit-school-form">
        <h3>{{ $route.params.id ? $t("SCHOOL.EDIT") : $t("SCHOOL.ADD_NEW") }}</h3>
        <validation-observer v-slot="{ invalid }" ref="addEditSchoolForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="9" class="px-0 mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="createSchool.name"
                    :label="$t('SCHOOL.name')"
                    :name="$t('SCHOOL.name')"
                    :rules="'required|min:3'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="3" class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="createSchool.school_group_id"
                    :label="$t('SCHOOL.school_group')"
                    :name="$t('SCHOOL.school_group')"
                    :options="schoolGroups"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                  ></SelectSearch>
                </div>
              </b-col>
              <b-col lg="12">
                <b-row>
                  <b-col lg="9" class="px-0">
                    <b-row>
                      <b-col lg="12" class="mb-3">
                        <div class="hold-field">
                          <SelectSearch
                            v-model="createSchool.school_type_id"
                            :label="$t('SCHOOL.school_type')"
                            :name="$t('SCHOOL.school_type')"
                            :options="schoolTypes"
                            :reduce="(option) => option.id"
                            :get-option-label="(option) => option.name"
                            :rules="'required'"
                          ></SelectSearch>
                        </div>
                      </b-col>
                      <b-col lg="6" class="mb-3">
                        <div class="hold-field">
                          <SelectSearch
                            v-model="createSchool.admin_id"
                            :label="$t('SCHOOL.userName')"
                            :name="$t('SCHOOL.userName')"
                            :options="users"
                            :reduce="(option) => option.id"
                            :get-option-label="(option) => option.name"
                            :rules="'required'"
                          ></SelectSearch>
                        </div>
                      </b-col>
                      <b-col lg="6" class="mb-3">
                        <div class="hold-field">
                          <SelectSearch
                            v-model="createSchool.package_id"
                            :label="$t('SCHOOL.package')"
                            :name="$t('SCHOOL.package')"
                            :options="packages"
                            :reduce="(option) => option.id"
                            :get-option-label="(option) => option.name"
                            :rules="'required'"
                          ></SelectSearch>
                        </div>
                      </b-col>
                      <b-col lg="6" class="mb-3">
                        <div class="hold-field">
                          <ValidationProvider v-slot="{errors, invalid}" rules="required">
                            <b-form-group :label="$t('SCHOOL.status')" v-slot="{ ariaDescribedby }"
                                          class="group-type">
                              <b-form-radio v-model="createSchool.status" value="0"
                                            name="group-status">غير
                                مفعل
                              </b-form-radio>
                              <b-form-radio v-model="createSchool.status" value="1"
                                            name="group-status">مفعل
                              </b-form-radio>
                            </b-form-group>
                          </ValidationProvider>
                        </div>
                      </b-col>
                      <b-col lg="6" class="mb-3">
                        <div class="hold-field">
                          <ValidationProvider v-slot="{errors, invalid}" rules="required">
                            <b-form-group :label="$t('SCHOOL.music')" v-slot="{ ariaDescribedby }"
                                          class="group-type">
                              <b-form-radio v-model="createSchool.music_status" value="0"
                                            name="group-music_type">أكابيلا
                              </b-form-radio>
                              <b-form-radio v-model="createSchool.music_status" value="1"
                                            name="group-music_type">
                                بموسيقى
                              </b-form-radio>
                            </b-form-group>
                          </ValidationProvider>
                        </div>
                      </b-col>
                      <b-col lg="6" class="mb-3">
                        <div class="hold-field">
                          <ValidationProvider v-slot="{errors, invalid}" rules="required">
                            <label>
                              {{ $t('SCHOOL.start_subscription') }}
                            </label>
                            <date-picker v-model="createSchool.startDate" @change="changeDate"
                                         valueType="format"></date-picker>
                            <p class="show-date" v-if="showDate">{{ createSchool.startDate }}</p>
                          </ValidationProvider>
                        </div>
                      </b-col>
                      <b-col lg="6" class="mb-3">
                        <div class="hold-field">
                          <ValidationProvider v-slot="{errors, invalid}" rules="required">
                            <label>
                              {{ $t('SCHOOL.end_subscription') }}
                            </label>
                            <date-picker v-model="createSchool.endDate" @change="changeDate"
                                         valueType="format"></date-picker>
                            <p class="show-date" v-if="showDate">{{ createSchool.endDate }}</p>
                          </ValidationProvider>
                        </div>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col lg="3">
                    <div class="hold-field mt-4">
                      <ImageUploader
                        :text="$t('SCHOOL.UPLOAD_IMAGE')"
                        @imageUpload="handleUploadImage"
                        :itemImage="itemImage"
                      />
                    </div>
                  </b-col>
                </b-row>
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
                  {{ $route.params.id ? $t("GLOBAL_EDIT") : $t("GLOBAL_SAVE") }}
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
import TextField from "@/components/Shared/TextField/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import {getSingleSchoolsRequest, postSchoolsRequest} from "@/api/school";
import Modal from "@/components/Shared/Modal/index.vue";
import {getAllPackagesRequest} from "@/api/packages";
import {getAllSchoolGroupRequest} from "@/api/schoolGroup";
import {getAllSchoolTypesRequest} from "@/api/schoolType"
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import ImageUploader from "@/components/Shared/ImageUploader/index.vue";
import {getAllSearchUsersRequest} from "@/api/user";
import axios from "axios";
import VueCookies from "vue-cookies";
import {routesContent, routesSchool, routesUsers} from "@/globalData";
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";

export default {
  components: {
    SelectSearch,
    ImageUploader,
    Modal,
    TextField,
    Button,
    DatePicker
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      schoolGroups: [],
      packages: [],
      schoolTypes: [],
      users: [],
      itemImage: null,
      showDate: true,
      createSchool: {
        name: "",
        startDate: "",
        endDate: "",
        email: "",
        school_group_id: "",
        school_type_id: "",
        admin_id: "",
        package_id: "",
        music_status: "",
        status: "",
        logo: null
      },
    };
  },
  methods: {
    changeDate() {
      this.showDate = false
    },
    handleUploadImage(e) {
      this.itemImage = URL.createObjectURL(e.target.files[0])
      if (e) this.createSchool.logo = e.target.files[0];
      else return;
    },
    getAllPackages() {
      this.ApiService(getAllPackagesRequest()).then((response) => {
        this.packages = response.data.data
      })
    },
    getAlSchoolGroups() {
      this.ApiService(getAllSchoolGroupRequest()).then((response) => {
        this.schoolGroups = response.data.data
      })
    },
    getAllSchoolType() {
      this.ApiService(getAllSchoolTypesRequest()).then((response) => {
        this.schoolTypes = response.data.data
      })
    },
    getAllUsers() {
      this.ApiService(getAllSearchUsersRequest()).then((response) => {
        this.users = response.data.data
      })
    },
    sendDataNewSchool() {
      const formData = new FormData()
      formData.append('name', this.createSchool.name)
      formData.append('school_group_id', this.createSchool.school_group_id)
      formData.append('status', this.createSchool.status)
      formData.append('music_status', this.createSchool.music_status)
      formData.append('admin_id', this.createSchool.admin_id)
      formData.append('school_type_id', this.createSchool.school_type_id)
      formData.append('subscription_start_date', this.createSchool.startDate)
      formData.append('subscription_end_date', this.createSchool.endDate)
      formData.append('package_id', this.createSchool.package_id)
      formData.append('logo', this.createSchool.logo)
      if (this.$route.params.id) {
        formData.append('_method', 'PUT')
        // this.ApiService(postSchoolsRequest(formData)).then((res)=>{})
        axios.post(`/schools/${this.$route.params.id}`, formData, {
          headers: {
            Authorization: `Bearer ${VueCookies.get("token")}`,
            locale: 'ar',
            'Content-Type': 'multipart/form-data'
          }
        }).then((response) => {this.$router.push('/dashboard/schools')})
      } else {
        axios.post('/schools', formData, {
          headers: {
            Authorization: `Bearer ${VueCookies.get("token")}`,
            locale: 'ar',
            'Content-Type': 'multipart/form-data'
          }
        }).then(() => {
          this.$router.push('/dashboard/schools')
        })
      }
    },
    onSubmit() {
      this.sendDataNewSchool()
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    getSchoolToEdit() {
      if (this.$route.params.id) {
        this.ApiService(getSingleSchoolsRequest(this.$route.params.id)).then((response) => {
          this.createSchool.name = response.data.data.name
          this.createSchool.admin_id = response.data.data.admin.id
          this.createSchool.school_group_id = response.data.data.school_group.id
          this.createSchool.school_type_id = response.data.data.school_type.id
          this.createSchool.package_id = response.data.data.package.id
          this.createSchool.music_status = response.data.data.music_status
          this.createSchool.status = response.data.data.status
          this.createSchool.startDate = response.data.data.subscription_start_date
          this.createSchool.endDate = response.data.data.subscription_end_date
          this.itemImage = response.data.data.logo
          this.createSchool.logo = response.data.data.logo
        })
      }
    }
  },
  mounted() {
    this.getSchoolToEdit()
    this.getAllPackages()
    this.getAlSchoolGroups()
    this.getAllSchoolType()
    this.getAllUsers()
  }
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
