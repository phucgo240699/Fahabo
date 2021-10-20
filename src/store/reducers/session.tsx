import {AnyAction} from 'redux';
import {ToastType} from '@constants/types/session';
import {
  CLOSE_HUD,
  CLOSE_TOAST,
  SHOW_HUD,
  SHOW_TOAST,
  TURN_OFF_REFRESHING_TOKEN,
  TURN_ON_REFRESHING_TOKEN,
  UPDATE_IS_LOADING_FAMILIES,
  UPDATE_IS_LOADING_FAMILY_MEMBERS,
  UPDATE_IS_REFRESHING_FAMILIES,
  UPDATE_IS_REFRESHING_FAMILY_DETAIL,
  UPDATE_IS_REFRESHING_PROFILE,
} from '@store/actionTypes/session';

export type ToastState = {
  isShowed: boolean;
  message: string;
  type: ToastType;
};

export type SessionState = {
  //
  // HUD
  //
  loading: boolean;

  // Refresh
  refreshingToken: boolean;
  isRefreshingProfile: boolean;
  isRefreshingFamilies: boolean;
  isRefreshingFamilyDetail: boolean;

  // Load More
  isLoadingFamilies: boolean;
  isLoadingFamilyMembers: boolean;

  // Toasts
  toasts: {id: number; toast: ToastState}[];
};

const defaultState: SessionState = {
  //
  // HUD
  //
  loading: false,

  // Refresh
  refreshingToken: false,
  isRefreshingProfile: false,
  isRefreshingFamilies: false,
  isRefreshingFamilyDetail: false,

  // Load More
  isLoadingFamilies: false,
  isLoadingFamilyMembers: false,

  // Toasts
  toasts: [],
};

export default function sessionReducer(
  state = defaultState,
  action: AnyAction,
) {
  switch (action.type) {
    case SHOW_HUD:
      return {
        ...state,
        loading: true,
      };
    case CLOSE_HUD:
      return {
        ...state,
        loading: false,
      };
    case TURN_ON_REFRESHING_TOKEN:
      return {
        ...state,
        refreshingToken: true,
      };
    case TURN_OFF_REFRESHING_TOKEN:
      return {
        ...state,
        refreshingToken: false,
      };
    case UPDATE_IS_REFRESHING_PROFILE:
      return {
        ...state,
        isRefreshingProfile: action.payload,
      };
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
    case SHOW_TOAST:
      return {
        ...state,
        toasts: [
          ...state.toasts,
          {
            id: state.toasts.length,
            toast: {
              isShowed: true,
              message: action.toastMessage,
              type: action.toastType,
            },
          },
        ],
      };
    case CLOSE_TOAST:
      return {
        ...state,
        toasts: state.toasts.filter(toast => {
          return toast.id !== action.toastId;
        }),
      };
    default:
      return state;
  }
}
