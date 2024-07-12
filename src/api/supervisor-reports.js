export const getSupervisorStudentsPerformanceRequest = (params) => ({
  method: "get",
  url: "supervisor-report/students-performance/reports",
  config: { params },
});

export const getSupervisorStudentsLearningpathsRequest = (params) => ({
  method: "get",
  url: "supervisor-report/students-performance/missions-learningpaths-charts",
  config: { params },
});

export const getSupervisorStudentsChartRequest = (params) => ({
  method: "get",
  url: "supervisor-report/students-performance/missions-contents-charts",
  config: { params },
});

export const getSupervisorClassReportsRequest = (params) => ({
  method: "get",
  url: "supervisor-report/class-performance/reports",
  config: { params },
});
export const getSupervisorClassLearningpathsRequest = (params) => ({
  method: "get",
  url: "supervisor-report/class-performance/missions-learningpaths-charts",
  config: { params },
});
export const getSupervisorClassChartRequest = (params) => ({
  method: "get",
  url: "supervisor-report/class-performance/missions-contents-charts",
  config: { params },
});
