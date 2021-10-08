import {apiProvider} from './apiProvider';
import {BASE_URL} from '@constants/Constants';
import {call, put, select} from 'typed-redux-saga';
import {UpdateProfileAvatarRequestType} from '@constants/types/profile';
import {accessTokenSelector} from '@store/selectors/authentication';

export function updateProfile(
  accessToken: string,
  body: UpdateProfileAvatarRequestType,
) {
  return new apiProvider(accessToken).put(`${BASE_URL}/profile`, body);
}

// export function* apiUpdateProfile(body: UpdateProfileAvatarRequestType) {
//   const accessToken = yield* select(state => accessTokenSelector(state));
//   return yield* call(updateProfile, accessToken, body);
// }
