export const getClassRequest = () => ({
  method: 'get',
  url: 'school-types',
  config: {}
})
export const getSingleClassRequest = (params) => ({
  method: 'get',
  url: `school-types/${params}`,
})
export const putClassRequest = (params,data) => ({
  method: 'put',
  url: `school-types/${params}`,
  config: {
    data
  }
})
export const postClassRequest = (data) => ({
  method: 'post',
  url: 'school-types',
  config: {
    data
  }
})
export const deleteClassRequest = (params) =>({
  method: 'delete',
  url: `school-types/${params}`,
})
