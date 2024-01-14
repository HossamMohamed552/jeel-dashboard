export const postAttachment = (data) => ({
  method: "post",
  url: `attachment`,
  config: {
    data,
  },
  headers: {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  },
});
