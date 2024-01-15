export const getJeelLibraryRequest = (params) => ({
    method: "get",
    url: `library`,
    config: {
      params,
    },
  });
  export const getJeelLibraryByIdRequest = (id) => ({
    method: "get",
    url: `library/${id}`,
  });
  export const putEditJeelLibraryRequest = (id, data) => ({
    method: "put",
    url: `library/${id}`,
    config: {
      data,
    },
  });
  export const postAddJeelLibraryRequest = (data) => ({
    method: "post",
    url: `library`,
    config: {
      data,
    },
  });
  export const deleteJeelLibraryRequest = (id) => ({
    method: "delete",
    url: `library/${id}`,
  });
