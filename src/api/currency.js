export const getCurrencyRequest = (params) => ({
  method: "get",
  url: "currencies",
  config: { params },
});
export const getCurrencyByIdRequest = (params) => ({
  method: "get",
  url: `currencies/${params}`,
});

export const putUpdateCurrencyRequest = (data, id) => ({
  method: "put",
  url: `currencies/${id}`,
  config: {
    data,
  },
});
export const postCreateCurrencyRequest = (data) => ({
  method: "post",
  url: "currencies",
  config: { data },
});
export const deleteCurrencyRequest = (params) => ({
  method: "delete",
  url: `currencies/${params}`,
});
