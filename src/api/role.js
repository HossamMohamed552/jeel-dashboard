export const getRolesRequest = (params) => ({
  method: "get",
  url: "roles",
  config: { params },
});
export const getRolesTypesRequest = (params) => ({
  method: "get",
  url: "/system_codes/role/type",
  config: { params },
});
export const getRolePermissionsRequest = (params) => ({
  method: "get",
  url: `/permissions/role/${params.role_id}/category/${params.category_id}`,
  config: { params },
});
export const putRolePermissionsRequest = (params) => ({
  method: "put",
  url: `/permissions/role/${params.role_id}/category/${params.category_id}`,
  config: { params },
});
export const test = (params) => ({
  method: "get",
  url: `/permissions/role`,
  config: { params },
});
export const getSingleRoleRequest = (params) => ({
  method: "get",
  url: `roles/${params}`,
});
export const putRoleRequest = (params, data) => ({
  method: "put",
  url: `roles/${params}`,
  config: {
    data,
  },
});
export const postRolesRequest = (data) => ({
  method: "post",
  url: "roles",
  config: {
    data,
  },
});
export const deleteRoleRequest = (params) => ({
  method: "delete",
  url: `roles/${params}`,
});
