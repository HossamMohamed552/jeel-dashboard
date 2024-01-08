export const getTermsRequest = (params) => ({
  method: 'get',
  url: 'terms',
  config: {params}
})
export const getAllTermsRequest = (params) => ({
  method: 'get',
  url: 'terms?list_all=true',
  config: {params}
})
export const getSingleTermsRequest = (params) => ({
  method: 'get',
  url: `terms/${params}`,
})
export const putTermsRequest = (params,data) => ({
  method: 'put',
  url: `terms/${params}`,
  config: {
    data
  }
})
export const postTermsRequest = (data) => ({
  method: 'post',
  url: 'terms',
  config: {
    data
  }
})
export const deleteTermsRequest = (params) =>({
  method: 'delete',
  url: `terms/${params}`,
})
