export const getLessonsRequest = (params) => ({
  method: "get",
  url: `lesson`,
  config: {
    params,
  },
});
export const getAllLessonsRequest = (params) => ({
  method: "get",
  url: `lesson?list_all=true`,
  config: {
    params,
  },
});
export const getLessonsDepenseLearningPathRequest = (params) => ({
  method: "get",
  url: `lesson?${params}`,
});
export const getLessonByIdRequest = (id) => ({
  method: "get",
  url: `lesson/${id}`,
});
export const putEditLessonRequest = (id, data) => ({
  method: "put",
  url: `lesson/${id}`,
  config: {
    data,
  },
});
export const postAddLessonRequest = (data) => ({
  method: "post",
  url: `lesson`,
  config: {
    data,
  },
});
export const deleteLessonRequest = (id) => ({
  method: "delete",
  url: `lesson/${id}`,
});
export const getLessonsByLearningPathRequest = (params) => ({
  method: "get",
  url: `lesson`,
  config: {
    params,
  },
});
