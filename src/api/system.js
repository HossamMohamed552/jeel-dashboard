export const getPaperWorkTypeRequest = (params) => ({
  method: "get",
  url: "system_codes/peperwork/type",
  config: { params },
});

export const getQuizTypeListRequest = () => ({
  method: "get",
  url: "system_codes/quiz/type",
});

export const getLibraryTypeRequest = (params) => ({
  method: "get",
  url: "system_codes/library/type",
  config: { params },
});
export const getLibraryContentRequest = (params) => ({
  method: "get",
  url: `library?type=[${params}]`,
});
export const getCharacterContentRequest = (params) => ({
  method: "get",
  url: `prize_character?type=[${params}]`,
});

export const getSortQuizTypeRequest = (params) => ({
  method: "get",
  url: "system_codes/quiz/order_type",
});
export const getAllGenderRequest = () => ({
  method: "get",
  url: "system_codes/user/gender",
});
export const getAllReligionRequest = () => ({
  method: "get",
  url: "system_codes/user/religion",
});

export const getCharacterTypeRequest = (params) => ({
  method: "get",
  url: "system_codes/prize_character/chracter_type",
  config: { params },
});

export const getStoreCharacterTypeRequest = (params) => ({
  method: "get",
  url: "system_codes/store_character/chracter_type",
  config: { params },
});

export const getAllStatusRequest = (params) => ({
  method: "get",
  url: "system_codes/school/status",
  config: { params },
});
export const getAllUserStatusRequest = (params) => ({
  method: "get",
  url: "system_codes/user/status",
  config: { params },
});
export const getAllMusicStatusRequest = (params) => ({
  method: "get",
  url: "system_codes/school/music_status",
  config: { params },
});
export const getAllStudentsTypeRequest = (params) => ({
  method: "get",
  url: "system_codes/school/students_type",
  config: { params },
});
export const getAllRolesTypeRequest = (params) => ({
  method: "get",
  url: "system_codes/role/type",
  config: { params },
});
export const getAllRolesByTypeRequest = (params) => ({
  method: "get",
  url: `/roles`,
  config: { params },
});
export const getAllTaskTypeRequest = (params) => ({
  method: "get",
  url: `system_codes/task/type`,
  config: { params },
});
export const getAllPrizeSeasonalMissionTypeRequest = (params) => ({
  method: "get",
  url: `system_codes/prize_seasonal_mission/type`,
  config: { params },
});
