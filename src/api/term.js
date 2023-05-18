export const getTermsRequest = () => ({
  method: 'get',
  url: 'terms',
  config: {}
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
