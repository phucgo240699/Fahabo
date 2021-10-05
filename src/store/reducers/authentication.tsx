import {AnyAction} from 'redux';
import {
  GET_COUNTRY_CODE_SUCCESS,
  SIGN_UP_SUCCESS,
  VERIFY_USERNAME_SUCCESS,
} from '@store/actionTypes/signUp';
import {
  AUTO_SIGN_IN_SUCCESS,
  LOG_OUT,
  REFRESH_ACCESS_TOKEN_SUCCESS,
  SIGN_IN_SUCCESS,
} from '@store/actionTypes/signIn';
import {AuthenticationResponseType} from '@constants/types/authentication';

export type AuthenticationState = {
  user?: AuthenticationResponseType;
  listCountryCode?: Record<string, string>[];
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
    case GET_COUNTRY_CODE_SUCCESS:
      return {
        ...state,
        listCountryCode: action.payload.data,
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
    case REFRESH_ACCESS_TOKEN_SUCCESS:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    case LOG_OUT:
      return {
        ...state,
        user: undefined,
        accessToken: undefined,
        refreshToken: undefined,
      };
    default:
      return state;
  }
}
