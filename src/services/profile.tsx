import {apiProvider} from './apiProvider';
import {call, select} from 'typed-redux-saga';
import {BASE_URL} from '@constants/Constants';
import {
  UpdatePasswordRequestType,
  UpdateProfileAvatarRequestType,
} from '@constants/types/profile';
import {accessTokenSelector} from '@store/selectors/authentication';

export function getAvatarApi(accessToken?: string) {
  return new apiProvider(accessToken).get(`${BASE_URL}/users/avatar`);
}
export function getPreviewAlbumApi(accessToken?: string) {
  return new apiProvider(accessToken).get(`${BASE_URL}/users/preview_images`);
}

export function updateProfileApi(
  accessToken?: string,
  body?: UpdateProfileAvatarRequestType,
) {
  return new apiProvider(accessToken).put(`${BASE_URL}/users/profile`, body);
}

export function updatePasswordApi(
  accessToken?: string,
  body?: UpdatePasswordRequestType,
) {
  return new apiProvider(accessToken).put(`${BASE_URL}/change_password`, body);
}
