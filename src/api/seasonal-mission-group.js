export const getSeasonalMissionGroupsRequest = (params) => ({
  method: "get",
  url: "seasonal_mission_groups",
  config: { params },
});
export const getAllSeasonalMissionGroupsRequest = (params) => ({
  method: "get",
  url: "seasonal_mission_groups?list_all=true",
  config: { params },
});
export const getSeasonalMissionGroupByIdRequest = (params) => ({
  method: "get",
  url: `seasonal_mission_groups/${params}`,
});

export const putUpdateSeasonalMissionGroupRequest = (data, id) => ({
  method: "put",
  url: `seasonal_mission_groups/${id}`,
  config: {
    data,
  },
});
export const postCreateSeasonalMissionGroupRequest = (data) => ({
  method: "post",
  url: "seasonal_mission_groups",
  config: { data },
});
export const deleteSeasonalMissionGroupRequest = (params) => ({
  method: "delete",
  url: `seasonal_mission_groups/${params}`,
});
