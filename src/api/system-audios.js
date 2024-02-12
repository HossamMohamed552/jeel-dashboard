export const getSystemAudiosRequest = (params = { per_page: 10 }) => ({
  method: "get",
  url: `system_audio`,
  config: {
    params,
  },
});

export const getSingleSystemAudiosRequest = (params) => ({
  method: "get",
  url: `system_audio/${params.id}`,
});

export const putSystemAudiosRequest = (params, data) => ({
  method: "put",
  url: `system_audio/${params}`,
  config: {
    data,
  },
});
