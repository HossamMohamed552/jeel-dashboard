export const getJeelStoreLibraryRequest = (params) => ({
    method: "get",
    url: `store_library`,
    config: {
      params,
    },
  });
  export const getJeelStoreLibraryByIdRequest = (id) => ({
    method: "get",
    url: `store_library/${id}`,
  });
  export const putEditJeelStoreLibraryRequest = (id, data) => ({
    method: "put",
    url: `store_library/${id}`,
    config: {
      data,
    },
  });
  export const postAddJeelStoreLibraryRequest = (data) => ({
    method: "post",
    url: `store_library`,
    config: {
      data,
    },
  });
  export const deleteJeelStoreLibraryRequest = (id) => ({
    method: "delete",
    url: `store_library/${id}`,
  });
