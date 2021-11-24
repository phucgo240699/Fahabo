import {MemberLocationType, RegionType} from '@constants/types/locations';
import {GET_MEMBER_LOCATIONS_SUCCESS} from '@store/actionTypes/locations';
import {LOG_OUT} from '@store/actionTypes/signIn';
import {AnyAction} from 'redux';

export type LocationsState = {
  region?: RegionType;
  memberLocations: MemberLocationType[];
};

const defaultState: LocationsState = {
  region: undefined,
  memberLocations: [],
};

export default function locationsReducer(
  state = defaultState,
  action: AnyAction,
) {
  switch (action.type) {
    case GET_MEMBER_LOCATIONS_SUCCESS:
      return {
        ...state,
        region: action.payload.region,
        memberLocations: action.payload.memberLocations,
      };
    case LOG_OUT:
      return {
        ...state,
        region: undefined,
        memberLocations: [],
      };
    default:
      return state;
  }
}
