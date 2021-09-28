import {AnyAction} from 'redux';
import {SIGN_UP_SUCCESS} from '@store/actionTypes/signUp';
import {SIGN_IN_SUCCESS} from '@store/actionTypes/signIn';
import {ProfileResponseType} from '@constants/types/profile';

export type AuthenticationState = {
  profile?: ProfileResponseType;
  accessToken: string;
};

const defaultState: AuthenticationState = {
  profile: undefined,
  accessToken: '',
};

export default function authenticationReducer(
  state = defaultState,
  action: AnyAction,
) {
  switch (action.type) {
    case SIGN_UP_SUCCESS:
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}
