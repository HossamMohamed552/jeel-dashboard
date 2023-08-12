export const getSchoolAdminRequest = (params) => ({
  method: "get",
  url: `list-school-admins`,
  config: {
    params
  }
});
export const postSchoolAdminRequest = (data) => ({
  method: "post",
  url: `add-school-admin`,
  config: {
    data
  }
});
export const deleteSchoolAdminRequest = (data) => ({
  method: "delete",
  url: `remove-school-admin`,
  config: {
    data
  }
});
