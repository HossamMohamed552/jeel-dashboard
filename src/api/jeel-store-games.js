export const getJeelStoreGamesRequest = (params) => ({
    method: "get",
    url: `power_up_boxes`,
    config: {
      params,
    },
  });
  export const getJeelStoreGamesByIdRequest = (id) => ({
    method: "get",
    url: `power_up_boxes/${id}`,
  });
  export const putEditJeelStoreGamesRequest = (id, data) => ({
    method: "put",
    url: `power_up_boxes/${id}`,
    config: {
      data,
    },
  });
  export const postAddJeelStoreGamesRequest = (data) => ({
    method: "post",
    url: `power_up_boxes`,
    config: {
      data,
    },
  });
  export const deleteJeelStoreGamesRequest = (id) => ({
    method: "delete",
    url: `power_up_boxes/${id}`,
  });
