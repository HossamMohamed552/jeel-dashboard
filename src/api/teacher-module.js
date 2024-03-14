export const getLevelsForTeacherRequest = (params) => ({
  method: 'get',
  url: 'teacher/levels',
  config: {params}
})
export const getSingleLevelForTeacherRequest = (params) => ({
  method: 'get',
  url: `teacher/levels/${params}`,
})
export const getLevelsForTeacherDropDownRequest = (params) => ({
  method: 'get',
  url: 'teacher/list/levels',
  config: {params}
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
export const getStudyYearsForTeacherRequest = (data) => ({
  method: "get",
  url: `teacher/study_years`,
  config: {
    data,
  },
});
export const getTermsForTeacherRequest = (params) => ({
  method: 'get',
  url: 'teacher/terms',
  config: {params}
})
export const getTeacherMissionsRequest = (params) => ({
  method: "get",
  url: `teacher/missions`,
  config: {
    params
  }
})
export const getTeacherPowerUpBoxRequest = (params) => ({
  method: 'get',
  url: `teacher/power-up-boxes`,
  config: {
    params
  }
})
export const getAllStudentsForTeacherRequest = (params) => ({
  method: "get",
  url: `teacher/students/users`,
  config: {
    params,
  },
});
export  const  getStudentForTeacher = (id) => ({
  method: "get",
  url: `teacher/student/${id}`,
})
