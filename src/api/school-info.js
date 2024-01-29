export const getSchoolInfoRequest = (params) => ({
  method: "get",
  url: "school-admin/school-info",
  config: { params },
});
export const getAllSchoolUsersRequest = (params) => ({
  method: "get",
  url: "school-admin/users",
  config: {
    params,
  },
});
export const getAllSchoolAdminsUsersRequest = (params) => ({
  method: "get",
  url: "school-admin/schooladmins/users",
  config: {
    params,
  },
});

export const getAllSupervisorUsersRequest = (params) => ({
  method: "get",
  url: "school-admin/supervisors/users",
  config: {
    params,
  },
});
export const getAllTeacherUsersRequest = (params) => ({
  method: "get",
  url: "school-admin/teachers/users",
  config: {
    params,
  },
});
export const getAllStudentUsersRequest = (params) => ({
  method: "get",
  url: "school-admin/students/users",
  config: {
    params,
  },
});
