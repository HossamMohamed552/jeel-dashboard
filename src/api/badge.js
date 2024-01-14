export const getBadgesRequest = (params) => ({
  method: "get",
  url: `badge`,
  config: {
    params,
  },
});
export const getBadgeByIdRequest = (id) => ({
  method: "get",
  url: `badge/${id}`,
});
export const putEditBadgeRequest = (id, data) => ({
  method: "put",
  url: `badge/${id}`,
  config: {
    data,
  },
});
export const postAddBadgeRequest = (data) => ({
  method: "post",
  url: `badge`,
  config: {
    data,
  },
});
export const deleteBadgeRequest = (id) => ({
  method: "delete",
  url: `badge/${id}`,
});
export const getAllBadgesRequest = (params) => ({
  method: "get",
  url: `badge?list_all=ture`,
});
export const getLibraryTypesRequest = (params) => ({
  method: "get",
  url: `system_codes/library/type`,
});

export const getLibraryContentRequest = (params) => ({
  method: "get",
  url: `library`,
  config: {
    params,
  },
});
