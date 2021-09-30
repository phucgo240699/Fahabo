import {apiProvider} from './apiProvider';
import {BASE_URL} from '@constants/Constants';
import {SignUpRequestType, VerifyEmailRequestType} from '@constants/types/authentication';

export function signUp(body: SignUpRequestType) {
  return new apiProvider().post(`${BASE_URL}/register_with_email`, body);
}

export function getOTP(accessToken: string) {
  return new apiProvider(accessToken).get(`${BASE_URL}/getOTP`);
}

export function verifyEmail(accessToken: string, body: VerifyEmailRequestType) {
  return new apiProvider(accessToken).get(`${BASE_URL}/verify`);
}
