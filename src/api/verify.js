export const postVerifyRequest = (data) => ({
    method: "post",
    url: `/verify/email/${data.code}/${data.user_id}`,
  });