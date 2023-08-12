export const getQuizzesRequest = () => ({
  method: 'get',
  url: `quizzes?per_page=200`,
  config: {}
})


export const getQuizLevelPathRequest = (params) => ({
  method: 'get',
  url: `quizzes?per_page=200&level_id=${params.levelId}&learning_path_id=${params.learnPathId}`,
  config: {}
})
export const getGeneralQuestionRequest = (params) => ({
  method: 'get',
  url: `questions?list_all=true&level_id=${params.levelId}&learning_path_id=${params.learnPathId}`,
  config: {}
})
export const getQuestionDifficultyLevelLearnRequest = (params) => ({
  method: 'get',
  url: `quizzes_question_difficulty?level_id=${params.levelId}&learning_path_id=${params.learnPathId}`,
  config: {}
})
export const getSingleQuizRequest = (params) => ({
  method: 'get',
  url: `quizzes/${params}`,
})
export const putQuizRequest = (params,data) => ({
  method: 'put',
  url: `quizzes/${params}`,
  config: {
    data
  }
})
export const postQuizRequest = (data) => ({
  method: 'post',
  url: 'quizzes',
  config: {
    data
  }
})
export const postRandomQuizRequest = (data) => ({
  method: 'post',
  url: 'make_random_questions',
  config: {
    data
  }
})
export const deleteQuizRequest = (params) =>({
  method: 'delete',
  url: `quizzes/${params}`,
})
