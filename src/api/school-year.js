export const getSchoolYearRequest = (params) => ({
  method: "get",
  url: "study_years",
  config: {params}
});
export const getSchoolYearByIdRequest = (params) => ({
  method: "get",
  url: `study_years/${params}`,
});

export const putUpdateSchoolsRequest = (params, data) => ({
  method: "put",
  url: `study_years`,
  config: {
    params,
    data,
  },
});
export const postCreateSchoolYearsRequest = (formData) => ({
  method: "post",
  url: "study_years",
  data: formData,
});
export const deleteSchoolYearRequest = (params) => ({
  method: "delete",
  url: `study_years/${params}`,
});
