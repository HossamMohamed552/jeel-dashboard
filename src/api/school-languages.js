export const getSchoolLanguagesRequest = (params) => ({
  method: "get",
  url: "languages",
  config: { params },
});
export const getSchoolLanguageByIdRequest = (params) => ({
  method: "get",
  url: `languages/${params}`,
});

export const putUpdateSchoolLanguageRequest = (data, id) => ({
  method: "put",
  url: `languages/${id}`,
  config: {
    data,
  },
});
export const postCreateSchoolLanguageRequest = (data) => ({
  method: "post",
  url: "languages",
  config: { data },
});
export const deleteSchoolLanguageRequest = (params) => ({
  method: "delete",
  url: `languages/${params}`,
});
