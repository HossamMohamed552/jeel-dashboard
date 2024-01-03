export const getPaperWorkTypeRequest = (params) => ({
  method: 'get',
  url: 'system_codes/peperwork/type',
  config: {params}
})
export const getSortQuizTypeRequest = (params) => ({
  method: 'get',
  url: 'system_codes/quiz/order_type',
  config: {params}
})
