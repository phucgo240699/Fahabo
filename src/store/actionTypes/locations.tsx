import {
  GetMemberLocationsRequestType,
  MemberLocationType,
  RegionType,
  UpdateNewLocationRequestType,
} from '@constants/types/locations';

export const UPDATE_NEW_LOCATION_REQUEST = 'UPDATE_NEW_LOCATION_REQUEST';
export const updateNewLocationRequestType = (
  body: UpdateNewLocationRequestType,
) => ({
  type: UPDATE_NEW_LOCATION_REQUEST,
  body,
});

export const GET_MEMBER_LOCATIONS_REQUEST = 'GET_MEMBER_LOCATIONS_REQUEST';
export const getMemberLocationsRequestAction = (
  body: GetMemberLocationsRequestType,
) => ({
  type: GET_MEMBER_LOCATIONS_REQUEST,
  body,
});
export const GET_MEMBER_LOCATIONS_SUCCESS = 'GET_MEMBER_LOCATIONS_SUCCESS';
export const getMemberLocationsSuccessAction = (payload: {
  region?: RegionType;
  memberLocations: MemberLocationType[];
}) => ({
  type: GET_MEMBER_LOCATIONS_SUCCESS,
  payload,
});
export const UPDATE_MEMBER_LOCATIONS = 'UPDATE_MEMBER_LOCATIONS';
export const updateMemberLocationsAction = (payload: MemberLocationType[]) => ({
  type: UPDATE_MEMBER_LOCATIONS,
  payload,
});
