export const getVideosRequest = () => ({
    method: 'get',
    url: 'videos',
    config: {}
  })
  export const getSingleVideoRequest = (params) => ({
    method: 'get',
    url: `videos/${params}`,
  })
  export const putVideoRequest = (params,data) => ({
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
    headers:{
      'Content-Type': 'multipart/form-data'
    }
  })
  export const deleteVideoRequest = (params) =>({
    method: 'delete',
    url: `videos/${params}`,
  })
  