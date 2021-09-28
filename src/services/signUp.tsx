import {apiProvider} from './apiProvider';
import {BASE_URL} from '@constants/Constants';
import {SignUpBodyRequestType} from '@constants/types/signUp';

export function signUp(body: SignUpBodyRequestType) {
  return new apiProvider().post(`${BASE_URL}/authentication/SignIn`, body);
}
