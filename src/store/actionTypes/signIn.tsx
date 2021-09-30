import {
  RefreshAccessTokenResponseType,
  SignInRequestType,
} from '@constants/types/authentication';

export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const signInRequest = (body: SignInRequestType) => ({
  type: SIGN_IN_REQUEST,
  body,
});

export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const signInSuccess = (payload: any) => ({
  type: SIGN_IN_SUCCESS,
  payload,
});

export const SIGN_IN_FAIL = 'SIGN_IN_FAIL';
export const signInFail = (error: any) => ({
  type: SIGN_IN_FAIL,
  error,
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
