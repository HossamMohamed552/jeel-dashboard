export const getMissionsRequest = (params = {per_page: 10, page: 1}) => ({
  method: 'get',
  url: `missions`,
  config: {
    params
  }
})
export const getSingleMissionsRequest = (params) => ({
  method: 'get',
  url: `missions/${params}`,
})
export const getSuperMissionsRequest = (params) => ({
  method: 'get',
  url: `supervisor/missions`,
  config: {
    params
  }
})
export const getSuperPowerUpBoxRequest = (params) => ({
  method: 'get',
  url: `supervisor/power-up-boxes`,
  config: {
    params
  }
})
export const getSingleMissionsDetailsRequest = (params) => ({
  method: 'get',
  url: `missions/${params}/full-details`,
})

export const putMissionsRequest = (params, data) => ({
  method: 'put',
  url: `missions/${params}`,
  config: {
    data
  }
})
export const postMissionsRequest = (data) => ({
  method: 'post',
  url: 'missions',
  config: {
    data
  }
})
export const deleteMissionsRequest = (params) => ({
  method: 'delete',
  url: `missions/${params}`,
})
export const getDetailMissionsWithLearningPaths = (missionId) => ({
  method: 'get',
  url: `mission/${missionId}/learningpaths`
})
export const getLearningPathInMission = (missionId, learningPathId) => ({
  method: 'get',
  url: `mission-path-contents?mission_id=${missionId}&learningpath_id=${learningPathId}`
})
