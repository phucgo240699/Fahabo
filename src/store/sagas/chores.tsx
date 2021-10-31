import {
  CreateChoreRequestType,
  DeleteChoreRequestType,
  GetChorePhotosRequestType,
  GetChoresRequestType,
  UpdateChoreRequestType,
} from '@constants/types/chores';
import {ToastType} from '@constants/types/session';
import i18n from '@locales/index';
import {navigationRef} from '@navigators/index';
import {
  createChoreApi,
  deleteChoreApi,
  getChorePhotosApi,
  getChoresApi,
  updateChoreApi,
} from '@services/chores';
import {
  createChoreSuccessAction,
  CREATE_CHORE_REQUEST,
  deleteChoreSuccessAction,
  DELETE_CHORE_REQUEST,
  getChorePhotosSuccessAction,
  getChoresSuccessAction,
  GET_CHORES_REQUEST,
  GET_CHORE_PHOTOS_REQUEST,
  updateChoreSuccessAction,
  UPDATE_CHORE_REQUEST,
} from '@store/actionTypes/chores';
import {
  closeHUDAction,
  showHUDAction,
  showToastAction,
  updateIsLoadingChorePhotosAction,
  updateIsLoadingChoresAction,
  updateIsRefreshingChorePhotosAction,
  updateIsRefreshingChoresAction,
} from '@store/actionTypes/session';
import {chorePhotosSelector, choresSelector} from '@store/selectors/chores';
import {mixPhotos} from '@utils/albums';
import {mixChores} from '@utils/chores';
import {parseDataResponse, parseErrorResponse} from '@utils/parsers';
import {parsePhotos} from '@utils/parsers/albums';
import {parseChore, parseChores} from '@utils/parsers/chores';
import {all, put, select, takeLeading} from 'typed-redux-saga';
import {apiProxy} from './apiProxy';
import {CommonActions} from '@react-navigation/native';

function* createChoreSaga({
  body,
}: {
  type: string;
  body: CreateChoreRequestType;
}) {
  try {
    yield* put(showHUDAction());
    const response = yield* apiProxy(createChoreApi, body);
    if (response.status === 200) {
      yield* put(
        createChoreSuccessAction(parseChore(parseDataResponse(response))),
      );
      yield* put(
        showToastAction(
          i18n.t('successMessage.createChore'),
          ToastType.SUCCESS,
        ),
      );
      navigationRef.current?.dispatch(CommonActions.goBack());
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

function* updateChoreSaga({
  body,
}: {
  type: string;
  body: UpdateChoreRequestType;
}) {
  try {
    yield* put(showHUDAction());
    const response = yield* apiProxy(updateChoreApi, body);
    if (response.status === 200) {
      yield* put(
        updateChoreSuccessAction(parseChore(parseDataResponse(response))),
      );
      yield* put(
        showToastAction(
          i18n.t('successMessage.updateChore'),
          ToastType.SUCCESS,
        ),
      );
      if (body.goBack === true) {
        navigationRef.current?.dispatch(CommonActions.goBack());
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
    yield* put(closeHUDAction());
  }
}

function* deleteChoreSaga({
  body,
}: {
  type: string;
  body: DeleteChoreRequestType;
}) {
  try {
    yield* put(showHUDAction());
    const response = yield* apiProxy(deleteChoreApi, body);
    if (response.status === 200) {
      yield* put(deleteChoreSuccessAction(parseDataResponse(response)));
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

function* getChoresSaga({body}: {type: string; body: GetChoresRequestType}) {
  try {
    if (body.showHUD) {
      yield* put(showHUDAction());
    }
    if (body.refresh) {
      yield* put(updateIsRefreshingChoresAction(true));
    }
    if (body.loadMore) {
      yield* put(updateIsLoadingChoresAction(true));
    }
    const response = yield* apiProxy(getChoresApi, body);
    if (response.status === 200) {
      if (body.page && body.page > 0) {
        const newData = parseChores(parseDataResponse(response));
        if (newData.length > 0) {
          const oldData = yield* select(choresSelector);
          yield* put(getChoresSuccessAction(mixChores(oldData, newData)));
        }
      } else {
        yield* put(
          getChoresSuccessAction(parseChores(parseDataResponse(response))),
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
      yield* put(updateIsRefreshingChoresAction(false));
    }
    if (body.loadMore) {
      yield* put(updateIsLoadingChoresAction(false));
    }
  }
}

function* getChorePhotosSaga({
  body,
}: {
  type: string;
  body: GetChorePhotosRequestType;
}) {
  try {
    if (body.showHUD) {
      yield* put(showHUDAction());
    }
    if (body.refresh) {
      yield* put(updateIsRefreshingChorePhotosAction(true));
    }
    if (body.loadMore) {
      yield* put(updateIsLoadingChorePhotosAction(true));
    }
    const response = yield* apiProxy(getChorePhotosApi, body);
    if (response.status === 200) {
      if (body.page && body.page > 0) {
        const oldData = yield* select(chorePhotosSelector);
        const newData = parsePhotos(parseDataResponse(response));
        yield* put(getChorePhotosSuccessAction(mixPhotos(oldData, newData)));
      } else {
        yield* put(
          getChorePhotosSuccessAction(parsePhotos(parseDataResponse(response))),
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
      yield* put(updateIsRefreshingChorePhotosAction(false));
    }
    if (body.loadMore) {
      yield* put(updateIsLoadingChorePhotosAction(false));
    }
  }
}

export default function* () {
  yield* all([
    takeLeading(CREATE_CHORE_REQUEST, createChoreSaga),
    takeLeading(UPDATE_CHORE_REQUEST, updateChoreSaga),
    takeLeading(DELETE_CHORE_REQUEST, deleteChoreSaga),
    takeLeading(GET_CHORES_REQUEST, getChoresSaga),
    takeLeading(GET_CHORE_PHOTOS_REQUEST, getChorePhotosSaga),
  ]);
}
