export const getClassRequest = (params) => ({
  method: 'get',
  url: 'classes',
  config: {
    params
  }
})
export const getClassForSuperRequest = (params) => ({
  method: 'get',
  url: 'supervisor/classes',
  config: {
    params
  }
})

// export const getClassForTeacherRequest = (params) => ({
//   method: 'get',
//   url: 'classes',
//   config: {
//     params
//   }
// })
export const getAllClassRequest = (params) => ({
  method: 'get',
  url: `classes?list_all=true&level_id=${params}`,
})
export const getSingleClassRequest = (params) => ({
  method: 'get',
  url: `classes/${params}`,
})
export const getSingleClassForSuperVisorRequest = (params) => ({
  method: 'get',
  url: `supervisor/classes/${params}`,
})

export const putClassRequest = (params,data) => ({
  method: 'put',
  url: `classes/${params}`,
  config: {
    data
  }
})
export const postClassRequest = (data) => ({
  method: 'post',
  url: 'classes',
  config: {
    data
  }
})
export const deleteClassRequest = (params) =>({
  method: 'delete',
  url: `classes/${params}`,
})


export const getLevelTermRequest = (params) => ({
  method: 'get',
  url: `school/${params}/levels-terms`,
  config: {}
})
