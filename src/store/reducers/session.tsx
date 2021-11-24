import {AnyAction} from 'redux';
import {ToastType} from '@constants/types/session';
import {
  CLOSE_HUD,
  CLOSE_TOAST,
  SHOW_HUD,
  SHOW_TOAST,
  TURN_OFF_REFRESHING_TOKEN,
  TURN_ON_REFRESHING_TOKEN,
  UPDATE_ROUTE_NAME,
} from '@store/actionTypes/session';
import {LOG_OUT} from '@store/actionTypes/signIn';

export type ToastState = {
  isShowed: boolean;
  message: string;
  type: ToastType;
};

export type SessionState = {
  //
  // Route
  //
  routeName?: string;

  //
  // HUD
  //
  loading: boolean;

  // Refresh
  refreshingToken: boolean;

  // Load More

  // Toasts
  toasts: {id: number; toast: ToastState}[];
};

const defaultState: SessionState = {
  // Route
  routeName: undefined,

  // HUD
  loading: false,

  // Refresh
  refreshingToken: false,

  // Load More

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
    case UPDATE_ROUTE_NAME:
      return {
        ...state,
        routeName: action.payload,
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
        //Route
        routeName: undefined,
        // HUD
        loading: false,
        // Refresh
        refreshingToken: false,
        // Toasts
        toasts: [],
      };
    default:
      return state;
  }
}
