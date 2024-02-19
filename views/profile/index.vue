<template>
  <div class="user-info">
    <div class="user-info__header">
      <div class="user-info__name-image">
        <div class="image-container">
          <div
            v-if="loading"
            class="img-loader w-100 h-100 position-absolute d-flex justify-content-center align-items-center"
          >
            <b-spinner />
          </div>
          <img
            class="task-user-image"
            :src="
              profile.avatar
                ? profile.avatar
                : require('@/assets/images/icons/user-info-avatar.svg')
            "
          />
        </div>
        <h6>{{ profile.name }}</h6>
      </div>
      <div class="user-info__actions">
        <Button customClass="info-btns" @click="handleShowChangePasswordForm">
          <img src="@/assets/images/icons/user-info-lock.svg" />
          <p>{{ $t("CHANGE_PASSWORD") }}</p>
        </Button>
        <Button customClass="info-btns" @click="handleShowEditProfileForm">
          <!-- <img src="@/assets/images/icons/user-info-lock.svg" /> -->
          <p>{{ $t("USERS.EDIT") }}</p>
        </Button>
      </div>
    </div>
    <div class="content">
      <div class="hold-fields">
        <b-row class="row-data">
          <b-col lg="6" class="mb-5">
            <ShowItem :title="$t('USERS.FIRST_NAME')" :subtitle="profile.first_name" />
          </b-col>
          <b-col lg="6" class="mb-5">
            <ShowItem :title="$t('USERS.LAST_NAME')" :subtitle="profile.last_name" />
          </b-col>
          <b-col lg="6" class="mb-5">
            <ShowItem :title="$t('USERS.EMAIL')" :subtitle="profile.email" />
          </b-col>
          <b-col lg="6" class="mb-5">
            <ShowItem :title="$t('USERS.PHONE_NUMBER')" :subtitle="profile.mobile" />
          </b-col>
          <b-col lg="6" class="mb-5">
            <ShowItem :title="$t('USERS.SOCIAL_MEDIA')" :subtitle="profile.social_media" />
          </b-col>
          <b-col lg="6" class="mb-5">
            <ShowItem :title="$t('USERS.ROLES')" />
            <div class="roles">
              <div v-for="role in profile.roles" :key="role.id" class="role">
                {{ role.name }}
              </div>
            </div>
          </b-col>
        </b-row>
      </div>
    </div>
    <GeneralModal id="change-password-modal" size="lg" :title="$t('CHANGE_PASSWORD')">
      <template #modalBody>
        <validation-observer v-slot="{ invalid }" ref="changePasswordForm">
          <b-form @submit.prevent="onSubmit" class="px-4">
            <b-row>
              <b-col lg="12">
                <b-form-group class="mb-3">
                  <TextField
                    v-model="form.old_password"
                    rules="required"
                    :type="newPasswordType"
                    :label="$t('LOGIN_CURRENT_PASSWORD')"
                    :name="$t('LOGIN_CURRENT_PASSWORD')"
                    :placeholder="$t('LOGIN_ENTER_CURRENT_PASSWORD')"
                    class="p-relative d-block"
                    ref="password"
                  >
                    <b-icon
                      :icon="newPasswordIcon"
                      @click="hideShowPassword('new')"
                      class="icon-password"
                    />
                  </TextField>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="12">
                <b-form-group class="mb-3">
                  <TextField
                    v-model="form.new_password"
                    rules="required"
                    :type="passwordType"
                    :label="$t('LOGIN_NEW_PASSWORD')"
                    :name="$t('LOGIN_NEW_PASSWORD')"
                    :placeholder="$t('LOGIN_ENTER_NEW_PASSWORD')"
                    class="p-relative d-block"
                    ref="password"
                  >
                    <b-icon :icon="passwordIcon" @click="hideShowPassword" class="icon-password" />
                  </TextField>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="12">
                <b-form-group class="mb-3">
                  <TextField
                    v-model="form.confirm_password"
                    :rules="`required|confirmed:${$t('LOGIN_NEW_PASSWORD')}`"
                    :type="confirmPasswordType"
                    :label="$t('LOGIN_CONFIRM_PASSWORD')"
                    :name="$t('LOGIN_CONFIRM_PASSWORD')"
                    :placeholder="$t('LOGIN_CONFIRM_PASSWORD')"
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
            </b-row>

            <b-row class="align-items-center mt-4 mb-3">
              <Button type="submit" :loading="loading" :disabled="invalid">
                {{ $t("GLOBAL_SAVE") }}
              </Button>
              <Button custom-class="cancel-button mx-3" @click="handleCancel">
                {{ $t("GLOBAL_CANCEL") }}
              </Button>
            </b-row>
          </b-form>
        </validation-observer>
      </template>
    </GeneralModal>
    <!--Edit profile Data-->
    <GeneralModal id="edit-profile-data" size="xl" :title="$t('EDIT_PROFILE')">
      <template #modalBody>
        <validation-observer v-slot="{ invalid }" ref="editProfileData">
          <b-form @submit.prevent="submitEdit" class="px-4">
            <b-row>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="formValues.first_name"
                    :label="$t('USERS.FIRST_NAME')"
                    :name="$t('USERS.FIRST_NAME')"
                    :rules="'required|min:2'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="formValues.last_name"
                    :label="$t('USERS.LAST_NAME')"
                    :name="$t('USERS.LAST_NAME')"
                    :rules="'required|min:2'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="6" class="mb-3" :class="isStudent && 'd-none'" v-if="!profile.id">
                <div class="hold-field">
                  <TextField
                    v-model="formValues.email"
                    :label="$t('USERS.EMAIL')"
                    :name="$t('USERS.EMAIL')"
                    :rules="formValues.roles != '5' ? 'required|email' : ''"
                  ></TextField>
                </div>
              </b-col>
              <b-col v-if="formValues.user_name" lg="6" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="formValues.user_name"
                    :label="$t('USERS.USER_NAME')"
                    :name="$t('USERS.USER_NAME')"
                    disabled="true"
                  ></TextField>
                </div>
              </b-col>
              <!-- <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <TextField
                    type="password"
                    v-model="formValues.password"
                    :label="$t('USERS.PASSWORD')"
                    :name="$t('USERS.PASSWORD')"
                    :rules="profile.id ? '' : 'required|min:6'"
                  ></TextField>
                </div>
              </b-col> -->
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="formValues.mobile"
                    :label="$t('USERS.PHONE_NUMBER')"
                    :name="$t('USERS.PHONE_NUMBER')"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="formValues.social_media"
                    :label="$t('USERS.SOCIAL_MEDIA')"
                    :name="$t('USERS.SOCIAL_MEDIA')"
                    :rules="{
                      regex: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/gi,
                    }"
                  ></TextField>
                </div>
              </b-col>
              <!-- <b-col lg="12" class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="formValues.roles"
                    :label="$t('USERS.ROLES')"
                    :name="$t('USERS.ROLES')"
                    :options="systemRoles"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :disabled="profile.id"
                    @input="checkIsStudent($event)"
                  ></SelectSearch>
                </div>
              </b-col> -->
            </b-row>
            <b-row>
              <b-col lg="12" class="mb-3">
                <div class="hold-field mt-4">
                  <ImageUploader
                    :name="'logoSchool'"
                    :text="$t('USERS.UPLOAD_IMAGE')"
                    :item-image="itemImage"
                    @imageUpload="handleUploadImage"
                    @deleteImage="deleteImage"
                  />
                </div>
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
          </b-form>
        </validation-observer>
      </template>
    </GeneralModal>
    <Modal
      :content-message="'تمت الإضافة بنجاح'"
      :showModal="showSuccessModal"
      :is-success="true"
    />
  </div>
