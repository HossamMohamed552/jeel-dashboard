export const getSchoolDepartmentTypesRequest = (params) => ({
  method: "get",
  url: "management_types",
  config: { params },
});
export const getSchoolDepartmentTypeByIdRequest = (params) => ({
  method: "get",
  url: `management_types/${params}`,
});

export const putUpdateSchoolDepartmentTypeRequest = (data, id) => ({
  method: "put",
  url: `management_types/${id}`,
  config: {
    data,
  },
});
export const postCreateSchoolDepartmentTypeRequest = (data) => ({
  method: "post",
  url: "management_types",
  config: { data },
});
export const deleteSchoolDepartmentTypeRequest = (params) => ({
  method: "delete",
  url: `management_types/${params}`,
});
