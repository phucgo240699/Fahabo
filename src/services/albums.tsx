import {isNull} from '@utils/index';
import {apiProvider} from './apiProvider';
import {BASE_URL, Pagination} from '@constants/Constants';
import {
  AddPhotosRequestType,
  CreateAlbumRequestType,
  DeleteAlbumRequestType,
  DeletePhotosRequestType,
  GetAlbumsRequestType,
  GetPhotosRequestType,
  UpdateAlbumRequestType,
  UpdatePhotoRequestType,
} from '@constants/types/albums';

export function createAlbumApi(
  accessToken?: string,
  body?: CreateAlbumRequestType,
) {
  return new apiProvider(accessToken).post(
    `${BASE_URL}/albums/new_album`,
    body,
  );
}

export function updateAlbumApi(
  accessToken?: string,
  body?: UpdateAlbumRequestType,
) {
  return new apiProvider(accessToken).post(
    `${BASE_URL}/albums/update_album`,
    body,
  );
}

export function deleteAlbumApi(
  accessToken?: string,
  body?: DeleteAlbumRequestType,
) {
  return new apiProvider(accessToken).post(
    `${BASE_URL}/albums/delete_album`,
    body,
  );
}

export function getAlbumsApi(
  accessToken?: string,
  body?: GetAlbumsRequestType,
) {
  let page = 0;
  let size = Pagination.Albums;
  if (!isNull(body)) {
    if (!isNull(body?.page)) {
      page = body?.page ?? 0;
    }
    if (!isNull(body?.size)) {
      size = body?.size ?? Pagination.Albums;
    }
  }
  return new apiProvider(accessToken).post(
    `${BASE_URL}/albums?page=${page}&size=${size}`,
    {familyId: body?.familyId},
  );
}

export function addPhotosApi(
  accessToken?: string,
  body?: AddPhotosRequestType,
) {
  return new apiProvider(accessToken).post(
    `${BASE_URL}/albums/add_photo`,
    body,
  );
}

export function updatePhotoApi(
  accessToken?: string,
  body?: UpdatePhotoRequestType,
) {
  return new apiProvider(accessToken).post(
    `${BASE_URL}/photos/update_photo`,
    body,
  );
}

export function deletePhotosApi(
  accessToken?: string,
  body?: DeletePhotosRequestType,
) {
  return new apiProvider(accessToken).post(`${BASE_URL}/photos/delete`, body);
}

export function getPhotosApi(
  accessToken?: string,
  body?: GetPhotosRequestType,
) {
  let page = 0;
  let size = Pagination.Photos;
  if (!isNull(body)) {
    if (!isNull(body?.page)) {
      page = body?.page ?? 0;
    }
    if (!isNull(body?.size)) {
      size = body?.size ?? Pagination.Photos;
    }
  }
  return new apiProvider(accessToken).post(
    `${BASE_URL}/photos?page=${page}&size=${size}`,
    {
      albumId: body?.albumId,
    },
  );
}
