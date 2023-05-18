export const getPackagesRequest = () => ({
  method: 'get',
  url: 'packages',
  config: {}
})
export const getSinglePackagesRequest = (params) => ({
  method: 'get',
  url: `packages/${params}`,
})
export const putPackagesRequest = (params,data) => ({
  method: 'put',
  url: `packages/${params}`,
  config: {
    data
  }
})
export const postPackagesRequest = (data) => ({
  method: 'post',
  url: 'packages',
  config: {
    data
  }
})
export const deletePackagesRequest = (params) =>({
  method: 'delete',
  url: `packages/${params}`,
})
