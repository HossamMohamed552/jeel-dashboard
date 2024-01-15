<template>
  <div class="add-edit-user">
    <div class="container-fluid custom-container">
      <div class="add-edit-user-form">
        <h3>{{ $t("EDIT_MY_PROFILE") }}</h3>
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
                  <b-col lg="8" :class="isStudent && 'd-none'" v-if="!$route.params.id">
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

// Dropdown
import { deleteProfileImageRequest } from "@/api/user";
import { mapActions } from "vuex";

import { getAllNationaltyRequest } from "@/api/country";
import { getAllGenderRequest, getAllReligionRequest } from "@/api/system";

export default {
  components: {
    TextField,
    Button,
    SelectSearch,
    ImageUploader,
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
      userStrored: {},
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
      religions: [],
    };
  },
  methods: {
    ...mapActions(["updateUser"]),

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

    onSubmit() {
      this.$refs.addEditUserForm.validate().then((success) => {
        if (!success) return;
        const formData = new FormData();
        formData.append("_method", "PUT");
        Object.keys(this.user).forEach((key) => {
          if (key === "roles") {
            return;
          } else if (key === "image") {
            if (this.image && this.editImage) formData.append(key, this.user[key]);
            else return;
          } else if (key === "gender") {
            formData.append(key, this.user[key]);
          } else {
            formData.append(key, this.user[key]);
          }
        });

        axios
          .post(`/user_auth_update`, formData, {
            headers: {
              Authorization: `Bearer ${VueCookies.get("token")}`,
              locale: "ar",
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            this.updateUser(response.data.data);
          })
          .then(() => {
            this.$router.push({ name: "view-profile" });
          });
      });
    },

    handleCancel() {
      this.$emit("handleCancel");
    },

    // All Dropdown
    async getAllCountries() {
      this.ApiService(getAllNationaltyRequest()).then((response) => {
        this.countries = response.data.data;
      });
    },
    async getAllGenders() {
      this.ApiService(getAllGenderRequest()).then((response) => {
        this.genderList = response.data.data;
      });
    },
    async getAllReligions() {
      this.ApiService(getAllReligionRequest()).then((response) => {
        this.religions = response.data.data;
      });
    },
  },
  async mounted() {
    try {
      await this.getAllCountries();
      await this.getAllGenders();
      await this.getAllReligions();
      this.userStrored = JSON.parse(localStorage.getItem("user"));
      this.user = this.userStrored;
      this.user.country_id = this.$store.getters.user?.user_country.id;
      this.user.religion_id = this.$store.getters.user?.user_religion.id;
      this.user.gender = this.$store.getters.user?.gender.id;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },

  computed: {
    // userStrored() {
    //   this.user = this.$store.getters.user;
    //   this.user.country_id = this.$store.getters.user?.user_country.id;
    //   this.user.religion_id = this.$store.getters.user?.user_religion.id;
    //   this.user.gender = this.$store.getters.user?.gender.id;
    //   console.log(this.user);
    //   return this.$store.getters.user;
    // },
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
