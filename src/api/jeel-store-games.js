export const getJeelStoreGamesRequest = (params) => ({
    method: "get",
    url: `gems`,
    config: {
      params,
    },
  });
  export const getJeelStoreGamesByIdRequest = (id) => ({
    method: "get",
    url: `gems/${id}`,
  });
  export const putEditJeelStoreGamesRequest = (id, data) => ({
    method: "put",
    url: `gems/${id}`,
    config: {
      data,
    },
  });
  export const postAddJeelStoreGamesRequest = (data) => ({
    method: "post",
    url: `gems`,
    config: {
      data,
    },
  });
  export const deleteJeelStoreGamesRequest = (id) => ({
    method: "delete",
    url: `gems/${id}`,
  });
