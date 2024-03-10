export const getLevelsForTeacherRequest = (params) => ({
  method: 'get',
  url: 'teacher/levels',
  config: {params}
})
export const getSingleLevelForTeacherRequest = (params) => ({
  method: 'get',
  url: `teacher/levels/${params}`,
})
export const getClassForTeacherRequest = (params) => ({
  method: 'get',
  url: 'teacher/classes',
  config: {
    params
  }
})
export const getSingleClassForTeacherRequest = (params) => ({
  method: 'get',
  url: `teacher/classes/${params}`,
})
export const getAnnouncementForTeacherRequest = (params) => ({
  method: "get",
  url: `teacher/announcement`,
  config: {
    params,
  },
});
