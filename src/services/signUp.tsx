import {apiProvider} from './apiProvider';
import {BASE_URL} from '@constants/Constants';
import {
  ForgotPasswordRequestType,
  GetOTPRequestType,
  SignUpRequestType,
  VerifyUsernameRequestType,
} from '@constants/types/authentication';

export function signUp(body: SignUpRequestType) {
  return new apiProvider().post(`${BASE_URL}/register_with_email`, body);
}

export function getCountryCode() {
  return new apiProvider().get(`${BASE_URL}/country_code_list`);
}

export function getOTP(body: GetOTPRequestType) {
  return new apiProvider().post(`${BASE_URL}/getOTP`, body);
}

export function verifyEmail(body: VerifyUsernameRequestType) {
  return new apiProvider().post(`${BASE_URL}/verify`, body);
}

export function getForgotPasswordOTP(body: GetOTPRequestType) {
  return new apiProvider().post(`${BASE_URL}/get_reset_password_otp`, body);
}

export function verifyForgotPasswordOTP(body: VerifyUsernameRequestType) {
  return new apiProvider().post(`${BASE_URL}/verify_reset_password`, body);
}

export function forgotPassword(body: ForgotPasswordRequestType) {
  return new apiProvider().post(`${BASE_URL}/forgotPassword`, body);
}
