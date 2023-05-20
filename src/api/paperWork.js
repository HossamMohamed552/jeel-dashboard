export const getPaperWorksRequest = () => ({
    method: 'get',
    url: 'peper_works',
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
  