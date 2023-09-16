<template>
  <b-container fluid class="verify-container">
    <b-row class="justify-content-center align-items-center pt-5">
      <b-card class="w-75 custom-card mt-5 pt-5" :class="message.type">
        <b-card-body>
          <b-card-title class="text-center">{{ $t("Verify") }}</b-card-title>
          <b-card-text>
            <p class="text-center">
              {{ message.message }}
            </p>
          </b-card-text>
        </b-card-body>
      </b-card>
    </b-row>
  </b-container>
</template>

<script>
import { postVerifyRequest } from "@/api/verify.js";
export default {
  data() {
    return {
      loading: false,
      code: this.$route.query.code,
      email: this.$route.query.user_id,
      message: {
        message: "first case",
        type: "success",
      },
    };
  },
  mounted() {
    this.verify();
  },
  methods: {
    verify() {
      this.loading = true;
      this.ApiService(
        postVerifyRequest({
          code: this.code,
          user_id: this.user_id,
        })
      )
        .then((res) => {
          if (res.status === 200) {
            this.message = {
              message: this.$t("VERIFICATION.SUCCESS"),
              type: "success",
            };
            this.$router.push("/login");
        } else if (res.status === 403) {
              this.message = {
                message: this.$t("VERIFICATION.EXPIRED"),
                type: "error",
              };
        } else if (res.status === 404) {
              this.message = {
                message: this.$t("VERIFICATION.USED"),
                type: "error",
              };
          } else {
            this.message = {
              message: this.$t("VERIFICATION.SOMETHING_WRONG"),
              type: "error",
            };
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
