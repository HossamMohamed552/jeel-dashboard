export const getSchoolTypesRequest = (params) => ({
  method: 'get',
  url: 'school-types',
  config: {params}
})
export const getAllSchoolTypesRequest = (params) => ({
  method: 'get',
  url: 'school-types?list_all=true',
  config: {params}
})
export const getSingleSchoolTypesRequest = (params) => ({
  method: 'get',
  url: `school-types/${params}`,
})
export const putSchoolTypesRequest = (params,data) => ({
  method: 'put',
  url: `school-types/${params}`,
  config: {
    data
  }
})
export const postSchoolTypesRequest = (data) => ({
  method: 'post',
  url: 'school-types',
  config: {
    data
  }
})
export const deleteSchoolTypesRequest = (params) =>({
  method: 'delete',
  url: `school-types/${params}`,
})
