export const getAllStatisticsRequest = (params) => ({
  method: "get",
  url: "statistics",
  config: {
    params,
  },
});
