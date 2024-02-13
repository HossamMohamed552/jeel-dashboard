<template>
  <div class="add-edit-user">
    <div class="container-fluid custom-container">
      <div class="add-edit-user-form">
        <h3>{{ $t("USERS.ADD_SCHOOL_USER") }}</h3>
        <validation-observer v-slot="{ invalid }" ref="addEditUserForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="4">
                <ImageUploader
                  :imageUrl="imageUrl"
                  @update:imageUrl="handleImageUrlUpdate"
                  @image-uploaded="handleImageUploaded"
                  @image-cleared="handleImageCleared"
                />
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
                  <b-col lg="4" v-if="getUserAdmin.roles[0]?.type.key === 'system_administration'">
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
                  <b-col lg="4" v-if="getUserAdmin.roles[0]?.type.key === 'system_administration'">
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
                        @input="onSelectRoleCategoriesInput($event)"
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
                        @input="onSelectRole($event)"
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
                  <b-col lg="8" v-if="!isStudent">
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
import ImageUploader from "@/components/Shared/UploadImage/index.vue";
import axios from "axios";
import VueCookies from "vue-cookies";
import _ from "lodash";

import { TogglePasswordMixins } from "@/mixins/TogglePasswordMixins";
// Dropdown
import { deleteProfileImageRequest, postChangeStatusRequest } from "@/api/user";
import { getAllSchoolGroupRequest, getSingleSchoolGroupRequest } from "@/api/schoolGroup";

import { getAllNationaltyRequest } from "@/api/country";
import { postAddUserSchoolRequest } from "@/api/user";
import {
  getAllGenderRequest,
  getAllReligionRequest,
  getAllRolesTypeRequest,
  getAllRolesByTypeRequest,
} from "@/api/system";
import {mapGetters} from "vuex";

export default {
  components: {
    TextField,
    Button,
    SelectSearch,
    ImageUploader,
  },
  mixins: [TogglePasswordMixins],
  computed:{
    getUserAdmin(){
      return this.$store.getters.user
    }
  },
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
      index: 0,
      indexType: 0,
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
      isSelectingRoleCategories: false,
    };
  },
  methods: {
    // Image Upload Method
    handleImageUploaded(imageUuid) {
      this.user.image = imageUuid;
    },
    handleImageUrlUpdate(newImageUrl) {
      this.imageUrl = newImageUrl;
    },
    handleImageCleared() {
      this.user.image = null;
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
      this.$refs.addEditUserForm.validate().then((success) => {
        if (!success) return;
        this.ApiService(postAddUserSchoolRequest(this.user)).then(() => {
          this.$router.push('/dashboard/all-school-users');
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
    onSelectRole: _.debounce(function (value) {
      if (value != undefined) {
        const studentRole = this.departmentsList.find(
          (role) => role.code.toLowerCase() === "student"
        );
        console.log("studentRoleType", studentRole);
        console.log("value", value);
        console.log("includes", value.includes(studentRole.id));
        if (value.includes(studentRole.id)) this.isStudent = true;
        else this.isStudent = false;
        if (value.includes(studentRole.id) && this.index == 0) {
          this.user.roles = [studentRole.id];
          this.index = 1;
        } else {
          this.index = 0;
        }
      }
    }, 300),
    getAllSchools: _.debounce(function (value) {
      if (value != undefined) {
        this.ApiService(getSingleSchoolGroupRequest(value)).then((response) => {
          this.schoolsList = response.data.data.schools;
        });
      }
    }, 300),

    onSelectRoleCategoriesInput: _.debounce(function (value) {
      if (value != undefined) {
        this.onSelectRoleCategories(value);
      }
    }, 300),

    onSelectRoleCategories: async function (value) {
      try {
        const studentRoleType = this.rolesTypeList.find(
          (type) => type.key.toLowerCase() === "student_management"
        );
        console.log("studentRoleType", studentRoleType);
        console.log("value", value);
        console.log("includes", value.includes(studentRoleType.id));
        if (value.includes(studentRoleType.id)) this.isStudent = true;
        else this.isStudent = false;
        if (value.includes(studentRoleType.id) && this.indexType == 0) {
          this.user.roles_categories = [studentRoleType.id];
          this.indexType = 1;
          this.getAllDepartments(studentRoleType.id);
        } else {
          this.getAllDepartments(value);
          this.indexType = 0;
        }
      } catch (e) {
        console.log(e);
      }
    },

    // getAllDepartments: function (value) {
    //   if (value != undefined) {
    //     this.ApiService(getAllRolesByTypeRequest(value))
    //       .then((response) => {
    //         this.departmentsList = response.data.data;
    //       })
    //       .catch((error) => {
    //         console.error("Error in getAllDepartments:", error);
    //       });
    //   }
    // },

    getAllRolesType() {
      this.ApiService(getAllRolesTypeRequest()).then((response) => {
        this.rolesTypeList = response.data.data.filter((item)=>{
          return item.key !== "system_administration"
        });
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
