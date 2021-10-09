import {apiProvider} from './apiProvider';
import {BASE_URL} from '@constants/Constants';
import {
  RefreshAccessTokenRequestType,
  SignInRequestType,
} from '@constants/types/authentication';

export function signIn(body: SignInRequestType) {
  return new apiProvider().post(`${BASE_URL}/login`, body);
}

export function refreshAccessToken(body: RefreshAccessTokenRequestType) {
  return new apiProvider().post(`${BASE_URL}/token`, body);
}
