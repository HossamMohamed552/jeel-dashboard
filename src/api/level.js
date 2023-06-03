export const getLevelsRequest = (params) => ({
  method: 'get',
  url: 'levels',
  config: {params}
})
export const getSingleLevelRequest = (params) => ({
  method: 'get',
  url: `levels/${params}`,
})
export const putLevelRequest = (params,data) => ({
  method: 'put',
  url: `levels/${params}`,
  config: {
    data
  }
})
export const postLevelRequest = (data) => ({
  method: 'post',
  url: 'levels',
  config: {
    data
  }
})
export const deleteLevelRequest = (params) =>({
  method: 'delete',
  url: `levels/${params}`,
})
