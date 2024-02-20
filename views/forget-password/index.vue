<template>
  <div class="forget-password">
    <div
      v-if="rsponseType == 'expired'"
      class="forget-password__expire text-center"
    >
      <h4>{{ $t("This link has been expired") }}</h4>
      <Button @click="$router.push('login')">{{ $t("MENU.main") }}</Button>
    </div>
    <div
      v-else-if="rsponseType == 'invalid'"
      class="forget-password__invalid text-center"
    >
      <h4>{{ $t("This link is invalid") }}</h4>
      <Button @click="$router.push('login')">{{ $t("MENU.main") }}</Button>
    </div>
    <div v-else-if="rsponseType == 'success'" class="forget-password__success">
      <validation-observer v-slot="{ invalid }" ref="changePasswordForm">
        <b-form @submit.prevent="onSubmit" class="px-4">
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

          <b-row class="justify-content-end">
            <Button type="submit" :loading="loading" :disabled="invalid">
              {{ $t("GLOBAL_SEND") }}
            </Button>
            <Button custom-class="mx-2" @click="$router.push('login')">{{
              $t("MENU.main")
            }}</Button>
          </b-row>
        </b-form>
      </validation-observer>
    </div>
    <Modal
      :content-message="'تمت الإضافة بنجاح'"
      :showModal="showSuccessModal"
      :is-success="true"
    />
  </div>
</template>

<script>
import { postResetPasswordRequest } from "@/api/user.js";
import { postCheckForgetPasswordStatusRequest } from "@/api/register.js";
import { TogglePasswordMixins } from "@/mixins/TogglePasswordMixins";
import Modal from "@/components/Shared/Modal/index.vue";

export default {
  name: "forget-password",
  mixins: [TogglePasswordMixins],
  components: {
    Modal,
  },
  data() {
    return {
      form: {
        token: "",
        new_password: "",
        confirm_password: "",
      },
      loading: false,
      showSuccessModal: false,
      rsponseType: "",
      token: this.$route.query.token,
    };
  },
  mounted() {
    this.checkForgetPasswordStatus();
  },
  methods: {
    onSubmit() {
      this.handleChangePassword();
    },
    handleChangePassword() {
      this.loading = true;
      this.form.token = this.token
      const data = this.form;
      this.ApiService(postResetPasswordRequest(data))
        .then(() => {
          this.showSuccessModal = true;
          setTimeout(() => {
            this.showSuccessModal = false;
            this.$router.push("login");
          }, 1500);
        }).catch((err)=> {
        if(err.response.status == 403) {
          this.rsponseType = 'expired'
        } else if(err.response.status == 404) {
          this.rsponseType = 'invalid'
        }
      }).finally(() => {
          this.loading = false;
        });
    },
    checkForgetPasswordStatus() {
      const data = { token: this.token };
      this.ApiService(postCheckForgetPasswordStatusRequest(data)).then(
        (res) => {
          this.rsponseType = 'success'
        }
      ).catch((err)=> {
        if(err.response.status == 403) {
          this.rsponseType = 'expired'
        } else if(err.response.status == 404) {
          this.rsponseType = 'invalid'
        }
      })
    },
  },
};
</script>

<style scoped lang="scss">
@import "./index";
</style>
