import {apiProvider} from './apiProvider';
import {BASE_URL} from '@constants/Constants';
import {SignInRequestType} from '@constants/types/signIn';

export function signIn(body: SignInRequestType) {
  return new apiProvider().post(`${BASE_URL}/authentication/SignIn`, {
    account: body.account,
    password: body.password,
  });
}
