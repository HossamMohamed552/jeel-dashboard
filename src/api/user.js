export const getAllUsersRequest = (params) => ({
  method: "get",
  url: "users",
  config: {
    params,
  },
});


export const getSchoolUsersRequest = (params) => ({
  method: "get",
  url: "school/users",
  config: {
    params,
  },
});

export const getAllTeachersForSuperVisorRequest = (params) => ({
  method: "get",
  url: `supervisor/teachers/users`,
  config: {
    params,
  },
});
export const getAllStudentsForSuperVisorRequest = (params) => ({
  method: "get",
  url: `supervisor/students/users`,
  config: {
    params,
  },
});

export const getAllSearchUsersRequest = (params) => ({
  method: "get",
  url: "users?list_all=true",
  config: {
    params,
  },
});
export const getSingleUserRequest = (params) => ({
  method: "get",
  url: `users/${params}`,
});

export  const  getTeacherForSuperVisor = (id) => ({
  method: "get",
  url: `supervisor/teacher/${id}`,
})

export  const  getStudentForSuperVisor = (id) => ({
  method: "get",
  url: `supervisor/student/${id}`,
})

export const getRolesRequest = () => ({
  method: "get",
  url: "roles",
  config: {},
});

export const getProfileDataRequest = () => ({
  method: "get",
  url: "users/current",
  config: {},
});
export const getReligionsRequest = () => ({
  method: "get",
  url: "religions",
  config: {},
});
export const getAllRolesRequest = () => ({
  method: "get",
  url: "roles?list_all=true&system_role=1",
  config: {},
});
export const getAllRolesOrganizationRequest = (params) => ({
  method: "get",
  url: "roles?list_all=true",
  config: {
    params
  },
});
export const getAllRolesSystemRequest = () => ({
  method: "get",
  url: "roles?list_all=true&system_role=0",
  config: {},
});
export const postAddUserRequest = (data) => ({
  method: "post",
  url: "users",
  config: {
    data,
  },
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
export const postAddUserSchoolRequest = (data) => ({
  method: "post",
  url: "school/user/create",
  config: {
    data,
  },
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
export const addEditUserRequest = (endpoint, data) => ({
  method: "post",
  url: `${endpoint}`,
  config: {
    data,
  },
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const deleteUserRequest = (id) => ({
  method: "delete",
  url: `users/${id}`,
});

export const postChangePasswordRequest = (id, data) => ({
  method: "post",
  url: `user/${id}/change-password`,
  config: {
    data,
  },
});
export const postChangeStatusRequest = (data) => ({
  method: "post",
  url: "user/change-status",
  config: {
    data,
  },
});
export const postCancelBlockRequest = (data) => ({
  method: "post",
  url: "user/cancel-block",
  config: {
    data,
  },
});
export const deleteProfileImageRequest = (data) => ({
  method: "post",
  url: "user/delete-profile-image",
  config: {
    data,
  },
});
export const postResetPasswordRequest = (data) => ({
  method: "post",
  url: `${process.env.VUE_APP_AUTH_URL}/reset-password`,
  config: {
    data,
  },
});

// daily login for student
export const getDailyLoginRequest = (id,params) => ({
  method: "get",
  url: `user/logins/${id}`,
  config: {
    params
  },
});
