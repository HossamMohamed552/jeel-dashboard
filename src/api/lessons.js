export const getLessonsRequest = () => ({
  method: "get",
  url: `lesson`,
  config: {
    
  },
});
// export const getAllLessonsRequest = (params) => ({
//   method: 'get',
//   url: `outcome?&learning_path_id=${params.learning_path_id}&level_id=${params.level_id}list_all=ture`,
//   config: {}
// })
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
