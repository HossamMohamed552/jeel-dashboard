export const getSchoolAdminReportStatisticsRequest = (params) => ({
  method: "get",
  url: "school-admin-report/platform-general/statistics",
  config: { params },
});
export const getSchoolAdminReportChartRequest = (params) => ({
  method: "get",
  url: "school-admin-report/platform-general/chart",
  config: { params },
});
export const getSchoolAdminSubscriptionsRequest = (params) => ({
  method: "get",
  url: "school-admin-report/subscriptions/report",
  config: { params },
});
export const getSchoolAdminSubscriptionsChartRequest = (params) => ({
  method: "get",
  url: "school-admin-report/subscriptions/chart",
  config: { params },
});
export const getSchoolAdminMissionsRequest = (params) => ({
  method: "get",
  url: "school-admin-report/missions/report",
  config: { params },
});
export const getSchoolAdminMissionsChartRequest = (params) => ({
  method: "get",
  url: "school-admin-report/missions/chart",
  config: { params },
});
export const getSchoolAdminCompetitionsRequest = (params) => ({
  method: "get",
  url: "school-admin-report/competitions/report",
  config: { params },
});
export const getSchoolAdminCompetitionsChartRequest = (params) => ({
  method: "get",
  url: "school-admin-report/competitions/study-years/chart",
  config: { params },
});

export const getSchoolAdminStudentsRequest = (params) => ({
  method: "get",
  url: "school-admin-report/students-performance/reports",
  config: { params },
});
export const getSchoolAdminStudentsChartsRequest = (params) => ({
  method: "get",
  url: "school-admin-report/students-performance/missions-learningpaths-charts",
  config: { params },
});
export const getSchoolAdminStudentsMissionsContentsChartsRequest = (params) => ({
  method: "get",
  url: "school-admin-report/students-performance/missions-contents-charts",
  config: { params },
});

export const getSchoolAdminClassesRequest = (params) => ({
  method: "get",
  url: "school-admin-report/class-performance/reports",
  config: { params },
});

export const getSchoolAdminClassesChartsRequest = (params) => ({
  method: "get",
  url: "school-admin-report/class-performance/missions-learningpaths-charts",
  config: { params },
});
export const getSchoolAdminClassesMissionsContentsChartsRequest = (params) => ({
  method: "get",
  url: "school-admin-report/class-performance/missions-contents-charts",
  config: { params },
});

