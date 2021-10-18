import {
  CreateFamilyRequestType,
  FamilyType,
  GetFamilyMembersRequestType,
  GetMyFamiliesRequestType,
  JoinFamilyRequestType,
  KickFamilyMemberRequestType,
  LeaveFamilyRequestType,
  MemberType,
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

// Get families
export const GET_FAMILIES_REQUEST = 'GET_FAMILIES_REQUEST';
export const getFamiliesRequestAction = (body?: GetMyFamiliesRequestType) => ({
  type: GET_FAMILIES_REQUEST,
  body,
});
export const GET_FAMILIES_SUCCESS = 'GET_FAMILIES_SUCCESS';
export const getFamiliesSuccessAction = (payload: FamilyType[]) => ({
  type: GET_FAMILIES_SUCCESS,
  payload,
});

// Get members
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