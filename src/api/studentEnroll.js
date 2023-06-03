export const getStudentEnrollRequest = (params) => ({
  method: 'get',
  url: `class_students`,
  config: {
    params
  }
})

export const getStudentEnrollUsersRequest = (params) => ({
  method: 'get',
  url: `all_students?school_id=${params}`,
  config: {}
})

export const getStudentEnrollClassesRequest = (params) => ({
  method: 'get',
  url: `classes?school_id=${params}`,
  config: {}
})

export const getSingleStudentEnrollRequest = (params) => ({
  method: 'get',
  url: `class_students/${params}`,
})
export const putStudentEnrollRequest = (params,data) => ({
  method: 'put',
  url: `class_students/${params}`,
  config: {
    data
  }
})
export const postStudentEnrollRequest = (data) => ({
  method: 'post',
  url: 'class_students',
  config: {
    data
  }
})
export const deleteStudentEnrollRequest = (params) =>({
  method: 'delete',
  url: `class_students/${params}`,
})
