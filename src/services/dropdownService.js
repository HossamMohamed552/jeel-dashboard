import ApiService from "@/api/ApiService";
import { getAllCountryRequest } from "@/api/country";
import { getAllSchoolGroupRequest, getSingleSchoolGroupRequest } from "@/api/schoolGroup";
import {
  getAllStatusRequest,
  getAllRolesTypeRequest,
  getAllRolesByTypeRequest,
  getAllUserStatusRequest,
} from "@/api/system";
import { getSchoolsRequest } from "@/api/school";
import { getRolesRequest } from "@/api/role";

export async function updateFieldOptions(array, key, data) {
  const selectOptionsField = array.find((field) => field.key === key);
  console.log(key);
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

export async function getALLCountries(array, key) {
  await fetchDataAndUpdateOptions(array, getAllCountryRequest(), key);
}

export async function getALLSchoolGroups(array, key) {
  await fetchDataAndUpdateOptions(array, getAllSchoolGroupRequest(), key);
}

export async function getALLStatuses(array, key) {
  await fetchDataAndUpdateOptions(array, getAllStatusRequest(), key);
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
  await fetchDataAndUpdateOptions(array, getAllRolesByTypeRequest({'types[0]':id}), key);
}
export async function getAllRolesType(array, key) {
  await fetchDataAndUpdateOptions(array, getAllRolesTypeRequest(), key);
}
export async function getAllUserStatus(array, key) {
  await fetchDataAndUpdateOptions(array, getAllUserStatusRequest(), key);
}