</template>
<script>
import { getProfileDataRequest, postChangePasswordRequest } from "@/api/user.js";
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import { TogglePasswordMixins } from "@/mixins/TogglePasswordMixins";
import Modal from "@/components/Shared/Modal/index.vue";
import TextField from "@/components/Shared/TextField/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import ImageUploader from "@/components/Shared/ImageUploader/index.vue";
import axios from "axios";
import VueCookies from "vue-cookies";
import { getSingleUserRequest, getAllRolesRequest } from "@/api/user";
import { mapActions } from "vuex";
export default {
  mixins: [TogglePasswordMixins],
  components: {
    ShowItem,
    Modal,
    TextField,
    Button,
    SelectSearch,
    ImageUploader,
  },
  data() {
    return {
      loading: false,
      profile: null,
      form: {
        old_password: "",
        new_password: "",
        confirm_password: "",
      },
      showSuccessModal: false,
      isStudent: false,
      formValues: {
        first_name: "",
        last_name: "",
        user_name: "",
        email: "",
        password: "",
        mobile: "",
        social_media: "",
        roles: [],
      },
      editImage: false,
      itemImage: null,
      image: null,
      systemRoles: [],
      userData: {},
    };
  },
  mounted() {
    this.getProfileData();
    this.getSystemRoles();
  },
  methods: {
    ...mapActions(["removeUser"]),
    onSubmit() {
      this.handleChangePassword();
    },
    getProfileData() {
      this.loading = true;
      this.ApiService(getProfileDataRequest())
        .then((response) => {
          this.profile = response.data.data.user;
          if (this.profile?.id) this.getUserData();
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleShowChangePasswordForm() {
      this.$bvModal.show("change-password-modal");
    },
    handleShowEditProfileForm() {
      this.formValues.first_name = this.userData.first_name;
      this.formValues.last_name = this.userData.last_name;
      this.formValues.user_name = this.userData.user_name;
      this.formValues.email = this.userData.email;
      this.formValues.mobile = this.userData.mobile;
      this.formValues.social_media = this.userData.social_media;
      this.formValues.roles = this.userData.roles;

      this.$bvModal.show("edit-profile-data");
    },
    handleCancel() {
      this.$bvModal.hide("change-password-modal");
      this.$bvModal.hide("edit-profile-data");
      this.form = {
        old_password: "",
        new_password: "",
        confirm_password: "",
      };

      this.formValues = {
        first_name: "",
        last_name: "",
        user_name: "",
        email: "",
        password: "",
        mobile: "",
        social_media: "",
        roles: [],
      };
    },
    handleChangePassword() {
      this.loading = true;
      const data = this.form;
      this.ApiService(postChangePasswordRequest(data))
        .then(() => {
          this.modalMsg = "CHANGE_PASSWORD_SUCCESS_MSG";
          this.$bvModal.hide("change-password-modal");
          this.showSuccessModal = true;
          setTimeout(() => {
            this.showSuccessModal = false;
            this.removeUser();
          }, 2000);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    //edit user profile methods
    checkIsStudent(id) {
      if (id == "5") {
        this.isStudent = true;
        this.formValues.email = "";
      } else this.isStudent = false;
    },
    deleteImage() {
      this.image = null;
      this.itemImage = null;
    },
    submitEdit() {
      this.$refs.editProfileData.validate().then((success) => {
        if (!success) return;
        const formData = new FormData();
        formData.append("first_name", this.formValues.first_name);
        formData.append("last_name", this.formValues.last_name);
        formData.append("email", this.formValues.email);
        formData.append("password", this.formValues.password);
        formData.append("mobile", this.formValues.mobile);
        formData.append("social_media", this.formValues.social_media);
        formData.append("_method", "PUT");
        // for (let user = 0; user < this.formValues.roles.length; user++) {
        //   formData.append(`roles[${user}]`, this.formValues.roles[user]);
        // }
        formData.append("roles[0]", this.formValues.roles);
        if (this.image && this.editImage) formData.append("image", this.image);
        axios
          .post(`/user_auth_update`, formData, {
            headers: {
              Authorization: `Bearer ${VueCookies.get("token")}`,
              locale: "ar",
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {})
          .then(() => {
            this.modalMsg = "USER_UPDATED";
            this.$bvModal.hide("edit-profile-data");
            this.showSuccessModal = true;
            setTimeout(() => {
              this.showSuccessModal = false;
            }, 2000);
            this.getProfileData();
          });
      });
    },
    handleUploadImage(e) {
      this.editImage = true;
      this.itemImage = URL.createObjectURL(e.target.files[0]);
      if (e) this.image = e.target.files[0];
      else return;
    },
    getUserData() {
      this.ApiService(getSingleUserRequest(this.profile.id)).then((response) => {
        this.userData = response.data.data;
        this.formValues.first_name = response.data.data.first_name;
        this.formValues.last_name = response.data.data.last_name;
        this.formValues.user_name = response.data.data.user_name;
        this.formValues.email = response.data.data.email;
        this.formValues.mobile = response.data.data.mobile;
        this.formValues.social_media = response.data.data.social_media;
        // this.formValues.roles = response.data.data.roles.map((item) => item.id)
        this.formValues.roles = response.data.data.roles;
        this.itemImage = response.data.data.avatar;
        this.image = response.data.data.avatar;
      });
    },
    getSystemRoles() {
      this.ApiService(getAllRolesRequest()).then((response) => {
        this.systemRoles = response.data.data;
        this.systemRoles.push(
          {
            name: "صلاحيات المدرسة",
            id: "",
          },
          {
            name: "الطالب",
            id: "5",
          }
        );
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
