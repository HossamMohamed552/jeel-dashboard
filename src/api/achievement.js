export const getAchievementRequest = (params) => ({
  method: "get",
  url: `achievement`,
  config: {
    params,
  },
});
export const getInteractionTypesRequest = (params) => ({
  method: "get",
  url: `system_codes/achievement/interaction`,
});

export const postAchievementRequest = (data) => ({
  method: "post",
  url: `achievement`,
  config: {
    data,
  },
});
export const putEditAchievementRequest = (id, data) => ({
  method: "put",
  url: `achievement/${id}`,
  config: {
    data,
  },
});
export const getAchievementByIdRequest = (id) => ({
  method: "get",
  url: `achievement/${id}`,
});
export const deleteAchievementRequest = (id) => ({
  method: "delete",
  url: `achievement/${id}`,
});
