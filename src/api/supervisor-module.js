export const getLeaderBoardSuperRequest = (params) => ({
  method: "get",
  url: `supervisor/leaderboard`,
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
