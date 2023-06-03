export const getStaffEnrollRequest = (params) => ({
  method: 'get',
  url: `enrollments?school_id=${params}`,
  config: {}
})

export const getStaffEnrollUsersRequest = (params) => ({
  method: 'get',
  url: `all_staff?school_id=${params}`,
  config: {}
})

export const getStaffEnrollRolesRequest = (params) => ({
  method: 'get',
  url: `roles?school_id=${params}`,
  config: {}
})

export const getStaffEnrollLevelsRequest = (params) => ({
  method: 'get',
  url: `levels?school_id=${params}`,
  config: {}
})

export const getStaffEnrollClassesRequest = (params) => ({
  method: 'get',
  url: `classes?school_id=${params}`,
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
  url: 'enrollments',
  config: {
    data
  }
})
export const deleteStaffEnrollRequest = (params) =>({
  method: 'delete',
  url: `school-types/${params}`,
})
