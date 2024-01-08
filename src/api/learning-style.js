export const getLearningStyleRequest = (params) => ({
  method: "get",
  url: "language_methods",
  config: { params },
});
export const getLearningStyleByIdRequest = (params) => ({
  method: "get",
  url: `language_methods/${params}`,
});

export const putUpdateLearningStyleRequest = (data, id) => ({
  method: "put",
  url: `language_methods/${id}`,
  config: {
    data,
  },
});
export const postCreateLearningStyleRequest = (data) => ({
  method: "post",
  url: "language_methods",
  config: { data },
});
export const deleteLearningStyleRequest = (params) => ({
  method: "delete",
  url: `language_methods/${params}`,
});
