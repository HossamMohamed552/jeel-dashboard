import ApiService from "@/api/ApiService";
import { getAllCountryRequest } from "@/api/country"; // الدولة
import { getAllSchoolGroupRequest, getSingleSchoolGroupRequest } from "@/api/schoolGroup";
import {
  getAllRolesTypeRequest, // تصنيف الدور الوظيفي
  getAllRolesByTypeRequest, // الدور الوظيفي
  getAllUserStatusRequest, // الحالة
  getAllGenderRequest, // النوع
  getAllReligionRequest, // الديانة
  getAllPrizeSeasonalMissionTypeRequest, // نوع الجائزة
  getCharacterTypeRequest, // نوع المحتوى ( شخصيات )
  getCharacterContentRequest, // المحتوى ( شخصيات )
  getLibraryTypeRequest, // نوع المحتوى ( مكتبة )
  getLibraryContentRequest, // المحتوى ( مكتبة )
} from "@/api/system";
import {
  geTermsRequest, // الترم الدراسي
  getStudyYearRequest, // العام الدراسى
} from "@/api/academicYear";
import { getSchoolsRequest } from "@/api/school";
import { getSystemAudiosCategoriesRequest } from "@/api/system-audios"; //  تصنيف اصوات النظام
import { getRolesRequest } from "@/api/role";
import { getAllSeasonalMissionGroupsRequest } from "@/api/seasonal-mission-group"; // اسم المجموعة الموسمية
import { getAllLearningPathsRequest } from "@/api/learningPath"; // المسار التعليمي
import {
  getAllLessonsRequest, // الدروس ( كل الدروس )
  getLessonsDepenseLearningPathRequest, // الدروس ( اعتماداَ المسار التعليمي )
} from "@/api/lessons"; // الدرس
import { getAllLevelsRequest } from "@/api/level"; // الصف الدراسي
import { getQuizLevelPathRequest } from "@/api/quiz"; // التمارين
import { getVideoPerLevelPathRequest } from "@/api/videos"; // الفيديوهات

export async function updateFieldOptions(array, key, data) {
  const selectOptionsField = array.find((field) => field.key === key);
  console.log(selectOptionsField);
  if (selectOptionsField) {
    if (key === "school_id") selectOptionsField.options = data.schools;
    else selectOptionsField.options = data;
  }
}

export async function fetchDataAndUpdateOptions(array, apiRequest, key) {
  try {
    const response = await ApiService(apiRequest);
    await updateFieldOptions(array, key, response.data.data);
  } catch (error) {
    console.error(`Error fetching ${key}:`, error);
  }
}

export function separateIDs(key, IDs) {
  const params = IDs.map((id, index) => `${key}[${index}]=${id}`).join("&");
  return params;
}

export async function getALLCountries(array, key) {
  await fetchDataAndUpdateOptions(array, getAllCountryRequest(), key);
}
export async function getALLSchoolGroups(array, key) {
  await fetchDataAndUpdateOptions(array, getAllSchoolGroupRequest(), key);
}
export async function getAllSchools(array, key) {
  await fetchDataAndUpdateOptions(array, getSchoolsRequest(), key);
}
export async function getAllSchoolsBySchoolGroup(array, key, id) {
  await fetchDataAndUpdateOptions(array, getSingleSchoolGroupRequest(id), key);
}
export async function getAllRoles(array, key) {
  await fetchDataAndUpdateOptions(array, getRolesRequest(), key);
}
export async function getAllRolesByType(array, key, id) {
  await fetchDataAndUpdateOptions(array, getAllRolesByTypeRequest({ "types[0]": id }), key);
}
export async function getAllRolesType(array, key) {
  await fetchDataAndUpdateOptions(array, getAllRolesTypeRequest(), key);
}
export async function getAllUserStatus(array, key) {
  await fetchDataAndUpdateOptions(array, getAllUserStatusRequest(), key);
}
export async function getAllLevels(array, key) {
  await fetchDataAndUpdateOptions(array, getAllLevelsRequest(), key);
}
export async function getAllGender(array, key) {
  await fetchDataAndUpdateOptions(array, getAllGenderRequest(), key);
}
export async function getAllReligion(array, key) {
  await fetchDataAndUpdateOptions(array, getAllReligionRequest(), key);
}
export async function getAllSeasonalMissionGroups(array, key) {
  await fetchDataAndUpdateOptions(array, getAllSeasonalMissionGroupsRequest(), key);
}
export async function getAllLearningPaths(array, key) {
  await fetchDataAndUpdateOptions(array, getAllLearningPathsRequest(), key);
}
export async function getAllLessons(array, key) {
  await fetchDataAndUpdateOptions(array, getAllLessonsRequest(), key);
}
export async function getLessonsDepenseLearningPath(array, key, ids) {
  const paramsString = await separateIDs("learning_paths", ids);
  await fetchDataAndUpdateOptions(array, getLessonsDepenseLearningPathRequest(paramsString), key);
}
export async function getAllPrizeSeasonalMissionType(array, key) {
  await fetchDataAndUpdateOptions(array, getAllPrizeSeasonalMissionTypeRequest(), key);
}
export async function getCharacterType(array, key) {
  await fetchDataAndUpdateOptions(array, getCharacterTypeRequest(), key);
}
export async function getLibraryType(array, key) {
  await fetchDataAndUpdateOptions(array, getLibraryTypeRequest(), key);
}
export async function getCharacterContent(array, key, id) {
  await fetchDataAndUpdateOptions(array, getCharacterContentRequest(id), key);
}
export async function getLibraryContent(array, key, id) {
  await fetchDataAndUpdateOptions(array, getLibraryContentRequest(id), key);
}
export async function getQuizLevelPath(array, key) {
  await fetchDataAndUpdateOptions(array, getQuizLevelPathRequest(), key);
}
export async function getVideoPerLevelPath(array, key) {
  await fetchDataAndUpdateOptions(array, getVideoPerLevelPathRequest(), key);
}
export async function geAllTerms(array, key) {
  await fetchDataAndUpdateOptions(array, geTermsRequest(), key);
}
export async function getAllStudyYear(array, key) {
  await fetchDataAndUpdateOptions(array, getStudyYearRequest(), key);
}
export async function getSystemAudiosCategories(array, key) {
  await fetchDataAndUpdateOptions(array, getSystemAudiosCategoriesRequest(), key);
}
