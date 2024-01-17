<template>
  <div class="add-edit-user">
    <div class="container-fluid custom-container">
      <div class="add-edit-user-form">
        <h3>{{ $t("USERS.ADD_SCHOOL_USER") }}</h3>
        <validation-observer v-slot="{ invalid }" ref="addEditUserForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="4">
                <div class="img-container">
                  <span>
                    <img v-if="imageUrl" :src="imageUrl" alt="Person Image" />
                    <i v-else class="far fa-user"></i>
                  </span>
                  <input
                    type="file"
                    ref="fileInput"
                    style="display: none"
                    @change="handleImageChange"
                  />

                  <div>
                    <Button type="button" @click="openFileInput" :custom-class="'submit-btn'">
                      {{ $t("BUTTONS.EDIT") }}
                    </Button>
                    <Button @click="clearImage" custom-class="cancel-btn">
                      {{ $t("BUTTONS.DELETE") }}
                    </Button>
                  </div>
                </div>
                <div v-if="$route.params.id" class="user-active">
                  <label for="">الحالة</label>
                  <div>
                    <label for="">{{ $t("USERS.ACTIVE") }}</label>
                    <b-form-checkbox
                      v-model="user.is_active"
                      value="active"
                      unchecked-value="deactivated"
                      @change="changeStatus()"
                      class="large-checkbox"
                      size="lg"
                      switch
                    >
                    </b-form-checkbox>
                  </div>
                </div>
              </b-col>
              <b-col lg="8">
                <b-row>
                  <b-col lg="4">
                    <div class="hold-field">
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
                  <b-col lg="4">
                    <div class="hold-field">
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
                  <b-col lg="4">
                    <div class="hold-field">
                      <SelectSearch
                        v-model="user.roles_categories"
                        :label="$t('ROLES.CLASSIFICATION_DEPARTMENT')"
                        :name="$t('ROLES.CLASSIFICATION_DEPARTMENT')"
                        :options="rolesTypeList"
                        :reduce="(option) => option.id"
                        :get-option-label="(option) => option.name"
                        :rules="'required'"
                        :deselectFromDropdown="true"
                        multiple
                        @input="getAllDepartments($event)"
                      ></SelectSearch>
                    </div>
                  </b-col>
                  <b-col lg="4">
                    <div class="hold-field">
                      <SelectSearch
                        v-model="user.roles"
                        :label="$t('USERS.DEPARTMENT')"
                        :name="$t('USERS.DEPARTMENT')"
                        :options="departmentsList"
                        :reduce="(option) => option.id"
                        :get-option-label="(option) => option.name"
                        :rules="'required'"
                        :deselectFromDropdown="true"
                        multiple
                      ></SelectSearch>
                    </div>
                  </b-col>
                  <b-col lg="4">
                    <div class="hold-field">
                      <TextField
                        v-model="user.first_name"
                        :label="$t('USERS.FIRST_NAME')"
                        :name="$t('USERS.FIRST_NAME')"
                        :placeholder="$t('USERS.ENTER') + ' ' + $t('USERS.FIRST_NAME')"
                        :rules="'required|min:2'"
                      ></TextField>
                    </div>
                  </b-col>
                  <b-col lg="4">
                    <div class="hold-field">
                      <TextField
                        v-model="user.middle_name"
                        :label="$t('USERS.SECOND_NAME')"
                        :name="$t('USERS.SECOND_NAME')"
                        :placeholder="$t('USERS.ENTER') + ' ' + $t('USERS.SECOND_NAME')"
                        :rules="'required|min:2'"
                      ></TextField>
                    </div>
                  </b-col>
                  <b-col lg="4">
                    <div class="hold-field">
                      <TextField
                        v-model="user.last_name"
                        :label="$t('USERS.LAST_NAME')"
                        :name="$t('USERS.LAST_NAME')"
                        :placeholder="$t('USERS.ENTER') + ' ' + $t('USERS.LAST_NAME')"
                        :rules="'required|min:2'"
                      ></TextField>
                    </div>
                  </b-col>
                  <b-col lg="8" :class="isStudent && 'd-none'" v-if="!$route.params.id && !isManagementStudent">
                    <div class="hold-field">
                      <TextField
                        v-model="user.email"
                        :label="$t('USERS.EMAIL')"
                        :name="$t('USERS.EMAIL')"
                        :placeholder="$t('USERS.ENTER') + ' ' + $t('USERS.EMAIL')"
                        :rules="'required|email'"
                      ></TextField>
                    </div>
                  </b-col>
                  <b-col lg="4">
                    <div class="hold-field">
                      <TextField
                        v-model="user.mobile"
                        :label="$t('USERS.PHONE_NUMBER')"
                        :name="$t('USERS.PHONE_NUMBER')"
                        :placeholder="$t('USERS.ENTER') + ' ' + $t('USERS.PHONE_NUMBER')"
                        :rules="{ regex: /^01[0125][0-9]{8}$/, required: true }"
                      ></TextField>
                    </div>
                  </b-col>
                  <b-col lg="4">
                    <div class="hold-field">
                      <SelectSearch
                        v-model="user.country_id"
                        :label="$t('USERS.NATIONALITY')"
                        :name="$t('USERS.NATIONALITY')"
                        :options="countries"
                        :reduce="(option) => option.id"
                        :get-option-label="(option) => option.name"
                        :rules="'required'"
                        :deselectFromDropdown="true"
                      ></SelectSearch>
                    </div>
                  </b-col>
                  <b-col lg="4">
                    <div class="hold-field">
                      <SelectSearch
                        v-model="user.religion_id"
                        :label="$t('USERS.religion')"
                        :name="$t('USERS.religion')"
                        :options="religions"
                        :reduce="(option) => option.id"
                        :get-option-label="(option) => option.name"
                        :rules="'required'"
                        :deselectFromDropdown="true"
                      ></SelectSearch>
                    </div>
                  </b-col>
                  <b-col lg="4">
                    <div class="hold-field">
                      <SelectSearch
                        v-model="user.gender"
                        :label="$t('USERS.gender')"
                        :name="$t('USERS.gender')"
                        :options="genderList"
                        :reduce="(option) => option.id"
                        :get-option-label="(option) => option.name"
                        :rules="'required'"
                        :deselectFromDropdown="true"
                      ></SelectSearch>
                    </div>
                  </b-col>
                  <b-col lg="4" v-if="!$route.params.id">
                    <b-form-group class="mb-3">
                      <TextField
                        v-model="user.password"
                        rules="required"
                        :type="passwordType"
                        :label="$t('USERS.PASSWORD')"
                        :name="$t('USERS.PASSWORD')"
                        :placeholder="$t('USERS.ENTER') + ' ' + $t('USERS.PASSWORD')"
                        class="p-relative d-block"
                        ref="password"
                      >
                        <b-icon
                          :icon="passwordIcon"
                          @click="hideShowPassword"
                          class="icon-password"
                        />
                      </TextField>
                    </b-form-group>
                  </b-col>
                  <b-col lg="4" v-if="!$route.params.id">
                    <b-form-group class="mb-3">
                      <TextField
                        v-model="user.password_confirmation"
                        :rules="`required|confirmed:${$t('USERS.PASSWORD')}`"
                        :type="confirmPasswordType"
                        :label="$t('USERS.CONFIRM_PASSWORD')"
                        :name="$t('USERS.CONFIRM_PASSWORD')"
                        :placeholder="$t('USERS.ENTER') + ' ' + $t('USERS.CONFIRM_PASSWORD')"
                        class="p-relative d-block"
                      >
                        <b-icon
                          :icon="confirmPasswordIcon"
                          @click="hideShowPassword('confirm')"
                          class="icon-password"
                        />
                      </TextField>
                    </b-form-group>
                  </b-col>

                  <b-col lg="12">
                    <h3 class="mt-2">روابط التواصل الإجتماعي</h3>
                  </b-col>
                  <b-col lg="4">
                    <div class="hold-field">
                      <TextField
                        v-model="user.facebook"
                        :label="$t('SOCIAL_MEDIA.FACEBOOK')"
                        :name="$t('SOCIAL_MEDIA.FACEBOOK')"
                        :placeholder="$t('USERS.ENTER_LINK')"
                      ></TextField>
                    </div>
                  </b-col>
                  <b-col lg="4">
                    <div class="hold-field">
                      <TextField
                        v-model="user.twitter"
                        :label="$t('SOCIAL_MEDIA.TWITTER')"
                        :name="$t('SOCIAL_MEDIA.TWITTER')"
                        :placeholder="$t('USERS.ENTER_LINK')"
                      ></TextField>
                    </div>
                  </b-col>
                  <b-col lg="4">
                    <div class="hold-field">
                      <TextField
                        v-model="user.linkedin"
                        :label="$t('SOCIAL_MEDIA.LINKEDIN')"
                        :name="$t('SOCIAL_MEDIA.LINKEDIN')"
                        :placeholder="$t('USERS.ENTER_LINK')"
                      ></TextField>
                    </div>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row>
              <div class="action-holder">
                <Button @click="handleCancel" custom-class="cancel-btn margin">
                  {{ $t("GLOBAL_CANCEL") }}
                </Button>
                <Button
                  type="submit"
                  :loading="loading"
                  :disabled="invalid"
                  :custom-class="'submit-btn'"
                >
                  {{ $t("GLOBAL_SAVE") }}
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
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import ImageUploader from "@/components/Shared/ImageUploader/index.vue";
import axios from "axios";
import VueCookies from "vue-cookies";
import _ from "lodash";

