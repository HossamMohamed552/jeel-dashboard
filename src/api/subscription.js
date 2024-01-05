export const getSubscriptionsRequest = (params) => ({
  method: 'get',
  url: 'subscription',
  config: {params}
})
export const getAllSubscriptionsRequest = (params) => ({
  method: 'get',
  url: 'subscription?list_all=true',
  config: {params}
})
export const getSingleSubscriptionsRequest = (params) => ({
  method: 'get',
  url: `subscription/${params}`,
})
export const putSubscriptionsRequest = (params,data) => ({
  method: 'put',
  url: `subscription/${params}`,
  config: {
    data
  }
})
export const postSubscribtionsRequest = (data) => ({
  method: 'post',
  url: 'subscription',
  config: {
    data
  }
})
export const deleteSubscriptionsRequest = (params) =>({
  method: 'delete',
  url: `subscription/${params}`,
})
