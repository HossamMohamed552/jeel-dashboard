export const getTeacherStudentsPerformanceRequest = (params) => ({
  method: "get",
  url: "teacher-report/students-performance/reports",
  config: { params },
});

export const getTeacherStudentsLearningpathsRequest = (params) => ({
  method: "get",
  url: "teacher-report/students-performance/missions-learningpaths-charts",
  config: { params },
});

export const getTeacherStudentsChartRequest = (params) => ({
  method: "get",
  url: "teacher-report/students-performance/missions-contents-charts",
  config: { params },
});

export const getTeacherClassReportsRequest = (params) => ({
  method: "get",
  url: "teacher-report/class-performance/reports",
  config: { params },
});
export const getTeacherClassLearningpathsRequest = (params) => ({
  method: "get",
  url: "teacher-report/class-performance/missions-learningpaths-charts",
  config: { params },
});
export const getTeacherClassChartRequest = (params) => ({
  method: "get",
  url: "teacher-report/class-performance/missions-contents-charts",
  config: { params },
});
