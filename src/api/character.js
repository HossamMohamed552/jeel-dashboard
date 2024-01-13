export const getCharactersRequest = (params) => ({
    method: "get",
    url: `prize_character`,
    config: {
      params,
    },
  });
  export const getCharacterByIdRequest = (id) => ({
    method: "get",
    url: `prize_character/${id}`,
  });
  export const putEditCharacterRequest = (id, data) => ({
    method: "put",
    url: `prize_character/${id}`,
    config: {
      data,
    },
  });
  export const postAddCharacterRequest = (data) => ({
    method: "post",
    url: `prize_character`,
    config: {
      data,
    },
  });
  export const deleteCharacterRequest = (id) => ({
    method: "delete",
    url: `prize_character/${id}`,
  });
  