import {BASE_URL, Pagination} from '@constants/Constants';
import {
  CreateChoreRequestType,
  DeleteChoreRequestType,
  GetChorePhotosRequestType,
  GetChoresRequestType,
  UpdateChoreRequestType,
} from '@constants/types/chores';
import {isNull} from '@utils/index';
import {apiProvider} from './apiProvider';

export function createChoreApi(
  accessToken?: string,
  body?: CreateChoreRequestType,
) {
  return new apiProvider(accessToken).post(
    `${BASE_URL}/chores/new_chore`,
    body,
  );
}

export function updateChoreApi(
  accessToken?: string,
  body?: UpdateChoreRequestType,
) {
  return new apiProvider(accessToken).post(
    `${BASE_URL}/chores/update_chore`,
    body,
  );
}

export function deleteChoreApi(
  accessToken?: string,
  body?: DeleteChoreRequestType,
) {
  return new apiProvider(accessToken).post(
    `${BASE_URL}/chores/delete_chore`,
    body,
  );
}

export function getChoresApi(
  accessToken?: string,
  body?: GetChoresRequestType,
) {
  let page = 0;
  let size = Pagination.Chores;
  if (!isNull(body)) {
    if (!isNull(body?.page)) {
      page = body?.page ?? 0;
    }
    if (!isNull(body?.size)) {
      size = body?.size ?? Pagination.Chores;
    }
  }
  return new apiProvider(accessToken).post(
    `${BASE_URL}/chores?page=${page}&size=${size}`,
    body,
  );
}

export function getChorePhotosApi(
  accessToken?: string,
  body?: GetChorePhotosRequestType,
) {
  return new apiProvider(accessToken).post(
    `${BASE_URL}/chores/get_chore_photos`,
    body,
  );
}
