export const getPaperWorkTypeRequest = (params) => ({
  method: 'get',
  url: 'system_codes/peperwork/type',
  config: {params}
})

export const getLibraryTypeRequest = (params) => ({
  method: 'get',
  url: 'system_codes/library/type',
  config: {params}
})
