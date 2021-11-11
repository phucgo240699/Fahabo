import {NotificationModalType} from '@constants/types/modals';
import {
  CLOSE_NOTIFICATION_MODAL,
  CLOSE_RESET_PASSWORD_LINK_MODAL,
  SHOW_NOTIFICATION_MODAL,
  SHOW_RESET_PASSWORD_LINK_MODAL,
} from '@store/actionTypes/modals';
import {LOG_OUT} from '@store/actionTypes/signIn';
import {AnyAction} from 'redux';

export type ModalsState = {
  resetPasswordLink?: string;
  notificationModal?: NotificationModalType;
};

const defaultState: ModalsState = {
  resetPasswordLink: undefined,
  notificationModal: undefined,
};

export default function modalsReducer(state = defaultState, action: AnyAction) {
  switch (action.type) {
    case SHOW_RESET_PASSWORD_LINK_MODAL:
      return {
        ...state,
        resetPasswordLink: action.payload,
      };
    case CLOSE_RESET_PASSWORD_LINK_MODAL:
      return {
        ...state,
        resetPasswordLink: undefined,
      };
    case SHOW_NOTIFICATION_MODAL:
      return {
        ...state,
        notificationModal: action.payload,
      };
    case CLOSE_NOTIFICATION_MODAL:
      return {
        ...state,
        notificationModal: undefined,
      };
    case LOG_OUT:
      return {
        ...state,
        resetPasswordLink: undefined,
        notificationModal: undefined,
      };
    default:
      return state;
  }
}
