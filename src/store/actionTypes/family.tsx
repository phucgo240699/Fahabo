import {
  CreateFamilyRequestType,
  FamilyType,
  GetFamilyDetailRequestType,
  GetFamilyMembersRequestType,
  GetMyFamiliesRequestType,
  JoinFamilyRequestType,
  KickFamilyMemberRequestType,
  LeaveFamilyRequestType,
  MemberType,
  UpdateFamilyInfoRequestType,
  UpdateFamilyThumbnailRequestType,
} from '@constants/types/family';

// Create
export const CREATE_FAMILY_REQUEST = 'CREATE_FAMILY_REQUEST';
export const createFamilyRequestAction = (body: CreateFamilyRequestType) => ({
  type: CREATE_FAMILY_REQUEST,
  body,
});
export const CREATE_FAMILY_SUCCESS = 'CREATE_FAMILY_SUCCESS';
export const createFamilySuccessAction = (payload: FamilyType) => ({
  type: CREATE_FAMILY_SUCCESS,
  payload,
});

// Join
export const JOIN_FAMILY_REQUEST = 'JOIN_FAMILY_REQUEST';
export const joinFamilyRequestAction = (body: JoinFamilyRequestType) => ({
  type: JOIN_FAMILY_REQUEST,
  body,
});
export const JOIN_FAMILY_SUCCESS = 'JOIN_FAMILY_SUCCESS';
export const joinFamilySuccessAction = (payload: FamilyType) => ({
  type: JOIN_FAMILY_SUCCESS,
  payload,
});

// Leave
export const LEAVE_FAMILY_REQUEST = 'LEAVE_FAMILY_REQUEST';
export const leaveFamilyRequestAction = (body: LeaveFamilyRequestType) => ({
  type: LEAVE_FAMILY_REQUEST,
  body,
});

// Kick
export const KICK_FAMILY_MEMBER_REQUEST = 'KICK_FAMILY_MEMBER_REQUEST';
export const kickFamilyMemberRequestAction = (
  body: KickFamilyMemberRequestType,
) => ({
  type: KICK_FAMILY_MEMBER_REQUEST,
  body,
});

// Update Thumbnail
export const UPDATE_FAMILY_THUMBNAIL_REQUEST =
  'UPDATE_FAMILY_THUMBNAIL_REQUEST';
export const updateFamilyThumbnailRequestAction = (
  body: UpdateFamilyThumbnailRequestType,
) => ({
  type: UPDATE_FAMILY_THUMBNAIL_REQUEST,
  body,
});
export const UPDATE_FAMILY_THUMBNAIL_SUCCESS =
  'UPDATE_FAMILY_THUMBNAIL_SUCCESS';
export const updateFamilyThumbnailSuccessAction = (payload: FamilyType) => ({
  type: UPDATE_FAMILY_THUMBNAIL_SUCCESS,
  payload,
});

// Update Info
export const UPDATE_FAMILY_INFO_REQUEST = 'UPDATE_FAMILY_INFO_REQUEST';
export const updateFamilyInfoRequestAction = (
  body: UpdateFamilyInfoRequestType,
) => ({
  type: UPDATE_FAMILY_INFO_REQUEST,
  body,
});
export const UPDATE_FAMILY_INFO_SUCCESS = 'UPDATE_FAMILY_INFO_SUCCESS';
export const updateFamilyInfoSuccessAction = (payload: FamilyType) => ({
  type: UPDATE_FAMILY_INFO_SUCCESS,
  payload,
});

// Get Families
export const GET_REFRESH_FAMILIES_REQUEST = 'GET_REFRESH_FAMILIES_REQUEST';
export const getRefreshFamiliesRequestAction = () => ({
  type: GET_REFRESH_FAMILIES_REQUEST,
});
export const GET_FAMILIES_REQUEST = 'GET_FAMILIES_REQUEST';
export const getFamiliesRequestAction = (body: GetMyFamiliesRequestType) => ({
  type: GET_FAMILIES_REQUEST,
  body,
});
export const GET_FAMILIES_SUCCESS = 'GET_FAMILIES_SUCCESS';
export const getFamiliesSuccessAction = (payload: FamilyType[]) => ({
  type: GET_FAMILIES_SUCCESS,
  payload,
});

// Get Family Detail
export const GET_FAMILY_DETAIL_REQUEST = 'GET_FAMILY_DETAIL_REQUEST';
export const getFamilyDetailRequestAction = (
  body: GetFamilyDetailRequestType,
) => ({
  type: GET_FAMILY_DETAIL_REQUEST,
  body,
});
export const GET_REFRESH_FAMILY_DETAIL_REQUEST =
  'GET_REFRESH_FAMILY_DETAIL_REQUEST';
export const getRefreshFamilyDetailRequestAction = (
  body: GetFamilyDetailRequestType,
) => ({
  type: GET_REFRESH_FAMILY_DETAIL_REQUEST,
  body,
});
export const GET_FAMILY_DETAIL_SUCCESS = 'GET_FAMILY_DETAIL_SUCCESS';
export const getFamilyDetailSuccessAction = (payload?: FamilyType) => ({
  type: GET_FAMILY_DETAIL_SUCCESS,
  payload,
});

// Get Members
export const GET_REFRESH_FAMILY_MEMBERS_REQUEST =
  'GET_REFRESH_FAMILY_MEMBERS_REQUEST';
export const getRefreshFamilyMembersRequestAction = (
  body: GetFamilyMembersRequestType,
) => ({
  type: GET_REFRESH_FAMILY_MEMBERS_REQUEST,
  body,
});
export const GET_FAMILY_MEMBERS_REQUEST = 'GET_FAMILY_MEMBERS_REQUEST';
export const getFamilyMembersRequestAction = (
  body: GetFamilyMembersRequestType,
) => ({
  type: GET_FAMILY_MEMBERS_REQUEST,
  body,
});
export const GET_FAMILY_MEMBERS_SUCCESS = 'GET_FAMILY_MEMBERS_SUCCESS';
export const getFamilyMembersSuccessAction = (payload: MemberType[]) => ({
  type: GET_FAMILY_MEMBERS_SUCCESS,
  payload,
});

// Focus Family
export const UPDATE_FOCUS_FAMILY = 'UPDATE_FOCUS_FAMILY';
export const updateFocusFamilyAction = (payload: FamilyType) => ({
  type: UPDATE_FOCUS_FAMILY,
  payload,
});
