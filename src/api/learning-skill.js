export const getLearningSkillsRequest = (params) => ({
  method: "get",
  url: "language_skills",
  config: { params },
});
export const getAllLearningSkillsRequest = (params) => ({
  method: "get",
  url: "language_skills?list_all=true",
  config: { params },
});
export const getLearningSkillByIdRequest = (params) => ({
  method: "get",
  url: `language_skills/${params}`,
});

export const putUpdateLearningSkillRequest = (data, id) => ({
  method: "put",
  url: `language_skills/${id}`,
  config: {
    data,
  },
});
export const postCreateLearningSkillRequest = (data) => ({
  method: "post",
  url: "language_skills",
  config: { data },
});
export const deleteLearningSkillRequest = (params) => ({
  method: "delete",
  url: `language_skills/${params}`,
});
