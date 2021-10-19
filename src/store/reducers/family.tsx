import {FamilyType, MemberType} from '@constants/types/family';
import {
  CREATE_FAMILY_SUCCESS,
  GET_FAMILIES_SUCCESS,
  GET_FAMILY_DETAIL_SUCCESS,
  GET_FAMILY_MEMBERS_SUCCESS,
  JOIN_FAMILY_SUCCESS,
  UPDATE_FAMILY_INFO_SUCCESS,
  UPDATE_FAMILY_THUMBNAIL_SUCCESS,
} from '@store/actionTypes/family';
import {AnyAction} from 'redux';

export type FamilyState = {
  myFamilies: FamilyType[];
  familyDetail?: FamilyType;
  usersInFamily: MemberType[];
};

const defaultState: FamilyState = {
  myFamilies: [],
  familyDetail: undefined,
  usersInFamily: [],
};

export default function familyReducer(state = defaultState, action: AnyAction) {
  switch (action.type) {
    case CREATE_FAMILY_SUCCESS:
    case JOIN_FAMILY_SUCCESS:
      return {
        ...state,
        myFamilies: [...state.myFamilies, action.payload],
      };
    case GET_FAMILIES_SUCCESS:
      return {
        ...state,
        myFamilies: action.payload,
      };
    case GET_FAMILY_DETAIL_SUCCESS:
      return {
        ...state,
        familyDetail: action.payload,
      };
    case UPDATE_FAMILY_INFO_SUCCESS:
    case UPDATE_FAMILY_THUMBNAIL_SUCCESS:
      return {
        ...state,
        myFamilies: state.myFamilies.map(item => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        }),
        familyDetail: action.payload,
      };
    case GET_FAMILY_MEMBERS_SUCCESS:
      return {
        ...state,
        usersInFamily: action.payload,
      };
    default:
      return state;
  }
}
