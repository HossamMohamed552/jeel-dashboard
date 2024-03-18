export const getDailyLoginForParentRequest = (childId,params) => ({
  method: 'get',
  url: `parent/student/${childId}/logins`,
  config: {params}
})
export const getMissionsForParentRequest = (childId,params) => ({
  method: 'get',
  url: `parent/students/${childId}/missions`,
  config: {params}
})
export const getTasksForParentRequest = (childId,params) => ({
  method: 'get',
  url: `parent/student/${childId}/tasks`,
  config: {params}
})
export const getPaperWorkForParentRequest = (childId,params) => ({
  method: 'get',
  url: `parent/student/${childId}/paperwork`,
  config: {params}
})
export const getSinglePaperWorkForParentRequest = (id,params) => ({
  method: 'get',
  url: `parent/paperwork/${id}/uploaded`,
  config: {params}
})
export const getSingleTaskForParentRequest = (id,params) => ({
  method: 'get',
  url: `parent/task/${id}/uploaded`,
  config: {params}
})
