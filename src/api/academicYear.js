export const geTermsRequest = () => ({
  method: "get",
  url: "/school/terms",
});
export const getStudyYearRequest = () => ({
  method: "get",
  url: "/school/study_years",
});
export const getAcademicYearRequest = (params) => ({
  method: "get",
  url: "/school-manage/study_year",
  config: { params },
});
export const getSingleAcademicYearRequest = (params) => ({
  method: "get",
  url: `/school-manage/study_year/${params}`,
});

export const postAcademicYearRequest = (data) => ({
  method: "post",
  url: "school-manage/study_year",
  config: {
    data,
  },
});
