//get Question details
export const getSingleQuestionDetailsRequest = (params) => ({
    method: 'get',
    url: `questions/${params}/full-details`,
  })

  //get mission details
  export const getSingleMissionDetailsRequest = (params) => ({
    method: 'get',
    url: `missions/${params}/full-details`,
  })