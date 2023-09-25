<template>
  <b-modal
    id="forget-password-modal"
    class="mission-modal"
    hide-footer
    size="xl"
    centered
    @hide="handleCloseModal()"
  >
    <template v-slot:modal-header="{ close }">
      <span>{{ $t("FORGET_PASSWORD_TITLE") }}</span>
      <b-icon class="close-modal-icon cursor-pointer" icon="x" @click="close" />
    </template>
    <div :class="$i18n.locale === 'en' ? '' : 'rtl'">
      <div class="w-100">
        <validation-observer v-slot="{ invalid }" ref="forgetPasswordForm">
          <form @submit.prevent="onSubmit">
            <div class="hold-field">
              <TextField
                v-model="formValues.email"
                :label="$t('USERS.EMAIL')"
                :name="$t('USERS.EMAIL')"
                :rules="'required|email'"
              ></TextField>
            </div>
            <div class="hold-button">
            <Button
              type="submit"
              :loading="loading"
              :disabled="invalid"
              custom-class="w-100 d-block submit-btn"
            >
              {{ $t("GLOBAL_SEND") }}
            </Button>
          </div>
          </form>
        </validation-observer>
        <Modal
      :content-message="'تمت الإرسال بنجاح'"
      :showModal="showSuccessModal"
      :is-success="true"
    />
      </div>
    </div>
  </b-modal>
</template>
  <script>
  import {postForgetPasswordRequest} from "@/api/register.js"
  import Modal from "@/components/Shared/Modal/index.vue";
export default {
  name: "ForgetPasswordModal",
  components: {
    Modal
  },
  data() {
    return {
      formValues: {
        email: ''
      },
      showSuccessModal: false
    };
  },

  methods: {

    onSubmit() {
      this.$refs.forgetPasswordForm.validate().then((success) => {
        if (!success) {
          return;
        }
        const data = this.formValues
        this.ApiService(postForgetPasswordRequest(data))
        .then(() => {
          this.showSuccessModal = true;
          setTimeout(() => {
            this.showSuccessModal = false;
          }, 3000);
          this.$bvModal.hide("forget-password-modal");
        })
      });
    },
    handleCloseModal() {
      this.$emit("closeModal");
      this.$bvModal.hide("forget-password-modal");
    },
  },
};
</script>
  <style lang="scss" scoped>
@import "./index.scss";
</style>
