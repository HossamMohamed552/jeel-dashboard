export const postVerifyRequest = (data) => ({
  method: "post",
  url: `${process.env.VUE_APP_AUTH_URL}/verify/email/${data.code}/${data.user_id}`,
});

export const resendVerificationMail = (data) => ({
  method: "post",
  url: `${process.env.VUE_APP_AUTH_URL}/verify-email/send`,
  config: {
    data,
  },
});
