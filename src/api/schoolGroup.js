export const getSchoolGroupRequest = () => ({
  method: 'get',
  url: 'school-groups',
  config: {}
})
export const getSingleSchoolGroupRequest = (params) => ({
  method: 'get',
  url: `school-groups/${params}`,
})
export const putSchoolGroupRequest = (params,data) => ({
  method: 'put',
  url: `school-groups/${params}`,
  config: {
    data
  }
})
export const postSchoolGroupRequest = (data) => ({
  method: 'post',
  url: 'school-groups',
  config: {
    data
  }
})
export const deleteSchoolGroupRequest = (params) =>({
  method: 'delete',
  url: `school-groups/${params}`,
})
