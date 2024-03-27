export const getAllStatisticsRequest = (params) => ({
  method: "get",
  url: "statistics",
  config: {
    params,
  },
});
export const getAllStatisticsSchoolAdminRequest = (params) => ({
  method: "get",
  url: "school-admin/statistics",
  config: {
    params,
  },
});
export const getAllStatisticsTeacherRequest = (params) => ({
  method: "get",
  url: "teacher/statistics",
  config: {
    params,
  },
});
export const getAllStatisticsStudentRequest = (id,params) => ({
  method: "get",
  url: `/parent/student/${id}/statistics`,
  config: {
    params,
  },
});
