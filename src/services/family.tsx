import {
  CreateFamilyRequestType,
  GetFamilyDetailRequestType,
  GetFamilyMembersRequestType,
  GetMyFamiliesRequestType,
  JoinFamilyRequestType,
  KickFamilyMemberRequestType,
  LeaveFamilyRequestType,
  UpdateFamilyInfoRequestType,
  UpdateFamilyThumbnailRequestType,
} from '@constants/types/family';
import {isNull} from '@utils/index';
import {apiProvider} from './apiProvider';
import {BASE_URL, Pagination} from '@constants/Constants';

export function createFamilyApi(
  accessToken?: string,
  body?: CreateFamilyRequestType,
) {
  return new apiProvider(accessToken).post(
    `${BASE_URL}/families/new_family`,
    body,
  );
}
export function joinFamilyApi(
  accessToken?: string,
  body?: JoinFamilyRequestType,
) {
  return new apiProvider(accessToken).post(
    `${BASE_URL}/users/join_family`,
    body,
  );
}
export function leaveFamilyApi(
  accessToken?: string,
  body?: LeaveFamilyRequestType,
) {
  return new apiProvider(accessToken).post(
    `${BASE_URL}/users/leave_family`,
    body,
  );
}
export function kickFamilyMemberApi(
  accessToken?: string,
  body?: KickFamilyMemberRequestType,
) {
  return new apiProvider(accessToken).post(
    `${BASE_URL}/users/kick_member`,
    body,
  );
}

export function updateFamilyThumbnailApi(
  accessToken?: string,
  body?: UpdateFamilyThumbnailRequestType,
) {
  return new apiProvider(accessToken).post(
    `${BASE_URL}/families/update_thumbnail`,
    body,
  );
}

export function updateFamilyInfoApi(
  accessToken?: string,
  body?: UpdateFamilyInfoRequestType,
) {
  return new apiProvider(accessToken).post(
    `${BASE_URL}/families/update_family`,
    body,
  );
}

export function getMyFamiliesApi(
  accessToken?: string,
  body?: GetMyFamiliesRequestType,
) {
  let page = 0;
  let size = Pagination.Family;
  if (!isNull(body)) {
    if (!isNull(body?.page)) {
      page = body?.page ?? 0;
    }
    if (!isNull(body?.size)) {
      size = body?.size ?? Pagination.Family;
    }
  }
  return new apiProvider(accessToken).post(
    `${BASE_URL}/users/get_families?page=${page}&size=${size}`,
    body,
  );
}

export function getFamilyDetailApi(
  accessToken?: string,
  body?: GetFamilyDetailRequestType,
) {
  return new apiProvider(accessToken).post(`${BASE_URL}/families/detail`, body);
}

export function getFamilyMembersApi(
  accessToken?: string,
  body?: GetFamilyMembersRequestType,
) {
  let page = 0;
  let size = Pagination.FamilyMembers;
  if (!isNull(body)) {
    if (!isNull(body?.page)) {
      page = body?.page ?? 0;
    }
    if (!isNull(body?.size)) {
      size = body?.size ?? Pagination.FamilyMembers;
    }
  }
  return new apiProvider(accessToken).post(
    `${BASE_URL}/families/users_in_family?page=${page}&size=${size}`,
    body,
  );
}
