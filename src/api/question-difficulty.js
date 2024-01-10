export const getQuestionDifficultyRequest = (params = {per_page: 10}) => ({
  method: 'get',
  url: `question_difficulties`,
  config: {
    params
  }
})


export const getSingleQuestionDifficltyRequest = (params) => ({
  method: 'get',
  url: `question_difficulties/${params}`,
})


export const putQuestionDifficultyPointsRequest = (params,data) => ({
  method: 'put',
  url: `question_difficulties/${params}`,
  config: {
    data
  }
})