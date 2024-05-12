export const getJeelAdminReportStatisticsRequest = (params) => ({
  method: "get",
  url: "jeel-admin-report/platform-general/statistics",
  config: { params },
});
export const getJeelAdminReportChartRequest = (params) => ({
  method: "get",
  url: "jeel-admin-report/platform-general/chart",
  config: { params },
});
export const getJeelAdminReportRolesRequest = (params) => ({
  method: "get",
  url: "jeel-admin-report/platform-general/roles-statistics",
  config: { params },
});
export const getSubscriptionsRequest = (params) => ({
  method: "get",
  url: "jeel-admin-report/subscriptions/report",
  config: { params },
});
export const getSubscriptionsChartRequest = (params) => ({
  method: "get",
  url: "jeel-admin-report/subscriptions/chart",
  config: { params },
});
export const getMissionsRequest = (params) => ({
  method: "get",
  url: "jeel-admin-report/missions/report",
  config: { params },
});
export const getMissionsChartRequest = (params) => ({
  method: "get",
  url: "jeel-admin-report/missions/chart",
  config: { params },
});
