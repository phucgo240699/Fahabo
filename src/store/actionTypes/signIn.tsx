import {SignInBodyRequestType} from '@constants/types/authentication';

export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const signInRequest = (body: SignInBodyRequestType) => ({
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
