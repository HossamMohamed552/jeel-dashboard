export const getPaperWorkTypeRequest = (params) => ({
  method: 'get',
  url: 'system_codes/peperwork/type',
  config: {params}
})

export const getQuizTypeListRequest = () => ({
  method: 'get',
  url: 'system_codes/quiz/type'
})

export const getSortQuizTypeRequest = (params) => ({
  method: 'get',
  url: 'system_codes/quiz/order_type',
})

export const getCharacterTypeRequest = (params) => ({
  method: 'get',
  url: 'system_codes/prize_character/chracter_type',
  config: {params}
})

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
