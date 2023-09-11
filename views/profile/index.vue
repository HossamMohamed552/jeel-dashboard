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
      </div>
    </div>
    <div class="content">
      <div class="hold-fields">
        <b-row class="row-data">
          <b-col lg="6" class="mb-5">
            <ShowItem
              :title="$t('USERS.FIRST_NAME')"
              :subtitle="profile.first_name"
            />
          </b-col>
          <b-col lg="6" class="mb-5">
            <ShowItem
              :title="$t('USERS.LAST_NAME')"
              :subtitle="profile.last_name"
            />
          </b-col>
          <b-col lg="6" class="mb-5">
            <ShowItem :title="$t('USERS.EMAIL')" :subtitle="profile.email" />
          </b-col>
          <b-col lg="6" class="mb-5">
            <ShowItem
              :title="$t('USERS.PHONE_NUMBER')"
              :subtitle="profile.mobile"
            />
          </b-col>
          <b-col lg="6" class="mb-5">
            <ShowItem
              :title="$t('USERS.SOCIAL_MEDIA')"
              :subtitle="profile.social_media"
            />
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
    <GeneralModal
      id="change-password-modal"
      size="lg"
      :title="$t('CHANGE_PASSWORD')"
    >
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
                    <b-icon
                      :icon="passwordIcon"
                      @click="hideShowPassword"
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
    <Modal
      :content-message="'تمت الإضافة بنجاح'"
      :showModal="showSuccessModal"
      :is-success="true"
    />
  </div>
</template>
  <script>
import {
  getProfileDataRequest,
  postChangePasswordRequest,
} from "@/api/user.js";
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import { TogglePasswordMixins } from "@/mixins/TogglePasswordMixins";
import Modal from "@/components/Shared/Modal/index.vue";
export default {
  mixins: [TogglePasswordMixins],
  components: {
    ShowItem,
    Modal,
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
    };
  },
  mounted() {
    this.getProfileData();
  },
  methods: {
    onSubmit() {
      this.handleChangePassword();
    },
    getProfileData() {
      this.loading = true;
      this.ApiService(getProfileDataRequest())
        .then((response) => {
          this.profile = response.data.data.user;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleShowChangePasswordForm() {
      this.$bvModal.show("change-password-modal");
    },
    handleCancel() {
      this.$bvModal.hide("change-password-modal");
      this.form = {
        old_password: "",
        new_password: "",
        confirm_password: "",
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
          }, 3000);
          this.getProfileData;
          this.form = {
            old_password: "",
            new_password: "",
            confirm_password: "",
          };
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
  <style lang="scss" scoped>
@import "./index.scss";
</style>
  