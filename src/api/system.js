export const getPaperWorkTypeRequest = (params) => ({
  method: "get",
  url: "system_codes/peperwork/type",
  config: { params },
});

export const getQuizTypeListRequest = () => ({
  method: 'get',
  url: 'system_codes/quiz/type'
})

export const getLibraryTypeRequest = (params) => ({
  method: 'get',
  url: 'system_codes/library/type',
  config: {params}
})

export const getStoreLibraryTypeRequest = (params) => ({
  method: 'get',
  url: 'system_codes/store_library/type',
  config: {params}
})

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
