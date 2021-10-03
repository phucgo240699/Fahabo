import {apiProvider} from './apiProvider';
import {BASE_URL} from '@constants/Constants';
import {
  ForgotPasswordRequestType,
  SignUpRequestType,
  VerifyUsernameRequestType,
} from '@constants/types/authentication';

export function signUp(body: SignUpRequestType) {
  return new apiProvider().post(`${BASE_URL}/register_with_email`, body);
}

export function getOTP(body: {email: string}) {
  return new apiProvider().post(`${BASE_URL}/getOTP`, body);
}

export function verifyEmail(body: VerifyUsernameRequestType) {
  return new apiProvider().post(`${BASE_URL}/verify`, body);
}

export function forgotPassword(body: ForgotPasswordRequestType) {
  return new apiProvider().post(`${BASE_URL}/forgotPassword`, body);
}
