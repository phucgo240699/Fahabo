import {all, put, select, takeLeading} from 'typed-redux-saga';
import {
  addPhotosSuccessAction,
  ADD_PHOTOS_REQUEST,
  createAlbumSuccessAction,
  CREATE_ALBUM_REQUEST,
  deleteAlbumSuccessAction,
  DELETE_ALBUM_REQUEST,
  DELETE_PHOTOS_REQUEST,
  getAlbumsSuccessAction,
  getPhotosRequestAction,
  getPhotosSuccessAction,
  GET_ALBUMS_REQUEST,
  GET_PHOTOS_REQUEST,
  updateAlbumSuccessAction,
  updatePhotoSuccessAction,
  UPDATE_ALBUM_REQUEST,
  UPDATE_PHOTO_REQUEST,
} from '@store/actionTypes/albums';
import {
  AddPhotosRequestType,
  AlbumType,
  CreateAlbumRequestType,
  DeleteAlbumRequestType,
  DeletePhotosRequestType,
  GetAlbumsRequestType,
  GetPhotosRequestType,
  UpdateAlbumRequestType,
  UpdatePhotoRequestType,
} from '@constants/types/albums';
import {
  closeHUDAction,
  showHUDAction,
  showToastAction,
  updateIsLoadingAlbumsAction,
  updateIsLoadingPhotosAction,
  updateIsRefreshingAlbumsAction,
  updateIsRefreshingPhotosAction,
} from '@store/actionTypes/session';
import {ToastType} from '@constants/types/session';
import {apiProxy} from './apiProxy';
import {
  addPhotosApi,
  createAlbumApi,
  deleteAlbumApi,
  deletePhotosApi,
  getAlbumsApi,
  getPhotosApi,
  updateAlbumApi,
  updatePhotoApi,
} from '@services/albums';
import i18n from '@locales/index';
import {
  parseAlbum,
  parseAlbums,
  parsePhoto,
  parsePhotos,
} from '@utils/parsers/albums';
import {parseDataResponse, parseErrorResponse} from '@utils/parsers';
import {albumsSelector, photosSelector} from '@store/selectors/albums';
import {mixAlbums, mixPhotos} from '@utils/albums';

function* createAlbumSaga({
  body,
}: {
  type: string;
  body: CreateAlbumRequestType;
}) {
  try {
    yield* put(showHUDAction());
    const response = yield* apiProxy(createAlbumApi, body);
    if (response.status === 200) {
      yield* put(
        createAlbumSuccessAction(parseAlbum(parseDataResponse(response))),
      );
    } else {
      yield* put(
        showToastAction(
          i18n.t(`backend.${parseErrorResponse(response)}`),
          ToastType.ERROR,
        ),
      );
    }
  } catch (error) {
    yield* put(
      showToastAction(i18n.t('errorMessage.general'), ToastType.ERROR),
    );
  } finally {
    yield* put(closeHUDAction());
  }
}

function* updateAlbumSaga({
  body,
}: {
  type: string;
  body: UpdateAlbumRequestType;
}) {
  try {
    yield* put(showHUDAction());
    const response = yield* apiProxy(updateAlbumApi, body);
    if (response.status === 200) {
      yield* put(
        updateAlbumSuccessAction(parseAlbum(parseDataResponse(response))),
      );
      yield* put(
        showToastAction(
          i18n.t('successMessage.updateAlbum'),
          ToastType.SUCCESS,
        ),
      );
    } else {
      yield* put(
        showToastAction(
          i18n.t(`backend.${parseErrorResponse(response)}`),
          ToastType.ERROR,
        ),
      );
    }
  } catch (error) {
    yield* put(
      showToastAction(i18n.t('errorMessage.general'), ToastType.ERROR),
    );
  } finally {
    yield* put(closeHUDAction());
  }
}

function* deleteAlbumSaga({
  body,
}: {
  type: string;
  body: DeleteAlbumRequestType;
}) {
  try {
    yield* put(showHUDAction());
    const response = yield* apiProxy(deleteAlbumApi, body);
    if (response.status === 200) {
      yield* put(
        deleteAlbumSuccessAction(parseAlbum(parseDataResponse(response))),
      );
    } else {
      yield* put(
        showToastAction(
          i18n.t(`backend.${parseErrorResponse(response)}`),
          ToastType.ERROR,
        ),
      );
    }
  } catch (error) {
    yield* put(
      showToastAction(i18n.t('errorMessage.general'), ToastType.ERROR),
    );
  } finally {
    yield* put(closeHUDAction());
  }
}

