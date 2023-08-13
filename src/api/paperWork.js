export const getPaperWorksRequest = (params) => ({
    method: 'get',
    url: 'peper_works',
    config: {params}
});
export const getPaperWorkPerLevelPathRequest = (params) => ({
  method: 'get',
  url: `peper_works?level_id=${params.levelId}&learning_path_id=${params.learnPathId}&term_id=${params.termId}`,
  config: {}
});
export const getSinglePaperworkRequest = (params) => ({
    method: 'get',
    url: `peper_works/${params}`,
});

export const putPaperWorkRequest = (params,data) => ({
    method: 'put',
    url: `peper_works/${params}`,
    config: {
        data
    }
});

export const postPaperWorkRequest = (data) => ({
    method: 'post',
    url: 'peper_works',
    config: {
        data,
    },
    headers:{
        'Content-Type': 'multipart/form-data'
    }
});
export const deletePaperWorkRequest = (params) =>({
    method: 'delete',
    url: `peper_works/${params}`,
})
