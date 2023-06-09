export const getCountryRequest = (params) => ({
  method: 'get',
  url: 'countries?per_page=500',
  config: {params}
})
export const getSingleCountryRequest = (params) => ({
  method: 'get',
  url: `countries/${params}`,
})
export const postCountryRequest = (data) => ({
  method: 'post',
  url: 'countries',
  config: {
    data
  }
})
export const putCountryRequest = (params,data) => ({
  method: 'put',
  url: `countries/${params}`,
  config: {
    data
  }
})
export const deleteCountryRequest = (params) => ({
  method: 'delete',
  url: `countries/${params}`,
})
