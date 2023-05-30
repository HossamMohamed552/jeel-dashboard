export const getMissionsRequest = (params) => ({
  method: 'get',
  url: `missions?page=${params.page}`,
  config: {}
})
export const getSingleMissionsRequest = (params) => ({
  method: 'get',
  url: `missions/${params}`,
})
export const putMissionsRequest = (params,data) => ({
  method: 'put',
  url: `missions/${params}`,
  config: {
    data
  }
})
export const postMissionsRequest = (data) => ({
  method: 'post',
  url: 'missions',
  config: {
    data
  }
})
export const deleteMissionsRequest = (params) =>({
  method: 'delete',
  url: `missions/${params}`,
})
