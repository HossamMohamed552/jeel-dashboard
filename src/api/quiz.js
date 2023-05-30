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
