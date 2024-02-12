export const getSeasonalMissionRequest = (params) => ({
  method: "get",
  url: "seasonal_missions",
  config: { params },
});
export const getAllSeasonalMissionRequest = (params) => ({
  method: "get",
  url: "seasonal_missions?list_all=true",
  config: { params },
});
export const getSeasonalMissionByIdRequest = (params) => ({
  method: "get",
  url: `seasonal_missions/${params}`,
});

export const putUpdateSeasonalMissionRequest = (data, id) => ({
  method: "put",
  url: `seasonal_missions/${id}`,
  config: {
    data,
  },
});
export const postCreateSeasonalMissionRequest = (data) => ({
  method: "post",
  url: "seasonal_missions",
  config: { data },
});
export const deleteSeasonalMissionRequest = (params) => ({
  method: "delete",
  url: `seasonal_missions/${params}`,
});
