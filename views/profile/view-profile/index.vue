<template>
  <section class="container-fluid custom-container">
    <div class="show-role">
      <div class="hold-fields">
        <b-row>
          <b-col lg="12">
            <div class="heading-section">
              <h2 class="heading">{{ $t("USERS.showDetails") }}</h2>
              <div class="buttons-container">
                <Button @click="handleShowChangePasswordForm" custom-class="cancel-btn margin">
                  {{ $t("CHANGE_PASSWORD") }}
                </Button>
                <Button @click="handleEditProfile" :custom-class="'submit-btn'">
                  {{ $t("EDIT_MY_PROFILE") }}
                </Button>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="3">
            <div class="img-container">
              <span>
                <img v-if="user.image" :src="user.image" alt="Person Image" />
                <i v-else class="far fa-user"></i>
              </span>
            </div>
          </b-col>
          <b-col lg="9">
            <b-row>
              <b-col lg="4" class="mb-5 showItem">
                <ShowItem :title="$t('USER.first_name')" :subtitle="user.first_name" />
              </b-col>
              <b-col lg="4" class="mb-5 showItem">
                <ShowItem :title="$t('USERS.SECOND_NAME')" :subtitle="user.middle_name" />
              </b-col>
              <b-col lg="4" class="mb-5 showItem">
                <ShowItem :title="$t('USER.last_name')" :subtitle="user.last_name" />
              </b-col>
              <b-col lg="6" class="mb-5 showItem">
                <ShowItem :title="$t('TABLE_FIELDS.email_username')" :subtitle="user.email" />
              </b-col>
              <b-col lg="6" class="mb-5 showItem">
                <ShowItem :title="$t('USER.mobile')" :subtitle="user.mobile" />
              </b-col>
              <b-col lg="4" class="mb-5 showItem">
                <ShowItem :title="$t('USERS.NATIONALITY')" :subtitle="user?.user_country?.name" />
              </b-col>
              <b-col lg="4" class="mb-5 showItem">
                <ShowItem :title="$t('USERS.religion')" :subtitle="user?.user_religion?.name" />
              </b-col>
              <b-col lg="4" class="mb-5 showItem">
                <ShowItem :title="$t('USERS.gender')" :subtitle="user?.gender?.name" />
              </b-col>
              <b-col lg="6" class="mb-5 showItem" v-if="user && user.roles">
                <ShowItem :title="$t('USERS.DEPARTMENT')" :listItems="user.roles" />
              </b-col>
              <b-col lg="4" class="mb-5 showItem">
                <ShowItem :title="$t('USERS.ACTIVE')" :subtitle="user?.status?.name" />
              </b-col>
              <b-col lg="12">
                <h3 class="mb-5">روابط التواصل الإجتماعي</h3>
              </b-col>
              <b-col lg="4" class="mb-5 showItem">
                <ShowItem :title="$t('SOCIAL_MEDIA.FACEBOOK')" :subtitle="user?.facebook" />
              </b-col>
              <b-col lg="4" class="mb-5 showItem">
                <ShowItem :title="$t('SOCIAL_MEDIA.TWITTER')" :subtitle="user?.twitter" />
              </b-col>
              <b-col lg="4" class="mb-5 showItem">
                <ShowItem :title="$t('SOCIAL_MEDIA.LINKEDIN')" :subtitle="user?.linkedin" />
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
    </div>

    <GeneralModal id="change-password-modal" size="md" :hideHeader="true">
      <template #modalBody>
        <validation-observer v-slot="{ invalid }" ref="changePasswordForm">
          <b-form @submit.prevent="onSubmit">
            <b-row>
              <b-col lg="12">
                <h3 class="modal-title">
                  {{ $t("CHANGE_PASSWORD") }}
                </h3>
              </b-col>
              <b-col lg="12">
                <b-form-group>
                  <TextField
                    v-model="changePassword.old_password"
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
              <b-col lg="12">
                <b-form-group>
                  <TextField
                    v-model="changePassword.new_password"
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
              <b-col lg="12">
                <b-form-group>
                  <TextField
                    v-model="changePassword.confirm_password"
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

            <b-row class="buttons-container">
              <Button type="submit" :loading="loading" :disabled="invalid">
                {{ $t("GLOBAL_SAVE") }}
              </Button>
              <Button custom-class="cancel-btn" @click="handleCancel">
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
  </section>
</template>
<script>
import { postChangePasswordRequest } from "@/api/user.js";
import ShowItem from "@/components/Shared/ShowItem/index.vue";
import GeneralModal from "@/components/Shared/GeneralModal/index.vue";
import Modal from "@/components/Shared/Modal/index.vue";
import { TogglePasswordMixins } from "@/mixins/TogglePasswordMixins";
import TextField from "@/components/Shared/TextField/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import { mapActions } from "vuex";

export default {
  mixins: [TogglePasswordMixins],

  name: "index",
  components: {
    ShowItem,
    GeneralModal,
    Modal,
    TextField,
    Button,
  },
  data() {
    return {
      showSuccessModal: false,
      loading: false,

      changePassword: {
        old_password: "",
        new_password: "",
        confirm_password: "",
      },
    };
  },
  methods: {
    ...mapActions(["removeUser"]),

    handleShowChangePasswordForm() {
      this.$bvModal.show("change-password-modal");
    },
    handleChangePassword() {
      this.loading = true;
      this.ApiService(postChangePasswordRequest(this.changePassword))
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
    onSubmit() {
      this.handleChangePassword();
    },
    handleEditProfile() {
      this.$router.push("/edit-profile");
    },
    handleCancel() {
      this.$bvModal.hide("change-password-modal");
      this.changePassword = {
        old_password: "",
        new_password: "",
        confirm_password: "",
      };
    },
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
};
</script>
<style scoped lang="scss">
@import "./index";
</style>
