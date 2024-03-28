export const getLevelsForTeacherRequest = (params) => ({
  method: "get",
  url: "teacher/levels",
  config: { params },
});
export const getSingleLevelForTeacherRequest = (params) => ({
  method: "get",
  url: `teacher/levels/${params}`,
});
export const getLevelsForTeacherDropDownRequest = (params) => ({
  method: "get",
  url: "teacher/list/levels",
  config: { params },
});
export const getClassesForTeacherDropDownRequest = (id) => ({
  method: "get",
  url: `teacher/classes?list_all=true&level_id=${id}`,
});
export const getGroupsForTeacherDropDownRequest = (id) => ({
  method: "get",
  url: `teacher/groups/${id}`,
});

export const getClassForTeacherRequest = (params) => ({
  method: "get",
  url: "teacher/classes",
  config: {
    params,
  },
});
export const getSingleClassForTeacherRequest = (params) => ({
  method: "get",
  url: `teacher/classes/${params}`,
});
export const getStudentsForClassTeacherRequest = (classId, params) => ({
  method: "get",
  url: `teacher/classes/${classId}/students`,
  config: {
    params,
  },
});
export const getGroupsOfClassTeacherRequest = (classId, params) => ({
  method: "get",
  url: `teacher/groups/${classId}`,
  config: {
    params,
  },
});
export const getClassGroupIdByIdRequest = (classId, params) => ({
  method: "get",
  url: `teacher/group/${classId}`,
  config: {
    params,
  },
});
export const putClassGroupRequest = (classId, data) => ({
  method: "put",
  url: `teacher/groups/${classId}`,
  config: {
    data,
  },
});
export const postAddStudentForGroupRequest = (data) => ({
  method: "post",
  url: `teacher/groups/students`,
  config: {
    data,
  },
});

export const getAnnouncementForTeacherRequest = (params) => ({
  method: "get",
  url: `teacher/announcements`,
  config: {
    params,
  },
});
export const getAnnouncementByIdForTeacherRequest = (id) => ({
  method: "get",
  url: `teacher/announcement/${id}`,
});
export const getDetailMissionsWithLearningPathsForTeacher = (studentId, missionId) => ({
  method: "get",
  url: `teacher/student/${studentId}/mission/${missionId}`,
});

export const getStudyYearsForTeacherRequest = (data) => ({
  method: "get",
  url: `teacher/study_years`,
  config: {
    data,
  },
});
export const getTermsForTeacherRequest = (params) => ({
  method: "get",
  url: "teacher/terms",
  config: { params },
});
export const getTeacherMissionsRequest = (params) => ({
  method: "get",
  url: `teacher/missions`,
  config: {
    params,
  },
});
export const getTeacherPowerUpBoxRequest = (params) => ({
  method: "get",
  url: `teacher/power-up-boxes`,
  config: {
    params,
  },
});
export const getAllStudentsForTeacherRequest = (params) => ({
  method: "get",
  url: `teacher/students/users`,
  config: {
    params,
  },
});
export const getAllStudentsInGroupForTeacherRequest = (groupId, params) => ({
  method: "get",
  url: `/teacher/group/${groupId}/students`,
  config: {
    params,
  },
});

export const getAllMissionsCorrectionForTeacherRequest = (params) => ({
  method: "get",
  url: `teacher/missions/correction/students`,
  config: {
    params,
  },
});
export const getMissionsPerStudentForTeacherRequest = (id, params) => ({
  method: "get",
  url: `teacher/students/${id}/missions`,
  config: {
    params,
  },
});

export const getStudentForTeacher = (id) => ({
  method: "get",
  url: `teacher/student/${id}`,
});
export const correctionTask = (data) => ({
  method: "put",
  url: `teacher/task/correction`,
  config: {
    data,
  },
});
export const correctionPaperWork = (data) => ({
  method: "put",
  url: `teacher/paperwork/correction`,
  config: {
    data,
  },
});
export const postClassGroupRequest = (data) => ({
  method: "post",
  url: `teacher/groups`,
  config: {
    data,
  },
});