function* getAlbumsSaga({body}: {type: string; body: GetAlbumsRequestType}) {
  try {
    if (body.showHUD) {
      yield* put(showHUDAction());
    }
    if (body.refresh) {
      yield* put(updateIsRefreshingAlbumsAction(true));
    }
    if (body.loadMore) {
      yield* put(updateIsLoadingAlbumsAction(true));
    }
    const response = yield* apiProxy(getAlbumsApi, body);
    if (response.status === 200) {
      if (body.page && body.page > 0) {
        const oldData = yield* select(albumsSelector);
        const newData = parseAlbums(parseDataResponse(response));

        yield* put(getAlbumsSuccessAction(mixAlbums(oldData, newData)));
      } else {
        yield* put(
          getAlbumsSuccessAction(parseAlbums(parseDataResponse(response))),
        );
      }
    } else {
      yield* put(
        showToastAction(
          i18n.t(`backend.${parseErrorResponse(response)}`),
          ToastType.ERROR,
        ),
      );
    }
  } catch (error) {
    yield* put(
      showToastAction(i18n.t('errorMessage.general'), ToastType.ERROR),
    );
  } finally {
    if (body.showHUD) {
      yield* put(closeHUDAction());
    }
    if (body.refresh) {
      yield* put(updateIsRefreshingAlbumsAction(false));
    }
    if (body.loadMore) {
      yield* put(updateIsLoadingAlbumsAction(false));
    }
  }
}

function* addPhotosSaga({body}: {type: string; body: AddPhotosRequestType}) {
  try {
    yield* put(showHUDAction());
    const response = yield* apiProxy(addPhotosApi, body);
    if (response.status === 200) {
      yield* put(
        addPhotosSuccessAction(parsePhotos(parseDataResponse(response))),
      );
    } else {
      yield* put(
        showToastAction(
          i18n.t(`backend.${parseErrorResponse(response)}`),
          ToastType.ERROR,
        ),
      );
    }
  } catch (error) {
    yield* put(
      showToastAction(i18n.t('errorMessage.general'), ToastType.ERROR),
    );
  } finally {
    yield* put(closeHUDAction());
  }
}

function* updatePhotoSaga({
  body,
}: {
  type: string;
  body: UpdatePhotoRequestType;
}) {
  try {
    yield* put(showHUDAction());
    const response = yield* apiProxy(updatePhotoApi, body);
    if (response.status === 200) {
      yield* put(
        updatePhotoSuccessAction(parsePhoto(parseDataResponse(response))),
      );
    } else {
      yield* put(
        showToastAction(
          i18n.t(`backend.${parseErrorResponse(response)}`),
          ToastType.ERROR,
        ),
      );
    }
  } catch (error) {
    yield* put(
      showToastAction(i18n.t('errorMessage.general'), ToastType.ERROR),
    );
  } finally {
    yield* put(closeHUDAction());
  }
}

function* deletePhotosSaga({
  body,
}: {
  type: string;
  body: DeletePhotosRequestType;
}) {
  try {
    yield* put(showHUDAction());
    const response = yield* apiProxy(deletePhotosApi, body);
    if (response.status === 200) {
      yield* put(
        getPhotosRequestAction({showHUD: true, albumId: body.albumId}),
      );
    } else {
      yield* put(
        showToastAction(
          i18n.t(`backend.${parseErrorResponse(response)}`),
          ToastType.ERROR,
        ),
      );
    }
  } catch (error) {
    yield* put(
      showToastAction(i18n.t('errorMessage.general'), ToastType.ERROR),
    );
  }
}

function* getPhotosSaga({body}: {type: string; body: GetPhotosRequestType}) {
  try {
    if (body.showHUD) {
      yield* put(showHUDAction());
    }
    if (body.refresh) {
      yield* put(updateIsRefreshingPhotosAction(true));
    }
    if (body.loadMore) {
      yield* put(updateIsLoadingPhotosAction(true));
    }
    const response = yield* apiProxy(getPhotosApi, body);
    if (response.status === 200) {
      if (body.page && body.page > 0) {
        const oldData = yield* select(photosSelector);
        const newData = parsePhotos(parseDataResponse(response));
        yield* put(getPhotosSuccessAction(mixPhotos(oldData, newData)));
      } else {
        yield* put(
          getPhotosSuccessAction(parsePhotos(parseDataResponse(response))),
        );
      }
    } else {
      yield* put(
        showToastAction(
          i18n.t(`backend.${parseErrorResponse(response)}`),
          ToastType.ERROR,
        ),
      );
    }
  } catch (error) {
    yield* put(
      showToastAction(i18n.t('errorMessage.general'), ToastType.ERROR),
    );
  } finally {
    if (body.showHUD) {
      yield* put(closeHUDAction());
    }
    if (body.refresh) {
      yield* put(updateIsRefreshingPhotosAction(false));
    }
    if (body.loadMore) {
      yield* put(updateIsLoadingPhotosAction(false));
    }
  }
}

export default function* () {
  yield* all([
    takeLeading(CREATE_ALBUM_REQUEST, createAlbumSaga),
    takeLeading(UPDATE_ALBUM_REQUEST, updateAlbumSaga),
    takeLeading(DELETE_ALBUM_REQUEST, deleteAlbumSaga),
    takeLeading(GET_ALBUMS_REQUEST, getAlbumsSaga),
    takeLeading(ADD_PHOTOS_REQUEST, addPhotosSaga),
    takeLeading(UPDATE_PHOTO_REQUEST, updatePhotoSaga),
    takeLeading(DELETE_PHOTOS_REQUEST, deletePhotosSaga),
    takeLeading(GET_PHOTOS_REQUEST, getPhotosSaga),
  ]);
}
