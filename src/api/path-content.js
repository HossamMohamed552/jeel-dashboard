export const getPathContentRequest = (params) => ({
  method: 'get',
  url: `/mission/${params}/learningpaths`,
  config: {}
})
export const getMissionContentRequest = (params) => ({
  method: 'get',
  url: `/mission-path-contents?mission_id=${params.missionId}&learningpath_id=${params.learningPathId}`,
  config: {}
})
export const postEditPathMissionRequest = (data) => ({
  method: 'put',
  url: `/handel-mission-contents`,
  config: {
    data
  }
})
