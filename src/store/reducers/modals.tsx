import {
  CLOSE_RESET_PASSWORD_LINK_MODAL,
  SHOW_RESET_PASSWORD_LINK_MODAL,
} from '@store/actionTypes/modals';
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
    default:
      return state;
  }
}
