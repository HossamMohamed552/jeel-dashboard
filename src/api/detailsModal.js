//get Question details
export const getSingleQuestionDetailsRequest = (params) => ({
    method: 'get',
    url: `questions/${params}/full-details`,
  })