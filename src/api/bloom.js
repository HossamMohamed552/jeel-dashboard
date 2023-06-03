export const getBloomCategoriesRequest = (params) => ({
  method: "get",
  url: `bloom_categories`,
  config: {
    params,
  },
});
export const getBloomCategoryByIdRequest = (id) => ({
  method: "get",
  url: `bloom_categories/${id}`,
});
export const putEditBloomCategoryRequest = (id, data) => ({
  method: "put",
  url: `bloom_categories/${id}`,
  config: {
    data,
  },
});
export const postAddBloomCategoriesRequest = (data) => ({
  method: "post",
  url: `bloom_categories`,
  config: {
    data,
  },
});
export const deleteBloomRequest = (id) => ({
  method: "delete",
  url: `bloom_categories/${id}`,
});
