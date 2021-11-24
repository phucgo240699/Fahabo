import {
  CreateFamilyRequestType,
  FamilyType,
  GetChoreFilterMembersRequestType,
  GetEventFilterMembersRequestType,
  GetFamilyDetailRequestType,
  GetFamilyMembersForCallRequestType,
  GetFamilyMembersRequestType,
  GetMyFamiliesRequestType,
  JoinFamilyRequestType,
  KickFamilyMemberRequestType,
  LeaveFamilyRequestType,
  MemberType,
  UpdateFamilyInfoRequestType,
  UpdateFamilyThumbnailRequestType,
} from '@constants/types/family';

// Getting
export const UPDATE_IS_GETTING_FAMILY_MEMBERS =
  'UPDATE_IS_GETTING_FAMILY_MEMBERS';
export const updateIsGettingFamilyMembersAction = (payload: boolean) => ({
  type: UPDATE_IS_GETTING_FAMILY_MEMBERS,
  payload,
});

// Refresh
export const UPDATE_IS_REFRESHING_FAMILIES = 'UPDATE_IS_REFRESHING_FAMILIES';
export const updateIsRefreshingFamiliesAction = (payload: boolean) => ({
  type: UPDATE_IS_REFRESHING_FAMILIES,
  payload,
});
export const UPDATE_IS_REFRESHING_FAMILY_DETAIL =
  'UPDATE_IS_REFRESHING_FAMILY_DETAIL';
export const updateIsRefreshingFamilyDetailAction = (payload: boolean) => ({
  type: UPDATE_IS_REFRESHING_FAMILY_DETAIL,
  payload,
});
export const UPDATE_IS_REFRESHING_FAMILY_MEMBERS =
  'UPDATE_IS_REFRESHING_FAMILY_MEMBERS';
export const updateIsRefreshingFamilyMembersAction = (payload: boolean) => ({
  type: UPDATE_IS_REFRESHING_FAMILY_MEMBERS,
  payload,
});

// Load more
export const UPDATE_IS_LOADING_FAMILIES = 'UPDATE_IS_LOADING_FAMILIES';
export const updateIsLoadingFamiliesAction = (payload: boolean) => ({
  type: UPDATE_IS_LOADING_FAMILIES,
  payload,
});
export const UPDATE_IS_LOADING_FAMILY_MEMBERS =
  'UPDATE_IS_LOADING_FAMILY_MEMBERS';
export const updateIsLoadingFamilyMembersAction = (payload: boolean) => ({
  type: UPDATE_IS_LOADING_FAMILY_MEMBERS,
  payload,
});

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
export const LEAVE_FAMILY_SUCCESS = 'LEAVE_FAMILY_SUCCESS';
export const leaveFamilySuccessAction = (payload: number | undefined) => ({
  type: LEAVE_FAMILY_SUCCESS,
  payload,
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
export const GET_FAMILY_MEMBERS_REQUEST = 'GET_FAMILY_MEMBERS_REQUEST';
export const getFamilyMembersRequestAction = (
  body: GetFamilyMembersRequestType,
) => ({
  type: GET_FAMILY_MEMBERS_REQUEST,
  body,
});
export const GET_FAMILY_MEMBERS_FOR_CALL_REQUEST =
  'GET_FAMILY_MEMBERS_FOR_CALL_REQUEST';
export const getFamilyMembersForCallRequestAction = (
  body: GetFamilyMembersForCallRequestType,
) => ({
  type: GET_FAMILY_MEMBERS_FOR_CALL_REQUEST,
  body,
});

export const GET_FAMILY_MEMBERS_SUCCESS = 'GET_FAMILY_MEMBERS_SUCCESS';
export const getFamilyMembersSuccessAction = (payload: MemberType[]) => ({
  type: GET_FAMILY_MEMBERS_SUCCESS,
  payload,
});

export const GET_CHORE_FILTER_MEMBERS_REQUEST =
  'GET_CHORE_FILTER_MEMBERS_REQUEST';
export const getChoreFilterMembersRequestAction = (
  body: GetChoreFilterMembersRequestType,
) => ({
  type: GET_CHORE_FILTER_MEMBERS_REQUEST,
  body,
});
export const GET_CHORE_FILTER_MEMBERS_SUCCESS =
  'GET_CHORE_FILTER_MEMBERS_SUCCESS';
export const getChoreFilterMembersSuccessAction = (payload: MemberType[]) => ({
  type: GET_CHORE_FILTER_MEMBERS_SUCCESS,
  payload,
});

export const GET_EVENT_FILTER_MEMBERS_REQUEST =
  'GET_EVENT_FILTER_MEMBERS_REQUEST';
export const getEventFilterMembersRequestAction = (
  body: GetEventFilterMembersRequestType,
) => ({
  type: GET_EVENT_FILTER_MEMBERS_REQUEST,
  body,
});
export const GET_EVENT_FILTER_MEMBERS_SUCCESS =
  'GET_EVENT_FILTER_MEMBERS_SUCCESS';
export const getEventFilterMembersSuccessAction = (payload: MemberType[]) => ({
  type: GET_EVENT_FILTER_MEMBERS_SUCCESS,
  payload,
});

// Focus Family
export const UPDATE_FOCUS_FAMILY_REQUEST = 'UPDATE_FOCUS_FAMILY_REQUEST';
export const updateFocusFamilyRequestAction = (
  body: FamilyType | undefined,
) => ({
  type: UPDATE_FOCUS_FAMILY_REQUEST,
  body,
});

export const UPDATE_FOCUS_FAMILY_SUCCESS = 'UPDATE_FOCUS_FAMILY_SUCCESS';
export const updateFocusFamilySuccessAction = (
  payload: FamilyType | undefined,
) => ({
  type: UPDATE_FOCUS_FAMILY_SUCCESS,
  payload,
});
