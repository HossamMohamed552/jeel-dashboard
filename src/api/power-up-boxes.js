export const getPowerUpBoxesRequest = (params) => ({
    method: "get",
    url: `power_up_boxes`,
    config: {
      params,
    },
  });
  export const getPowerUpBoxByIdRequest = (id) => ({
    method: "get",
    url: `power_up_boxes/${id}`,
  });
  export const putEditPowerUpBoxRequest = (id, data) => ({
    method: "put",
    url: `power_up_boxes/${id}`,
    config: {
      data,
    },
  });
  export const postAddPowerUpBoxRequest = (data) => ({
    method: "post",
    url: `power_up_boxes`,
    config: {
      data,
    },
  });
  export const deletePowerUpBoxRequest = (id) => ({
    method: "delete",
    url: `power_up_boxes/${id}`,
  });
