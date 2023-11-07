export const getOutcomeCategoriesRequest = (params) => ({
  method: "get",
  url: `outcome`,
  config: {
    params,
  },
});
export const getAllOutcomesRequest = (params) => ({
  method: 'get',
  url: `outcome?&learning_path_id=${params.learning_path_id}&level_id=${params.level_id}list_all=ture`,
  config: {}
})
export const getOutcomeCategoryByIdRequest = (id) => ({
  method: "get",
  url: `outcome/${id}`,
});
export const putEditOutcomeCategoryRequest = (id, data) => ({
  method: "put",
  url: `outcome/${id}`,
  config: {
    data,
  },
});
export const postAddOutcomeCategoriesRequest = (data) => ({
  method: "post",
  url: `outcome`,
  config: {
    data,
  },
});
export const deleteOutcomeRequest = (id) => ({
  method: "delete",
  url: `outcome/${id}`,
});
