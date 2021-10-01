import {AnyAction} from 'redux';
import {
  SIGN_UP_SUCCESS,
  UPDATE_LANGUAGE_CODE_SUCCESS,
  VERIFY_USERNAME_SUCCESS,
} from '@store/actionTypes/signUp';
import {AUTO_SIGN_IN_SUCCESS, SIGN_IN_SUCCESS} from '@store/actionTypes/signIn';
import {AuthenticationResponseType} from '@constants/types/authentication';

export type AuthenticationState = {
  user?: AuthenticationResponseType;
  accessToken?: string;
  refreshToken?: string;
};

const defaultState: AuthenticationState = {
  user: undefined,
  accessToken: undefined,
  refreshToken: undefined,
};

export default function authenticationReducer(
  state = defaultState,
  action: AnyAction,
) {
  switch (action.type) {
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        user: {
          ...action.payload,
        },
      };
    case VERIFY_USERNAME_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case AUTO_SIGN_IN_SUCCESS:
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
