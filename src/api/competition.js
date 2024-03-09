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

export const getMissionForCompetitonRequest = (params) => ({
  method: "get",
  url: `missions_out_of_date?level_id=${params}`,
});

export const getGoalsForCompetitonRequest = (missions) => ({
  method: "get",
  url: `competition/mission/${missions}/objectives`,
});

export const getOutcomesForCompetitonRequest = (missions) => ({
  method: "get",
  url: `competition/mission/${missions}/outcomes`,
});

export const getCompetitonQuestionNumberRequest = (params) => ({
  method: "get",
  url: "missions/questions/info",
  config: {
    params,
  },
});

export const getRandomQuestionRequest = (data) => ({
  method: "post",
  url: "random/competition/questions",
  config: {
    data,
  },
});
export const getSingleCompetitionQuestionRequest = (params) => ({
  method: "get",
  url: `competition/questions/${params}`,
});

export const getArrangmentListRequest = (params) => ({
  method: "get",
  url: "arrangments",
  config: {
    params,
  },
});

export const getrewardListRequest = (params) => ({
  method: "get",
  url: "reward",
  config: {
    params,
  },
});


export const postChangeQuestion = (data) => ({
  method: "post",
  url: "competition/change-question",
  config: {
    data,
  },
});
