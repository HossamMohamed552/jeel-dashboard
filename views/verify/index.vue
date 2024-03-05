<template>
  <b-container fluid class="verify-container">
    <div v-if="loading" class="d-flex justify-content-center align-items-center mt-5 pt-5">
      <b-spinner class="mt-5" variant="primary" />
    </div>
    <b-row v-else class="justify-content-center align-items-center pt-5">
      <b-card class="w-75 custom-card mt-5 pt-5" :class="message.type">
        <b-card-body>
          <!-- <b-card-title class="text-center">{{ $t("Verify") }}</b-card-title> -->
          <b-card-text>
            <p class="text-center primary-text">
              {{ message.message }}
            </p>
          </b-card-text>
          <div v-if="resend">
            <validation-observer v-slot="{ invalid }" ref="resendEmailForm">
              <form @submit.prevent="onSubmit" class="mt-5">
                <b-row class="justify-content-center">
                  <b-col cols="12" md="8" lg="6" class="mb-3">
                    <TextField
                      v-model="email"
                      :label="$t('VERIFICATION.EMAIL')"
                      :name="$t('VERIFICATION.EMAIL')"
                      rules="required|email"
                    ></TextField>
                  </b-col>
                </b-row>
                <b-row class="justify-content-center">
                  <Button
                    type="submit"
                    :loading="sendingEmail"
                    :disabled="invalid"
                    custom-class="submit-btn"
                  >
                    {{ $t("VERIFICATION.RESEND") }}
                  </Button>
                </b-row>
              </form>
            </validation-observer>
          </div>
        </b-card-body>
      </b-card>
    </b-row>
  </b-container>
</template>

<script>
import TextField from "@/components/Shared/TextField/index.vue";
import Button from "@/components/Shared/Button/index.vue";
import { postVerifyRequest, resendVerificationMail } from "@/api/verify.js";
export default {
  components: {
    TextField,
    Button,
  },
  data() {
    return {
      email: "",
      sendingEmail: false,
      loading: false,
      code: this.$route.query.code,
      user_id: this.$route.query.user_id,
      resend: false,
      message: {
        message: "",
        type: "",
      },
    };
  },
  mounted() {
    this.verify();
  },
  methods: {
    onSubmit() {
      this.$refs.resendEmailForm.validate().then((success) => {
        if (!success) return;
      });
      this.sendingEmail = true;
      this.ApiService(
        resendVerificationMail({
          email: this.email,
        })
      )
        .then((res) => {
          this.message = {
            message: this.$t("VERIFICATION.RESEND_SUCCESS"),
            type: "success",
          };
          setTimeout(() => {
            this.$router.push("/LoginAdmin");
          }, 4000);
        })
        .finally(() => {
          this.sendingEmail = false;
        });
    },
    verify() {
      this.loading = true;
      this.ApiService(
        postVerifyRequest({
          code: this.code,
          user_id: this.user_id,
        })
      )
        .then((res) => {
          this.message = {
            message: this.$t("VERIFICATION.SUCCESS"),
            type: "success",
          };
          setTimeout(() => {
            this.$router.push("/LoginAdmin");
          }, 4000);
        })
        .catch((e) => {
          if (e.response.status === 403) {
            this.message = {
              message: this.$t("VERIFICATION.EXPIRED"),
              type: "error",
            };
            this.resend = true;
          } else if (e.response.status === 404) {
            this.message = {
              message: this.$t("VERIFICATION.USED"),
              type: "error",
            };

            setTimeout(() => {
              this.$router.push("/LoginAdmin");
            }, 4000);
          } else {
            this.message = {
              message: this.$t("VERIFICATION.SOMETHING_WRONG"),
              type: "error",
            };
            setTimeout(() => {
              this.$router.push("/LoginAdmin");
            }, 4000);
          }
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
