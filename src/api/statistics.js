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
