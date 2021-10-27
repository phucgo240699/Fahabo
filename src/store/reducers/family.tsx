import {FamilyType, MemberType} from '@constants/types/family';
import {
  CREATE_FAMILY_SUCCESS,
  GET_FAMILIES_SUCCESS,
  GET_FAMILY_DETAIL_SUCCESS,
  GET_FAMILY_MEMBERS_SUCCESS,
  JOIN_FAMILY_SUCCESS,
  GET_CHORE_FILTER_MEMBERS_SUCCESS,
  UPDATE_FAMILY_INFO_SUCCESS,
  UPDATE_FAMILY_THUMBNAIL_SUCCESS,
  UPDATE_FOCUS_FAMILY_SUCCESS,
} from '@store/actionTypes/family';
import {LOG_OUT} from '@store/actionTypes/signIn';
import {AnyAction} from 'redux';

export type FamilyState = {
  families: FamilyType[];
  familyDetail?: FamilyType;
  membersInFamily: MemberType[];
  choreFilterMembers: MemberType[];
  focusFamily?: FamilyType;
};

const defaultState: FamilyState = {
  families: [],
  familyDetail: undefined,
  membersInFamily: [],
  choreFilterMembers: [],
  focusFamily: undefined,
};

export default function familyReducer(state = defaultState, action: AnyAction) {
  switch (action.type) {
    case CREATE_FAMILY_SUCCESS:
    case JOIN_FAMILY_SUCCESS:
      return {
        ...state,
        families: [...state.families, action.payload],
      };
    case GET_FAMILIES_SUCCESS:
      return {
        ...state,
        families: action.payload,
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
        families: state.families.map(item => {
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
        membersInFamily: action.payload,
      };
    case GET_CHORE_FILTER_MEMBERS_SUCCESS:
      return {
        ...state,
        choreFilterMembers: action.payload,
      };
    case UPDATE_FOCUS_FAMILY_SUCCESS:
      return {
        ...state,
        focusFamily: action.payload,
      };
    case LOG_OUT:
      return {
        ...state,
        families: [],
        familyDetail: undefined,
        membersInFamily: [],
        choreFilterMembers: [],
        focusFamily: undefined,
      };
    default:
      return state;
  }
}
