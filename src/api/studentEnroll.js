export const getStudentEnrollRequest = () => ({
  method: 'get',
  url: 'school-types',
  config: {}
})
export const getSingleStudentEnrollRequest = (params) => ({
  method: 'get',
  url: `school-types/${params}`,
})
export const putStudentEnrollRequest = (params,data) => ({
  method: 'put',
  url: `school-types/${params}`,
  config: {
    data
  }
})
export const postStudentEnrollRequest = (data) => ({
  method: 'post',
  url: 'school-types',
  config: {
    data
  }
})
export const deleteStudentEnrollRequest = (params) =>({
  method: 'delete',
  url: `school-types/${params}`,
})
