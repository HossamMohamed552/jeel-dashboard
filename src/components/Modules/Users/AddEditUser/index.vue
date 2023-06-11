<template>
  <div class="add-edit-user">
    <b-container>
      <div class="add-edit-user-form">
        <h3>{{ $t("USERS.ADD_NEW") }}</h3>

        <validation-observer v-slot="{ invalid }" ref="addEditUserForm">
          <form @submit.prevent="onSubmit" class="mt-5">
            <b-row>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="formValues.first_name"
                    :label="$t('USERS.FIRST_NAME')"
                    :name="$t('USERS.FIRST_NAME')"
                    :rules="'required'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="formValues.last_name"
                    :label="$t('USERS.LAST_NAME')"
                    :name="$t('USERS.LAST_NAME')"
                    :rules="'required'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="formValues.email"
                    :label="$t('USERS.EMAIL')"
                    :name="$t('USERS.EMAIL')"
                    :rules="'required'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="formValues.password"
                    :label="$t('USERS.PASSWORD')"
                    :name="$t('USERS.PASSWORD')"
                    :rules="'required|min:6'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="formValues.mobile"
                    :label="$t('USERS.PHONE_NUMBER')"
                    :name="$t('USERS.PHONE_NUMBER')"
                    :rules="'required'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <TextField
                    v-model="formValues.social_media"
                    :label="$t('USERS.SOCIAL_MEDIA')"
                    :name="$t('USERS.SOCIAL_MEDIA')"
                    :rules="'required'"
                  ></TextField>
                </div>
              </b-col>
              <b-col lg="6" class="mb-3">
                <div class="hold-field">
                  <SelectSearch
                    v-model="formValues.roles"
                    :label="$t('USERS.ROLES')"
                    :name="$t('USERS.ROLES')"
                    :options="systemRoles"
                    :reduce="(option) => option.id"
                    :get-option-label="(option) => option.name"
                    :rules="'required'"
                    multiple
                  ></SelectSearch>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="6" class="mb-3">
                <div class="hold-field mt-4">
                  <ImageUploader
                    :name="'logoSchool'"
                    :text="$t('USERS.UPLOAD_IMAGE')"
                    @imageUpload="handleUploadImage"
                    :item-image="itemImage"
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
          </form>
        </validation-observer>
      </div>
    </b-container>
  </div>
</template>
<script>
import TextField from "@/components/Shared/TextField/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import SelectSearch from "@/components/Shared/SelectSearch/index.vue";
import ImageUploader from "@/components/Shared/ImageUploader/index.vue";
import axios from "axios";
import VueCookies from "vue-cookies";
import {getSingleUserRequest} from "@/api/user";

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
      formValues: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        mobile: "",
        social_media: "",
        roles: [],
      },
      itemImage: null,
      image: null,
    };
  },
  methods: {
    onSubmit() {
      if (this.$route.params.id) {
        this.$refs.addEditUserForm.validate().then((success) => {
          if (!success) return;
          const formData = new FormData();
          formData.append("first_name", this.formValues.first_name);
          formData.append("last_name", this.formValues.last_name);
          formData.append("email", this.formValues.email);
          formData.append("password", this.formValues.password);
          formData.append("mobile", this.formValues.mobile);
          formData.append("social_media", this.formValues.social_media);
          formData.append("_method", 'PUT');
          for (let user = 0; user < this.formValues.roles.length; user++) {
            formData.append(`roles[${user}]`, this.formValues.roles[user]);
          }
          if (this.image) formData.append("image", this.image);
          axios.post(`/users/${this.$route.params.id}`, formData, {
            headers: {
              Authorization: `Bearer ${VueCookies.get("token")}`,
              locale: 'ar',
              'Content-Type': 'multipart/form-data'
            }
          }).then((response) => {
          }).then(() => {
            this.$router.push('/dashboard/users')
          })
        });
      } else {
        this.$refs.addEditUserForm.validate().then((success) => {
          if (!success) return;
          const formData = new FormData();
          formData.append("first_name", this.formValues.first_name);
          formData.append("last_name", this.formValues.last_name);
          formData.append("email", this.formValues.email);
          formData.append("password", this.formValues.password);
          formData.append("mobile", this.formValues.mobile);
          formData.append("social_media", this.formValues.social_media);
          for (let user = 0; user < this.formValues.roles.length; user++) {
            formData.append(`roles[${user}]`, this.formValues.roles[user]);
          }
          if (this.image) formData.append("image", this.image);
          axios.post('/users', formData, {
            headers: {
              Authorization: `Bearer ${VueCookies.get("token")}`,
              locale: 'ar',
              'Content-Type': 'multipart/form-data'
            }
          }).then((response) => {
          }).then(() => {
            this.$router.push('/dashboard/users')
          })
          // this.$emit("handleAddEditUser", formData);
        });
      }
    },
    handleCancel() {
      this.$emit("handleCancel");
    },
    handleUploadImage(e) {
      this.itemImage = URL.createObjectURL(e.target.files[0])
      if (e) this.image = e.target.files[0];
      else return;
    },
  },
  mounted() {
    this.ApiService(getSingleUserRequest(this.$route.params.id)).then((response) => {
      this.formValues.first_name = response.data.data.first_name
      this.formValues.last_name = response.data.data.last_name
      this.formValues.email = response.data.data.email
      this.formValues.mobile = response.data.data.mobile
      this.formValues.social_media = response.data.data.social_media
      this.formValues.roles =  response.data.data.roles
      this.itemImage = response.data.data.avatar
      this.image = response.data.data.avatar
    })
  }
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
