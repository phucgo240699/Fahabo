import {
  AuthenticationResponseType,
  CountryCodeResponseType,
  ForgotPasswordRequestType,
  GetOTPRequestType,
  SignUpRequestType,
  VerifyUsernameRequestType,
} from '@constants/types/authentication';
import {AuthenticationState} from '@store/reducers/authentication';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const signUpRequestAction = (body: SignUpRequestType) => ({
  type: SIGN_UP_REQUEST,
  body,
});
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const signUpSuccessAction = (payload: AuthenticationResponseType) => ({
  type: SIGN_UP_SUCCESS,
  payload,
});

export const GET_COUNTRY_CODE_REQUEST = 'GET_COUNTRY_CODE_REQUEST';
export const getCountryCodeRequestAction = () => ({
  type: GET_COUNTRY_CODE_REQUEST,
});
export const GET_COUNTRY_CODE_SUCCESS = 'GET_COUNTRY_CODE_SUCCESS';
export const getCountryCodeSuccessAction = (
  payload: CountryCodeResponseType,
) => ({
  type: GET_COUNTRY_CODE_SUCCESS,
  payload,
});

export const GET_OTP_REQUEST = 'GET_OTP_REQUEST';
export const getOTPRequestAction = (body: GetOTPRequestType) => ({
  type: GET_OTP_REQUEST,
  body,
});

export const GET_OTP_REQUEST_BACKGROUND = 'GET_OTP_REQUEST_BACKGROUND';
export const getOTPRequestBackgroundAction = (body: GetOTPRequestType) => ({
  type: GET_OTP_REQUEST_BACKGROUND,
  body,
});

export const VERIFY_USERNAME_REQUEST = 'VERIFY_USERNAME_REQUEST';
export const verifyUsernameRequestAction = (
  body: VerifyUsernameRequestType,
) => ({
  type: VERIFY_USERNAME_REQUEST,
  body,
});
export const VERIFY_USERNAME_SUCCESS = 'VERIFY_USERNAME_SUCCESS';
export const verifyUserSuccessAction = (payload: AuthenticationState) => ({
  type: VERIFY_USERNAME_SUCCESS,
  payload,
});

export const GET_FORGOT_PASSWORD_OTP_REQUEST =
  'GET_FORGOT_PASSWORD_OTP_REQUEST';
export const getForgotPasswordOTPRequestAction = (body: GetOTPRequestType) => ({
  type: GET_FORGOT_PASSWORD_OTP_REQUEST,
  body,
});

export const VERIFY_FORGOT_PASSWORD_OTP_REQUEST =
  'VERIFY_FORGOT_PASSWORD_OTP_REQUEST';
export const verifyForgotPasswordOTPRequestAction = (
  body: VerifyUsernameRequestType,
) => ({
  type: VERIFY_FORGOT_PASSWORD_OTP_REQUEST,
  body,
});

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const forgotPasswordRequestAction = (
  body: ForgotPasswordRequestType,
) => ({
  type: FORGOT_PASSWORD_REQUEST,
  body,
});
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const forgotPasswordSuccessAction = () => ({
  type: FORGOT_PASSWORD_SUCCESS,
});
