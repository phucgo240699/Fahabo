import {AnyAction} from 'redux';
import {
  SIGN_UP_SUCCESS,
  UPDATE_LANGUAGE_CODE_SUCCESS,
} from '@store/actionTypes/signUp';
import {SIGN_IN_SUCCESS} from '@store/actionTypes/signIn';
import {AuthenticationResponseType} from '@constants/types/authentication';

export type AuthenticationState = {
  user?: AuthenticationResponseType;
  accessToken?: string;
};

const defaultState: AuthenticationState = {
  user: undefined,
  accessToken: undefined,
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
    case UPDATE_LANGUAGE_CODE_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          languageCode: action.payload,
        },
      };
    default:
      return state;
  }
}
