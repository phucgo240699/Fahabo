import {MemberType} from '@constants/types/family';
import {
  CREATE_FAMILY_SUCCESS,
  GET_FAMILIES_SUCCESS,
  GET_FAMILY_MEMBERS_SUCCESS,
  JOIN_FAMILY_SUCCESS,
} from '@store/actionTypes/family';
import {AnyAction} from 'redux';

export type FamilyState = {
  myFamilies: FamilyState[];
  usersInFamily: MemberType[];
};

const defaultState: FamilyState = {
  myFamilies: [],
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
    case GET_FAMILY_MEMBERS_SUCCESS:
      return {
        ...state,
        usersInFamily: action.payload,
      };
    default:
      return state;
  }
}
