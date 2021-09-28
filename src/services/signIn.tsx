import {apiProvider} from './apiProvider';
import {BASE_URL} from '@constants/Constants';
import {SignInBodyRequestType} from '@constants/types/signIn';

export function signIn(body: SignInBodyRequestType) {
  return new apiProvider().post(`${BASE_URL}/api/v1/register_with_email`, body);
}
