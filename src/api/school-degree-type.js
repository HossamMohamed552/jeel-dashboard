export const getSchoolDegreeTypesRequest = (params) => ({
  method: "get",
  url: "certificates",
  config: { params },
});
export const getSchoolDegreeTypeByIdRequest = (params) => ({
  method: "get",
  url: `certificates/${params}`,
});

export const putUpdateSchoolDegreeTypeRequest = (data, id) => ({
  method: "put",
  url: `certificates/${id}`,
  config: {
    data,
  },
});
export const postCreateSchoolDegreeTypeRequest = (data) => ({
  method: "post",
  url: "certificates",
  config: { data },
});
export const deleteSchoolDegreeTypeRequest = (params) => ({
  method: "delete",
  url: `certificates/${params}`,
});
