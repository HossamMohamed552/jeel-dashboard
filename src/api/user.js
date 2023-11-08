export const getAllUsersRequest = (params) => ({
  method: 'get',
  url: 'users',
  config: {
    params
  }
})
export const getAllSearchUsersRequest = (params) => ({
  method: 'get',
  url: 'users?list_all=true',
  config: {
    params
  }
})
export const getSingleUserRequest = (params) => ({
  method: 'get',
  url: `users/${params}`,
})
export const getRolesRequest = () => ({
  method: 'get',
  url: 'roles',
  config: {}
})

export const getProfileDataRequest = () => ({
  method: 'get',
  url: 'users/current',
  config: {}
})

export const getAllRolesRequest = () => ({
  method: 'get',
  url: 'roles?list_all=true&system_role=1',
  config: {}
})
export const getAllRolesSystemRequest = () => ({
  method: 'get',
  url: 'roles?list_all=true&system_role=0',
  config: {}
})
export const postAddUserRequest = (data) => ({
  method: "post",
  url: "users",
  config: {
    data,
  },
  headers:{
    'Content-Type': 'multipart/form-data'
  }
});

export const deleteUserRequest = (id) => ({
  method: "delete",
  url: `users/${id}`,
});

export const postChangePasswordRequest = (data) => ({
  method: 'post',
  url: 'change-password',
  config: {
    data
  }
})

export const postResetPasswordRequest = (data) => ({
  method: 'post',
  url: `${process.env.VUE_APP_AUTH_URL}/reset-password`,
  config: {
    data
  }
})
