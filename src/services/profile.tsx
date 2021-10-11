import {apiProvider} from './apiProvider';
import {BASE_URL} from '@constants/Constants';
import {
  UpdatePasswordRequestType,
  UpdateProfileAvatarRequestType,
  UpdateProfileRequestType,
} from '@constants/types/profile';

// export function getAvatarApi(accessToken?: string) {
//   return new apiProvider(accessToken).get(`${BASE_URL}/users/avatar`);
// }
export function getPreviewAlbumApi(accessToken?: string) {
  return new apiProvider(accessToken).get(`${BASE_URL}/users/preview_images`);
}

export function updateProfileAvatarApi(
  accessToken?: string,
  body?: UpdateProfileAvatarRequestType,
) {
  return new apiProvider(accessToken).post(
    `${BASE_URL}/users/update_avatar`,
    body,
  );
}

export function updateProfileApi(
  accessToken?: string,
  body?: UpdateProfileRequestType,
) {
  return new apiProvider(accessToken).post(
    `${BASE_URL}/users/update_profile`,
    body,
  );
}

export function updatePasswordApi(
  accessToken?: string,
  body?: UpdatePasswordRequestType,
) {
  return new apiProvider(accessToken).post(`${BASE_URL}/change_password`, body);
}
