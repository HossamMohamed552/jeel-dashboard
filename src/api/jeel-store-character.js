export const getCharactersRequest = (params) => ({
    method: "get",
    url: `store_character`,
    config: {
      params,
    },
  });
  export const getCharacterByIdRequest = (id) => ({
    method: "get",
    url: `store_character/${id}`,
  });
  export const putEditCharacterRequest = (id, data) => ({
    method: "put",
    url: `store_character/${id}`,
    config: {
      data,
    },
  });
  export const postAddCharacterRequest = (data) => ({
    method: "post",
    url: `store_character`,
    config: {
      data,
    },
  });
  export const deleteCharacterRequest = (id) => ({
    method: "delete",
    url: `store_character/${id}`,
  });
