export const getAnnouncementRequest = (params) => ({
  method: "get",
  url: `announcement`,
  config: {
    params,
  },
});
export const getAnnouncementByIdRequest = (id) => ({
  method: "get",
  url: `announcement/${id}`,
});
export const putEditAnnouncementRequest = (id, data) => ({
  method: "put",
  url: `announcement/${id}`,
  config: {
    data,
  },
});
export const postAddAnnouncementRequest = (data) => ({
  method: "post",
  url: `announcement`,
  config: {
    data,
  },
});
export const deleteAnnouncementRequest = (id) => ({
  method: "delete",
  url: `announcement/${id}`,
});
