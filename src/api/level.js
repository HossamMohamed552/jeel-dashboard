export const getLevelsRequest = (params) => ({
  method: 'get',
  url: 'levels',
  config: {params}
})
export const getLevelsForSuperVisorRequest = (params) => ({
  method: 'get',
  url: 'supervisor/levels',
  config: {params}
})
export const getLevelsForSuperVisorDropDownRequest = (params) => ({
  method: 'get',
  url: 'supervisor/list/levels',
  config: {params}
})

export const getAllLevelsRequest = (params) => ({
  method: 'get',
  url: 'levels?list_all=true',
  config: {params}
})
export const getSingleLevelRequest = (params) => ({
  method: 'get',
  url: `levels/${params}`,
})
export const getSingleLevelForSuperVisorRequest = (params) => ({
  method: 'get',
  url: `supervisor/levels/${params}`,
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
