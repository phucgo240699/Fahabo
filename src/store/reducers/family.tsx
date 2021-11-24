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
  LEAVE_FAMILY_SUCCESS,
  GET_EVENT_FILTER_MEMBERS_SUCCESS,
  UPDATE_IS_REFRESHING_FAMILIES,
  UPDATE_IS_REFRESHING_FAMILY_DETAIL,
  UPDATE_IS_REFRESHING_FAMILY_MEMBERS,
  UPDATE_IS_LOADING_FAMILIES,
  UPDATE_IS_LOADING_FAMILY_MEMBERS,
  UPDATE_IS_GETTING_FAMILY_MEMBERS,
} from '@store/actionTypes/family';
import {LOG_OUT} from '@store/actionTypes/signIn';
import {AnyAction} from 'redux';

export type FamilyState = {
  families: FamilyType[];
  familyDetail?: FamilyType;
  membersInFamily: MemberType[];
  choreFilterMembers: MemberType[];
  eventFilterMembers: MemberType[];
  focusFamily?: FamilyType;

  // Getting
  isGettingFamilyMembers: boolean;

  // Refresh
  isRefreshingFamilies: boolean;
  isRefreshingFamilyDetail: boolean;
  isRefreshingFamilyMembers: boolean;

  // Load more
  isLoadingFamilies: boolean;
  isLoadingFamilyMembers: boolean;
};

const defaultState: FamilyState = {
  families: [],
  familyDetail: undefined,
  membersInFamily: [],
  choreFilterMembers: [],
  eventFilterMembers: [],
  focusFamily: undefined,

  // Getting
  isGettingFamilyMembers: false,

  // Refresh
  isRefreshingFamilies: false,
  isRefreshingFamilyDetail: false,
  isRefreshingFamilyMembers: false,

  // Load more
  isLoadingFamilies: false,
  isLoadingFamilyMembers: false,
};

export default function familyReducer(state = defaultState, action: AnyAction) {
  switch (action.type) {
    case CREATE_FAMILY_SUCCESS:
    case JOIN_FAMILY_SUCCESS:
      return {
        ...state,
        families: [action.payload, ...state.families],
      };
    case LEAVE_FAMILY_SUCCESS:
      return {
        ...state,
        families: state.families.filter(item => {
          return item.id !== action.payload;
        }),
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
    case GET_EVENT_FILTER_MEMBERS_SUCCESS:
      return {
        ...state,
        eventFilterMembers: action.payload,
      };
    case UPDATE_FOCUS_FAMILY_SUCCESS:
      return {
        ...state,
        focusFamily: action.payload,
      };

    // Getting
    case UPDATE_IS_GETTING_FAMILY_MEMBERS:
      return {
        ...state,
        isGettingFamilyMembers: action.payload,
      };

    // Refresh
    case UPDATE_IS_REFRESHING_FAMILIES:
      return {
        ...state,
        isRefreshingFamilies: action.payload,
      };
    case UPDATE_IS_REFRESHING_FAMILY_DETAIL:
      return {
        ...state,
        isRefreshingFamilyDetail: action.payload,
      };
    case UPDATE_IS_REFRESHING_FAMILY_MEMBERS:
      return {
        ...state,
        isRefreshingFamilyMembers: action.payload,
      };

    // Load more
    case UPDATE_IS_LOADING_FAMILIES:
      return {
        ...state,
        isLoadingFamilies: action.payload,
      };
    case UPDATE_IS_LOADING_FAMILY_MEMBERS:
      return {
        ...state,
        isLoadingFamilyMembers: action.payload,
      };
    case LOG_OUT:
      return {
        ...state,
        families: [],
        familyDetail: undefined,
        membersInFamily: [],
        choreFilterMembers: [],
        focusFamily: undefined,
        isGettingFamilyMembers: false,
        isRefreshingFamilies: false,
        isRefreshingFamilyDetail: false,
        isRefreshingFamilyMembers: false,
        isLoadingFamilies: false,
        isLoadingFamilyMembers: false,
      };
    default:
      return state;
  }
}
