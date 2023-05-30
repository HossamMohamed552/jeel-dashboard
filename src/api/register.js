export const postLoginRequest = (data) => ({
  method: "post",
  url: `${process.env.VUE_APP_AUTH_URL}/login`,
  config: {
    data,
  },
});

export const postRegisterRequest = (data) => ({
  method: "post",
  url: "register",
  config: {
    data,
  },
});

export const putUpdateUserRequest = (data) => ({
  method: "post",
  url: `users/${data.id}`,
  config: {
    data,
  },
});

export const postChangePasswordRequest = (data) => ({
  method: "post",
  url: "change-password",
  config: {
    data,
  },
});

export const getLogoutRequest = () => ({
  method: "get",
  url: "logout",
});
