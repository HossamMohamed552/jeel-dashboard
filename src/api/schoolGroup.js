export const getSchoolGroupRequest = (params) => ({
  method: "get",
  url: "school-groups",
  config: { params },
});
export const getAllSchoolGroupRequest = (params) => ({
  method: "get",
  url: "school-groups?list_all=true",
  config: { params },
});
export const getSingleSchoolGroupRequest = (params) => ({
  method: "get",
  url: `school-groups/${params}/full-details`,
});
export const putSchoolGroupRequest = (params, data) => ({
  method: "put",
  url: `school-groups/${params}`,
  config: {
    data,
  },
});
export const postSchoolGroupRequest = (data) => ({
  method: "post",
  url: "school-groups",
  config: {
    data,
  },
});
export const deleteSchoolGroupRequest = (params) => ({
  method: "delete",
  url: `school-groups/${params}`,
});

export const getSchoolGroupMusicStatusEnum = () => ({
  method: "get",
  url: "system_codes/school_group/music_status",
});
export const getSchoolGroupTypesEnum = () => ({
  method: "get",
  url: "system_codes/school_group/type",
});
export const getSchoolGroupStatusEnum = () => ({
  method: "get",
  url: "system_codes/school_group/status",
});
export const getSchoolGroupById = (id) => ({
  method: "get",
  url: `school-groups/${id}`,
});
