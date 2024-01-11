export const getPaperWorkTypeRequest = (params) => ({
  method: 'get',
  url: 'system_codes/peperwork/type',
  config: {params}
})

export const getCharacterTypeRequest = (params) => ({
  method: 'get',
  url: 'system_codes/prize_character/chracter_type',
  config: {params}
})
