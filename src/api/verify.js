export const postVerifyRequest = (data) => ({
    method: "post",
    url: "/verify",
    config: {
      data,
    },
  });