export const getAllUsersRequest = (params) => ({
  method: 'get',
  url: 'users',
  config: {
    params
  }
})


export const getRolesRequest = () => ({
  method: 'get',
  url: 'roles',
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
