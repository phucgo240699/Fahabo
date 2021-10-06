import {AnyAction} from 'redux';
import {ToastType} from '@constants/types/session';
import {
  CLOSE_HUD,
  CLOSE_TOAST,
  SHOW_HUD,
  SHOW_TOAST,
  TURN_OFF_REFRESHING_TOKEN,
  TURN_ON_REFRESHING_TOKEN,
} from '@store/actionTypes/session';

export type ToastState = {
  isShowed: boolean;
  message: string;
  type: ToastType;
};

export type SessionState = {
  loading: boolean;
  refreshingToken: boolean;
  toasts: {id: number; toast: ToastState}[];
};

const defaultState: SessionState = {
  toasts: [],
  loading: false,
  refreshingToken: false,
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