import { TogglePasswordMixins } from "@/mixins/TogglePasswordMixins";
// Dropdown
import {
  getSingleUserRequest,
  getAllRolesRequest,
  addEditUserRequest,
  deleteProfileImageRequest,
  postChangeStatusRequest,
} from "@/api/user";
import { getAllSchoolGroupRequest, getSingleSchoolGroupRequest } from "@/api/schoolGroup";

import { getAllNationaltyRequest } from "@/api/country";
import { postAddUserSchoolRequest } from "@/api/user";
import {
  getAllGenderRequest,
  getAllReligionRequest,
  getAllRolesTypeRequest,
  getAllRolesByTypeRequest,
} from "@/api/system";

export default {
  components: {
    TextField,
    Button,
    SelectSearch,
    ImageUploader,
  },
  mixins: [TogglePasswordMixins],

  props: {
    systemRoles: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      imageUrl: null,
      isStudent: false,
      user: {
        image: null,
        first_name: "",
        middle_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
        mobile: "",
        gender: "",
        religion_id: "",
        roles: [],
        country_id: "",
        facebook: "",
        linkedin: "",
        twitter: "",
      },
      editImage: false,
      itemImage: null,
      image: null,
      //
      countries: [],
      genderList: [],
      departmentsList: [],
      schoolGroupList: [],
      schoolsList: [],
      rolesTypeList: [],
      religions: [],
      filterWith:[],
      isManagementStudent: false,
    };
  },
  methods: {
    openFileInput() {
      this.$refs.fileInput.click();
    },
    handleImageChange(event) {
      const file = event.target.files[0];
      console.log(file);
      if (file) this.imageUrl = URL.createObjectURL(file);
      this.uploadImage(file);
    },
    uploadImage(file) {
      const formData = new FormData();
      formData.append("attachment", file);
      formData.append("type", "image");

      axios
        .post("https://jeeladmin.suredemos.com/api/attachment", formData, {
          headers: {
            Authorization: `Bearer ${VueCookies.get("token")}`,
            locale: "ar",
          },
        })
        .then((res) => {
          this.user.image = res.data.data.uuid;
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    },
    clearImage() {
      if (this.$route.params.id) {
        this.ApiService(deleteProfileImageRequest({ user_id: this.$route.params.id })).then(() => {
          this.user.image = null;
        });
      }

      this.imageUrl = null;
      this.user.image;
    },
    checkIsStudent(id) {
      if (id === 5) {
        this.isStudent = true;
        this.formValues.email = "";
      } else this.isStudent = false;
    },
    changeStatus() {
      let userStatus = {
        user_id: this.$route.params.id,
      };

      if (this.user.is_active == "deactivated" || this.user.is_active == "unverified")
        userStatus.is_active = 0;
      else userStatus.is_active = 1;

      this.ApiService(postChangeStatusRequest(userStatus)).then(() => {});
    },

    onSubmit() {
      console.log(this.user);
      this.$refs.addEditUserForm.validate().then((success) => {
        if (!success) return;
        this.ApiService(postAddUserSchoolRequest(this.user)).then(() => {
          this.$router.push({ name: "schools-users-search" });
        });
      });
    },

    handleCancel() {
      this.$emit("handleCancel");
    },

    // All Dropdown
    getAllCountries() {
      this.ApiService(getAllNationaltyRequest()).then((response) => {
        this.countries = response.data.data;
      });
    },
    getAllGenders() {
      this.ApiService(getAllGenderRequest()).then((response) => {
        this.genderList = response.data.data;
      });
    },
    getAllReligions() {
      this.ApiService(getAllReligionRequest()).then((response) => {
        this.religions = response.data.data;
      });
    },
    getAllDepartments: _.debounce(function (value) {
      if (value != undefined) {
        console.log('value',value)
        if (value.includes(125)){
          this.isManagementStudent = true
        } else {
          this.isManagementStudent = false
        }
        for (let type = 0; type < value.length; type++) {
          this.filterWith[`types[${type}]`] = value[type]
        }
        this.ApiService(getAllRolesByTypeRequest(this.filterWith)).then((response) => {
          this.departmentsList = response.data.data;
        });
      }
    }, 300),
    getAllSchools: _.debounce(function (value) {
      if (value != undefined) {
        this.ApiService(getSingleSchoolGroupRequest(value)).then((response) => {
          this.schoolsList = response.data.data.schools;
        });
      }
    }, 300),
    getAllRolesType() {
      this.ApiService(getAllRolesTypeRequest()).then((response) => {
        this.rolesTypeList = response.data.data;
      });
    },

    getAllSchoolGroup() {
      this.ApiService(getAllSchoolGroupRequest()).then((response) => {
        this.schoolGroupList = response.data.data;
      });
    },
  },
  mounted() {
    this.getAllCountries();
    this.getAllGenders();
    this.getAllReligions();
    this.getAllRolesType();
    this.getAllSchoolGroup();
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
