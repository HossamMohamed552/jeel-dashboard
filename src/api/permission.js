export const getPermissionRequest = (params) => ({
  method: "get",
  url: "permissions",
  config: { params },
});
