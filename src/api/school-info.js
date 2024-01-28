export const getSchoolInfoRequest = (params) => ({
  method: "get",
  url: "school-admin/school-info",
  config: { params },
});
export const getAllSchoolAdminsUsersRequest = (params) => ({
  method: "get",
  url: "school-admin/schooladmins/users",
  config: {
    params,
  },
});

