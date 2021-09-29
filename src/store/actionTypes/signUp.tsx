import {SignUpBodyRequestType} from '@constants/types/authentication';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const signUpRequest = (body: SignUpBodyRequestType) => ({
  type: SIGN_UP_REQUEST,
  body,
});

export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const signUpSuccess = (payload: any) => ({
  type: SIGN_UP_SUCCESS,
  payload,
});

export const SIGN_UP_FAIL = 'SIGN_UP_FAIL';
export const signUpFail = (error: any) => ({
  type: SIGN_UP_FAIL,
  error,
});

export const UPDATE_LANGUAGE_CODE_SUCCESS = 'UPDATE_LANGUAGE_CODE_SUCCESS';
export const updateLanguageCode = (payload: string) => ({
  type: UPDATE_LANGUAGE_CODE_SUCCESS,
  payload,
});
