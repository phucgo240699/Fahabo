import {AnyAction} from 'redux';
import {ToastType} from '@constants/types/session';
import {
  CLOSE_HUD,
  CLOSE_TOAST,
  SHOW_HUD,
  SHOW_TOAST,
  TURN_OFF_REFRESHING_TOKEN,
  TURN_ON_REFRESHING_TOKEN,
  UPDATE_IS_LOADING_ALBUMS,
  UPDATE_IS_LOADING_CHORES,
  UPDATE_IS_LOADING_CHORE_PHOTOS,
  UPDATE_IS_LOADING_EVENTS,
  UPDATE_IS_LOADING_EVENT_PHOTOS,
  UPDATE_IS_LOADING_FAMILIES,
  UPDATE_IS_LOADING_FAMILY_MEMBERS,
  UPDATE_IS_LOADING_PHOTOS,
  UPDATE_IS_REFRESHING_ALBUMS,
  UPDATE_IS_REFRESHING_CHORES,
  UPDATE_IS_REFRESHING_CHORE_PHOTOS,
  UPDATE_IS_REFRESHING_DATES_CONTAIN_EVENTS,
  UPDATE_IS_REFRESHING_EVENTS,
  UPDATE_IS_REFRESHING_EVENT_PHOTOS,
  UPDATE_IS_REFRESHING_FAMILIES,
  UPDATE_IS_REFRESHING_FAMILY_DETAIL,
  UPDATE_IS_REFRESHING_FAMILY_MEMBERS,
  UPDATE_IS_REFRESHING_PHOTOS,
  UPDATE_IS_REFRESHING_PROFILE,
} from '@store/actionTypes/session';
import {LOG_OUT} from '@store/actionTypes/signIn';

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
  isRefreshingFamilyMembers: boolean;
  isRefreshingAlbums: boolean;
  isRefreshingPhotos: boolean;
  isRefreshingChores: boolean;
  isRefreshingChorePhotos: boolean;
  isRefreshingEvents: boolean;
  isRefreshingEventPhotos: boolean;
  isRefreshingDatesContainEvents: boolean;

  // Load More
  isLoadingFamilies: boolean;
  isLoadingFamilyMembers: boolean;
  isLoadingAlbums: boolean;
  isLoadingPhotos: boolean;
  isLoadingChores: boolean;
  isLoadingChorePhotos: boolean;
  isLoadingEvents: boolean;
  isLoadingEventPhotos: boolean;

  // Toasts
  toasts: {id: number; toast: ToastState}[];
};

const defaultState: SessionState = {
  // HUD
  loading: false,

  // Refresh
  refreshingToken: false,
  isRefreshingProfile: false,
  isRefreshingFamilies: false,
  isRefreshingFamilyDetail: false,
  isRefreshingFamilyMembers: false,
  isRefreshingAlbums: false,
  isRefreshingPhotos: false,
  isRefreshingChores: false,
  isRefreshingChorePhotos: false,
  isRefreshingEvents: false,
  isRefreshingEventPhotos: false,
  isRefreshingDatesContainEvents: false,

  // Load More
  isLoadingFamilies: false,
  isLoadingFamilyMembers: false,
  isLoadingAlbums: false,
  isLoadingPhotos: false,
  isLoadingChores: false,
  isLoadingChorePhotos: false,
  isLoadingEvents: false,
  isLoadingEventPhotos: false,

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
    // Refresh
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
    case UPDATE_IS_REFRESHING_FAMILY_MEMBERS:
      return {
        ...state,
        isRefreshingFamilyMembers: action.payload,
      };
    case UPDATE_IS_REFRESHING_ALBUMS:
      return {
        ...state,
        isRefreshingAlbums: action.payload,
      };
    case UPDATE_IS_REFRESHING_PHOTOS:
      return {
        ...state,
        isRefreshingPhotos: action.payload,
      };
    case UPDATE_IS_REFRESHING_CHORES:
      return {
        ...state,
        isRefreshingChores: action.payload,
      };
    case UPDATE_IS_REFRESHING_CHORE_PHOTOS:
      return {
        ...state,
        isRefreshingChorePhotos: action.payload,
      };
    case UPDATE_IS_REFRESHING_EVENTS:
      return {
        ...state,
        isRefreshingEvents: action.payload,
      };
    case UPDATE_IS_REFRESHING_EVENT_PHOTOS:
      return {
        ...state,
        isRefreshingEventPhotos: action.payload,
      };
    case UPDATE_IS_REFRESHING_DATES_CONTAIN_EVENTS:
      return {
        ...state,
        isRefreshingDatesContainEvents: action.payload,
      };

    // Loading
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
    case UPDATE_IS_LOADING_ALBUMS:
      return {
        ...state,
        isLoadingAlbums: action.payload,
      };
    case UPDATE_IS_LOADING_PHOTOS:
      return {
        ...state,
        isLoadingPhotos: action.payload,
      };
    case UPDATE_IS_LOADING_CHORES:
      return {
        ...state,
        isLoadingChores: action.payload,
      };
    case UPDATE_IS_LOADING_CHORE_PHOTOS:
      return {
        ...state,
        isLoadingChorePhotos: action.payload,
      };
    case UPDATE_IS_LOADING_EVENTS:
      return {
        ...state,
        isLoadingEvents: action.payload,
      };
    case UPDATE_IS_LOADING_EVENT_PHOTOS:
      return {
        ...state,
        isLoadingEventPhotos: action.payload,
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
    case LOG_OUT:
      return {
        ...state,
        // HUD
        loading: false,
        // Refresh
        refreshingToken: false,
        isRefreshingProfile: false,
        isRefreshingFamilies: false,
        isRefreshingFamilyDetail: false,
        isRefreshingFamilyMembers: false,
        isRefreshingAlbums: false,
        isRefreshingPhotos: false,
        isRefreshingChores: false,
        isRefreshingChorePhotos: false,
        isRefreshingEvents: false,
        isRefreshingEventPhotos: false,
        isRefreshingDatesContainEvents: false,
        // Load More
        isLoadingFamilies: false,
        isLoadingFamilyMembers: false,
        isLoadingAlbums: false,
        isLoadingPhotos: false,
        isLoadingChores: false,
        isLoadingChorePhotos: false,
        isLoadingEvents: false,
        isLoadingEventPhotos: false,
        // Toasts
        toasts: [],
      };
    default:
      return state;
  }
}
