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
export const getAllRolesRequest = () => ({
  method: 'get',
  url: 'roles?list_all=true',
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
