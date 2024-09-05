export const getLeaderBoardSuperRequest = (params) => ({
  method: "get",
  url: `supervisor/leaderboard`,
  config: {
    params,
  },
});
export const getTeacherLeaderBoardSuperRequest = (params) => ({
  method: "get",
  url: `teacher/leaderboard`,
  config: {
    params,
  },
});
export const getLeaderBoardSuperTopThreeRequest = (params) => ({
  method: "get",
  url: `supervisor/top-three/leaderboard`,
  config: {
    params,
  },
});
export const getTeacherLeaderBoardSuperTopThreeRequest = (params) => ({
  method: "get",
  url: `teacher/top-three/leaderboard`,
  config: {
    params,
  },
});

export const getStudyYearForSupervisorRequest = (params) => ({
  method: "get",
  url: `supervisor/study-years`,
  config: {
    params,
  },
});
export const getLevelsForSupervisorBasedStudyYearRequest = (params) => ({
  method: "get",
  url: `supervisor/list/levels`,
  config: {
    params,
  },
});
export const getTermsForSupervisorDropDownRequest = (params) => ({
  method: "get",
  url: "supervisor/terms",
  config: { params },
});
export const getClassForSupervisorBasedStudyYearLevelRequest = (params) => ({
  method: "get",
  url: `supervisor/classes`,
  config: {
    params,
  },
});
export const getSupervisorMissionsRequest = (params) => ({
  method: "get",
  url: `supervisor/missions`,
  config: {
    params,
  },
});
export const getSupervisorMissionsStatisticsRequest = (params) => ({
  method: "get",
  url: `supervisor/missions/statistics`,
  config: {
    params,
  },
});
export const getTeacherMissionsStatisticsRequest = (params) => ({
  method: "get",
  url: `teacher/missions/statistics`,
  config: {
    params,
  },
});
export const getSupervisorCompetitionsStatisticsRequest = (params) => ({
  method: "get",
  url: `supervisor/competitions/statistics`,
  config: {
    params,
  },
});
export const getTeacherCompetitionsStatisticsRequest = (params) => ({
  method: "get",
  url: `teacher/competitions/statistics`,
  config: {
    params,
  },
});
