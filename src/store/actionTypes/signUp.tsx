import {
  SignUpRequestType,
  VerifyEmailRequestType,
} from '@constants/types/authentication';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const signUpRequest = (body: SignUpRequestType) => ({
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

export const GET_OTP_REQUEST = 'GET_OTP_REQUEST';
export const getOTPRequest = () => ({
  type: GET_OTP_REQUEST,
});

export const VERIFY_EMAIL_REQUEST = 'VERIFY_EMAIL_REQUEST';
export const verifyEmailRequest = (body: VerifyEmailRequestType) => ({
  type: VERIFY_EMAIL_REQUEST,
  body,
});

export const VERIFY_EMAIL_SUCCESS = 'VERIFY_EMAIL_SUCCESS';
export const verifyEmailSuccess = () => ({
  type: VERIFY_EMAIL_SUCCESS,
});

export const UPDATE_LANGUAGE_CODE_SUCCESS = 'UPDATE_LANGUAGE_CODE_SUCCESS';
export const updateLanguageCodeSuccess = (payload: any) => ({
  type: UPDATE_LANGUAGE_CODE_SUCCESS,
  payload,
});
