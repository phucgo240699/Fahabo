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
  families: FamilyType[];
  familyDetail?: FamilyType;
  membersInFamily: MemberType[];
};

const defaultState: FamilyState = {
  families: [],
  familyDetail: undefined,
  membersInFamily: [],
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
    default:
      return state;
  }
}
