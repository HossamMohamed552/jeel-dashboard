export const getStaffEnrollRequest = () => ({
  method: 'get',
  url: 'school-types',
  config: {}
})
export const getSingleStaffEnrollRequest = (params) => ({
  method: 'get',
  url: `school-types/${params}`,
})
export const putStaffEnrollRequest = (params,data) => ({
  method: 'put',
  url: `school-types/${params}`,
  config: {
    data
  }
})
export const postStaffEnrollRequest = (data) => ({
  method: 'post',
  url: 'school-types',
  config: {
    data
  }
})
export const deleteStaffEnrollRequest = (params) =>({
  method: 'delete',
  url: `school-types/${params}`,
})
