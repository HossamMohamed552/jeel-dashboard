export const getObjectiveCategoriesRequest = (params) => ({
  method: "get",
  url: `objective`,
  config: {
    params,
  },
});
export const getObjectiveCategoryByIdRequest = (id) => ({
  method: "get",
  url: `objective/${id}`,
});
export const putEditObjectiveCategoryRequest = (id, data) => ({
  method: "put",
  url: `objective/${id}`,
  config: {
    data,
  },
});
export const postAddObjectiveCategoriesRequest = (data) => ({
  method: "post",
  url: `objective`,
  config: {
    data,
  },
});
export const deleteObjectiveRequest = (id) => ({
  method: "delete",
  url: `objective/${id}`,
});
