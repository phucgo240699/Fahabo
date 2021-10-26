import {
  CLOSE_RESET_PASSWORD_LINK_MODAL,
  SHOW_RESET_PASSWORD_LINK_MODAL,
} from '@store/actionTypes/modals';
import {LOG_OUT} from '@store/actionTypes/signIn';
import {AnyAction} from 'redux';

export type ModalsState = {
  resetPasswordLink?: string;
};

const defaultState: ModalsState = {
  resetPasswordLink: undefined,
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
    case LOG_OUT:
      return {
        ...state,
        resetPasswordLink: undefined,
      };
    default:
      return state;
  }
}
