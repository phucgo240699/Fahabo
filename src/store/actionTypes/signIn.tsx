import {
  RefreshAccessTokenResponseType,
  SignInRequestType,
} from '@constants/types/authentication';
import {AuthenticationState} from '@store/reducers/authentication';

export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const signInRequestAction = (body: SignInRequestType) => ({
  type: SIGN_IN_REQUEST,
  body,
});

export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const signInSuccessAction = (payload: AuthenticationState) => ({
  type: SIGN_IN_SUCCESS,
  payload,
});

export const AUTO_SIGN_IN_REQUEST = 'AUTO_SIGN_IN_REQUEST';
export const autoSignInRequestAction = (body: SignInRequestType) => ({
  type: AUTO_SIGN_IN_REQUEST,
  body,
});

export const AUTO_SIGN_IN_SUCCESS = 'AUTO_SIGN_IN_SUCCESS';
export const autoSignInSuccessAction = (payload: AuthenticationState) => ({
  type: AUTO_SIGN_IN_SUCCESS,
  payload,
});

export const REFRESH_ACCESS_TOKEN_SUCCESS = 'REFRESH_ACCESS_TOKEN_SUCCESS';
export const refreshAccessTokenSuccessAction = (
  payload: RefreshAccessTokenResponseType,
) => ({
  type: REFRESH_ACCESS_TOKEN_SUCCESS,
  payload,
});

export const LOG_OUT = 'LOG_OUT';
export const logOutAction = () => ({
  type: LOG_OUT,
});
