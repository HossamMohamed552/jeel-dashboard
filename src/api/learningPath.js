export const getLearningPathsRequest = (params) => ({
  method: 'get',
  url: 'learningpaths',
  config: {params}
})
export const getAllLearningPathsRequest = (params) => ({
  method: 'get',
  url: 'learningpaths?list_all=true',
  config: {params}
})
export const getSingleLearningPathRequest = (params) => ({
  method: 'get',
  url: `learningpaths/${params}`,
})
export const putLearningPathRequest = (params, data) => ({
  method: 'put',
  url: `learningpaths/${params}`,
  config: {
    data
  }
})
export const postLearningPathRequest = (data) => ({
  method: 'post',
  url: 'learningpaths',
  config: {
    data,
  },
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})
export const deleteLearningPathRequest = (params) => ({
  method: 'delete',
  url: `learningpaths/${params}`,
})
