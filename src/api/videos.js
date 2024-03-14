export const getVideosRequest = (params) => ({
  method: 'get',
  url: 'videos',
  config: {params}
})
export const getVideoPerLevelPathRequest = (params) => ({
  method: 'get',
  url: `videos`,
  config: {
    params
  }
  // level_id=${params.levelId}&learning_path_id=${params.learnPathId}&term_id=${params.termId}
})
export const getSingleVideoRequest = (params) => ({
  method: 'get',
  url: `videos/${params}`,
})


export const getQuestionOfVideo = (params)=>({
  method: 'get',
  url: `videos/${params}/quesitons`,
})

export const deleteQuestionOfVideo = (params)=>({
  method: 'delete',
  url: `videos/question/${params}`,
})
export const addQuestionOnVideo = (data)=>({
  method: 'post',
  url:'/videos/quesitons',
  config: {
    data
  }
})
export const editQuestionOnVideo = (data,id)=>({
  method: 'put',
  url:`/videos/quesitons/${id}`,
  config: {
    data
  }
})
export const getSingleQuestionOnVideo = (params)=>({
  method: 'get',
  url:`/videos/quesiton/${params}`,
})
export const putVideoRequest = (params, data) => ({
  method: 'put',
  url: `videos/${params}`,
  config: {
    data
  }
})
export const postVideoRequest = (data) => ({
  method: 'post',
  url: 'videos',
  config: {
    data,
  },
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

export const deleteVideoRequest = (params) => ({
  method: 'delete',
  url: `videos/${params}`,
})
