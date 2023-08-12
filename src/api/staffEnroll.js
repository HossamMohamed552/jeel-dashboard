export const getStaffEnrollRequest = (params) => ({
  method: 'get',
  url: `enrollments`,
  config: {
    params
  }
})

export const getStaffEnrollUsersRequest = (params) => ({
  method: 'get',
  url: `all_staff?school_id=${params}`,
  config: {}
})

export const getStaffEnrollRolesRequest = (params) => ({
  method: 'get',
  url: `roles?school_id=${params}&system_role=0&system_enrollment=1`,
  config: {}
})

export const getStaffEnrollLevelsRequest = (params) => ({
  method: 'get',
  url: `levels?school_id=${params}`,
  config: {}
})

export const getStaffEnrollClassesRequest = (params) => ({
  method: 'get',
  url: `classes?school_id=${params.schoolId}&level_id=${params.levelId}`,
  config: {}
})


export const getSingleStaffEnrollRequest = (params) => ({
  method: 'get',
  url: `enrollments/${params}`,
})
export const putStaffEnrollRequest = (params,data) => ({
  method: 'put',
  url: `enrollments/${params}`,
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
  url: `enrollments/${params}`,
})
