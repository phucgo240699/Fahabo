import {AnyAction} from 'redux';
import {UPDATE_SESSION} from '@store/actionTypes/session';

export type ToastState = {
  toastMessage?: string;
};

export type SessionState = {
  loading?: boolean;
  toast?: {[key: number]: ToastState};
};

const defaultState: SessionState = {
  loading: false,
};

export default function sessionReducer(
  state = defaultState,
  action: AnyAction,
) {
  switch (action.type) {
    case UPDATE_SESSION:
      return {
        ...state,
        ...action.session,
      };

    default:
      return state;
  }
}
