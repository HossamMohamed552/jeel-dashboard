export const getLoadGroupQuestionsRequest = (params) => ({
  method: "get",
  url: `group-questions/${params}`,
});

export const getLoadNextQuestionRequest = (id) => ({
  method: "get",
  url: `questions/${id}`,
});

export const postCheckinRequest = (data) => ({
  method: "post",
  url: "checkin",
  config: {
    data,
  },
});

export const getLoadWOFAreasRequest = (params) => ({
  method: "get",
  url: "wof-areas",
  config: {
    params,
  },
});

export const postWOFRequest = (data) => ({
  method: "post",
  url: "wof",
  config: {
    data,
  },
});
