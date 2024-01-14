export const getJeelStoreLibraryRequest = (params) => ({
    method: "get",
    url: `power_up_boxes`,
    config: {
      params,
    },
  });
  export const getJeelStoreLibraryByIdRequest = (id) => ({
    method: "get",
    url: `power_up_boxes/${id}`,
  });
  export const putEditJeelStoreLibraryRequest = (id, data) => ({
    method: "put",
    url: `power_up_boxes/${id}`,
    config: {
      data,
    },
  });
  export const postAddJeelStoreLibraryRequest = (data) => ({
    method: "post",
    url: `power_up_boxes`,
    config: {
      data,
    },
  });
  export const deleteJeelStoreLibraryRequest = (id) => ({
    method: "delete",
    url: `power_up_boxes/${id}`,
  });
