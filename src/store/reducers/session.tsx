import {AnyAction} from 'redux';
import {UPDATE_SESSION} from '@store/actionTypes/session';

export type SessionState = {
  loading?: boolean;
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
        ...action.type,
      };

    default:
      return state;
  }
}
