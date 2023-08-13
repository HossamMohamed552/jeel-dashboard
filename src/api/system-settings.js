export const getGemPricesRequest = () => ({
  method: "get",
  url: `jeel-gem-prices`,
  config: {},
});
export const putGemPricesRequest = (id, data) => ({
  method: "put",
  url: `jeel-gem-prices/${id}`,
  config: { data },
});
export const getLevelXPRequest = () => ({
  method: "get",
  url: `jeel-level-xps`,
  config: {},
});
export const putLevelXPRequest = (id, data) => ({
  method: "put",
  url: `jeel-level-xps/${id}`,
  config: { data },
});
export const getRewardingActionsRequest = (params) => ({
  method: "get",
  url: `reward-actions`,
  config: {
    params,
  },
});
export const getRewardingActionByIdRequest = (id) => ({
  method: "get",
  url: `reward-actions/${id}`,
  config: {},
});
export const putRewardingActionsRequest = (id, data) => ({
  method: "put",
  url: `reward-actions/${id}`,
  config: { data },
});
