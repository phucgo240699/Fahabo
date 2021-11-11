import {apiProvider} from './apiProvider';
import {BASE_URL} from '@constants/Constants';
import {
  AddFCMTokenRequestType,
  LogOutRequestType,
  RefreshAccessTokenRequestType,
  SignInRequestType,
} from '@constants/types/authentication';

export function signIn(body: SignInRequestType) {
  return new apiProvider().post(`${BASE_URL}/login`, body);
}

export function refreshAccessToken(body: RefreshAccessTokenRequestType) {
  return new apiProvider().post(`${BASE_URL}/token`, body);
}

export function addFCMTokenApi(
  accessToken?: string,
  body?: AddFCMTokenRequestType,
) {
  return new apiProvider(accessToken).post(
    `${BASE_URL}/add_user_firebase_token`,
    body,
  );
}

export function logOutApi(accessToken?: string, body?: LogOutRequestType) {
  return new apiProvider(accessToken).post(`${BASE_URL}/logout`, body);
}
