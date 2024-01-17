export const getSchoolsRequest = (params) => ({
  method: "get",
  url: "schools",
  config: {
    params,
  },
});
export const getSchoolOwnerRequest = (params) => ({
  method: "get",
  url: "get_school_owner",
  config: {
    params,
  },
});
export const getSingleSchoolsRequest = (params) => ({
  method: "get",
  url: `schools/${params}`,
});
export const putSchoolsRequest = (params, data) => ({
  method: "put",
  url: `schools/${params}`,
  config: {
    data,
  },
});
export const postSchoolsRequest = (data) => ({
  method: "post",
  url: "schools",
  config: {
    data,
  },
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
export const deleteSchoolsRequest = (params) => ({
  method: "delete",
  url: `schools/${params}`,
});

export const getUsersSearch = (data) => ({
  method: "post",
  url: `school/users`,
  config: {
    data,
  },
});
