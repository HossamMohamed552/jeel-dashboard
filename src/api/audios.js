export const getAudiosRequest = (params) => ({
  method: "get",
  url: "tasks",
  config: { params },
});
export const getAudioPerLevelPathRequest = (params) => ({
  method: "get",
  url: `tasks?&learning_path_id=${params.learnPathId}&list_all=ture`,
  config: {},
  // level_id=${params.levelId}&learning_path_id=${params.learnPathId}&term_id=${params.termId}
});
export const getSingleAudioRequest = (params) => ({
  method: "get",
  url: `tasks/${params}`,
});

export const putAudioRequest = (params, data) => ({
  method: "put",
  url: `tasks/${params}`,
  config: {
    data,
  },
});
export const postAudioRequest = (data) => ({
  method: "post",
  url: "tasks",
  config: {
    data,
  },
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const deleteAudioRequest = (params) => ({
  method: "delete",
  url: `tasks/${params}`,
});
