export const getRolesRequest = () => ({
  method: 'get',
  url: 'roles',
  config: {}
})
export const getSingleRoleRequest = (params) => ({
  method: 'get',
  url: `roles/${params}`,
})
export const putRoleRequest = (params,data) => ({
  method: 'put',
  url: `roles/${params}`,
  config: {
    data
  }
})
export const postRolesRequest = (data) => ({
  method: 'post',
  url: 'roles',
  config: {
    data
  }
})
export const deleteRoleRequest = (params) =>({
  method: 'delete',
  url: `roles/${params}`,
})
