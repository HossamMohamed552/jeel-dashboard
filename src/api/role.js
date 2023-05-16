export const getRolesRequest = () => ({
  method: 'get',
  url: 'roles',
  config: {}
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
