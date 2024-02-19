export const getSchoolInfoRequest = (params) => ({
  method: "get",
  url: "school-admin/school-info",
  config: {params},
});
export const getAllSchoolUsersRequest = (params) => ({
  method: "get",
  url: "school-admin/users",
  config: {
    params,
  },
});
export const getSingleSchoolUserRequest = (params) => ({
  method: "get",
  url: `school-admin/users/${params}`,
});
export const addEditSchoolUserRequest = (endpoint, data) => ({
  method: "post",
  url: `${endpoint}`,
  config: {
    data,
  },
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
export const deleteSchoolUserRequest = (params) => ({
  method: "delete",
  url: `school-admin/users/${params}`,
});
export const postChangePasswordSchoolUserRequest = (id, data) => ({
  method: "post",
  url: `school-admin/users/${id}`,
  config: {
    data,
  },
});

export const postCancelBlockSchoolUserRequest = (data) => ({
  method: "post",
  url: `school-admin/users`,
  config: {
    data,
  },
});
export const getAllSchoolAdminsUsersRequest = (params) => ({
  method: "get",
  url: "school-admin/schooladmins/users",
  config: {
    params,
  },
});

export const getAllSupervisorUsersRequest = (params) => ({
  method: "get",
  url: "school-admin/supervisors/users",
  config: {
    params,
  },
});
export const getAllTeacherUsersRequest = (params) => ({
  method: "get",
  url: "school-admin/teachers/users",
  config: {
    params,
  },
});
export const getAllStudentUsersRequest = (params) => ({
  method: "get",
  url: "school-admin/students/users",
  config: {
    params,
  },
});
export const getAllStudentUsersListTrueRequest = (params) => ({
  method: "get",
  url: "school-admin/students/users?list_all=true",
  config: {
    params,
  },
});
export const getAllParentUsersRequest = (params) => ({
  method: "get",
  url: "/school-admin/parents/users",
  config: {
    params,
  },
});

export const getAllClassesRequest = (params) => ({
  method: "get",
  url: "classes",
  config: {
    params,
  },
});
export const getClassByIdRequest = (id, params) => ({
  method: "get",
  url: `classes/${id}`,
  config: {
    params,
  },
});
export const postAddSchoolClassRequest = (data) => ({
  method: "post",
  url: `classes`,
  config: {
    data,
  },
});
export const putSchoolClassRequest = (id, data) => ({
  method: "put",
  url: `classes/${id}`,
  config: {
    data,
  },
});
export const getSchoolClassByIdRequest = (id) => ({
  method: "get",
  url: `classes/${id}`,
});

export const deleteSchoolAdminClassRequest = (id) => ({
  method: "delete",
  url: `classes/${id}`,
});
export const getStudyYearsRequest = (data) => ({
  method: "get",
  url: `school/study_years`,
  config: {
    data,
  },
});
export const getLevelsRequest = (data) => ({
  method: "get",
  url: `school/levels`,
  config: {
    data,
  },
});
export const getSchoolAdminUserRequest = (id, data) => ({
  method: "get",
  url: `school-admin/users/${id}`,
  config: {
    data,
  },
});
// add enrollment

export const postSchoolAdminEnrollmentRequest = (data) => ({
  method: "post",
  url: `school_admin_enrollments`,
  config: {
    data,
  },
});
export const postSuperVisorEnrollmentRequest = (data) => ({
  method: "post",
  url: `supervisorEnrollment`,
  config: {
    data,
  },
});
export const postTeacherEnrollmentRequest = (data) => ({
  method: "post",
  url: `teacher_enrollments`,
  config: {
    data,
  },
});
export const postStudentEnrollmentRequest = (data) => ({
  method: "post",
  url: `class_students`,
  config: {
    data,
  },
});
// delete enrollment
export const deleteSchoolAdminEnrollmentRequest = (id, data) => ({
  method: "delete",
  url: `school_admin_enrollments/${id}`,
  config: {
    data,
  },
});
export const deleteSupervisorEnrollmentRequest = (id, data) => ({
  method: "delete",
  url: `supervisorEnrollment/${id}`,
  config: {
    data,
  },
});
export const deleteTeacherEnrollmentRequest = (id, data) => ({
  method: "delete",
  url: `teacher_enrollments/${id}`,
  config: {
    data,
  },
});
export const deleteStudentEnrollmentRequest = (id, data) => ({
  method: "delete",
  url: `class_students/${id}`,
  config: {
    data,
  },
});
// list enrollment school admin
export const getSchoolAdminUsersRequest = (id, params) => ({
  method: "get",
  url: `user/${id}/school_admin_enrollments`,
  config: {
    params,
  },
});
export const getSuperVisorUsersRequest = (id, params) => ({
  method: "get",
  url: `user/${id}/supervisorEnrollment`,
  config: {
    params,
  },
});
export const geTeacherUsersRequest = (id, params) => ({
  method: "get",
  url: `user/${id}/teacher_enrollments`,
  config: {
    params,
  },
});
export const getStudentsUsersRequest = (id, params) => ({
  method: "get",
  url: `user/${id}/class_students`,
  config: {
    params,
  },
});
// get user detail
export const getUsersSchoolAdminRequest = (id, params) => ({
  method: "get",
  url: `school-admin/users/${id}`,
  config: {
    params,
  },
});
export const getUsersStudentSchoolAdminRequest = (id, params) => ({
  method: "get",
  url: `school-admin/student/${id}`,
  config: {
    params,
  },
});
export const getUsersTeacherRequest = (id, params) => ({
  method: "get",
  url: `school-admin/teacher/${id}`,
  config: {
    params,
  },
});
// add users
export const postAddUserSchoolRequest = (data) => ({
  method: "post",
  url: "/school-admin/user/create",
  config: {
    data,
  },
});

export const getStudentForParentUserRequest = (id, data) => ({
  method: "get",
  url: `school-admin/parent/${id}/students`,
  config: {
    data,
  },
})

export const postStudentForParentRequest = (data) => ({
  method: "post",
  url: `students_parents`,
  config: {
    data,
  },
})
export const getParentForStudentUserRequest = (id, data) => ({
  method: "get",
  url: `school-admin/student/${id}/parents`,
  config: {
    data,
  },
})
export const deleteStudentParentEnrollmentRequest = (id, data) => ({
  method: "delete",
  url: `students_parents/${id}`,
  config: {
    data,
  },
});
