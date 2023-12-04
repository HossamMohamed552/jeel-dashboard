export const getCompetitionRequest = (params) => ({
  method: "get",
  url: `competition`,
  config: {
    params,
  },
});
export const getCompetitionByIdRequest = (id) => ({
  method: "get",
  url: `competition/${id}`,
});
export const putEditCompetitionRequest = (id, data) => ({
  method: "put",
  url: `competition/${id}`,
  config: {
    data,
  },
});
export const postAddCompetitionRequest = (data) => ({
  method: "post",
  url: `competition`,
  config: {
    data,
  },
});
export const deleteCompetitionRequest = (id) => ({
  method: "delete",
  url: `competition/${id}`,
});
