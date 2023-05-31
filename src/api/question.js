export const getQuestionRequest = (params = {page: 1}) => ({
  method: 'get',
  url: `questions?page=${params.page}`,
})
export const getSingleQuestionRequest = (params) => ({
  method: 'get',
  url: `questions/${params}`,
})
export const getQuestionTypsRequest = (params) => ({
  method: 'get',
  url: `question_types?page=${params.page}`,
})

export const getQuestionSubTypsRequest = (params) => ({
  method: 'get',
  url: `question_types?page=${params.page}&parent_id=${params.parent_id}`,
})

export const getLearningPathsRequest = (params) => ({
  method: 'get',
  url: `learningpaths?page=${params.page}`,
})

export const getLaguageSkillsRequest = (params) => ({
  method: 'get',
  url: `language_skills?page=${params.page}`,
})

export const getQuestionDifficultiesRequest = (params) => ({
  method: 'get',
  url: `question_difficulties?page=${params.page}`,
})

export const getBloomCategoriesRequest = (params) => ({
  method: 'get',
  url: `bloom_categories?page=${params.page}`,
})

export const getLearningMethodsRequest = (params) => ({
  method: 'get',
  url: `language_methods?page=${params.page}`,
})

export const getLevelsRequest = (params) => ({
  method: 'get',
  url: `levels?page=${params.page}`,
})

export const postAddQuestionRequest = (data) => ({
  method: "post",
  url: "questions",
  config: {
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  },
});
export const deleteQuestionRequest = (params) => ({
  method: 'delete',
  url: `questions/${params}`,
})
