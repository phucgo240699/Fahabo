import {ToastType} from '@constants/types/session';
import i18n from '@locales/index';
import {navigationRef, navigate} from '@navigators/index';
import {
  getAvatarApi,
  getPreviewAlbumApi,
  updatePasswordApi,
  updateProfileApi,
} from '@services/profile';
import {
  getAvatarSuccessAction,
  getPreviewAlbumSuccessAction,
  GET_AVATAR_REQUEST,
  GET_PREVIEW_ALBUM_REQUEST,
  updatePasswordSuccessAction,
  updateProfileSuccessAction,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PROFILE_AVATAR_REQUEST,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
} from '@store/actionTypes/profile';
import {
  closeHUDAction,
  showHUDAction,
  showToastAction,
} from '@store/actionTypes/session';
import {parseGetAvatarResponse} from '@utils/parsers/profile';
import {AnyAction} from 'redux';
import {all, put, takeLeading} from 'typed-redux-saga';
import {apiProxy} from './apiProxy';
import {CommonActions} from '@react-navigation/native';
import {parseUpdateProfileResponse} from '@utils/parsers/authentication';

function* onGetAvatarSaga(action: AnyAction) {
  try {
    const response: any = yield* apiProxy(getAvatarApi);
    if (response.status === 200) {
      yield* put(
        getAvatarSuccessAction(parseGetAvatarResponse(response.data.data)),
      );
    } else {
      yield* put(
        showToastAction(`${response.data.errors[0]}`, ToastType.ERROR),
      );
    }
  } catch (error) {
    yield* put(
      showToastAction(i18n.t('errorMessage.general'), ToastType.ERROR),
    );
  }
}

function* onGetPreviewAlbumSaga(action: AnyAction) {
  try {
    const response: any = yield* apiProxy(getPreviewAlbumApi);
    if (response.status === 200) {
      yield* put(getPreviewAlbumSuccessAction(response.data.data));
    } else {
      yield* put(
        showToastAction(`${response.data.errors[0]}`, ToastType.ERROR),
      );
    }
  } catch (error) {
    yield* put(
      showToastAction(i18n.t('errorMessage.general'), ToastType.ERROR),
    );
  }
}

function* onUpdateProfileSaga(action: AnyAction) {
  try {
    yield* put(showHUDAction());
    const response = yield* apiProxy(updateProfileApi, action.body);
    if (response.status === 200) {
      yield* put(
        showToastAction(
          i18n.t('successMessage.updateProfile'),
          ToastType.SUCCESS,
        ),
      );
      yield* put(
        updateProfileSuccessAction(
          parseUpdateProfileResponse(response.data.data),
        ),
      );
    } else {
      yield* put(
        showToastAction(`${response.data.errors[0]}`, ToastType.ERROR),
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

function* onUpdateProfileSuccessSaga(action: AnyAction) {
  navigationRef.current.dispatch(CommonActions.goBack());
}

function* onUpdatePasswordSaga(action: AnyAction) {
  try {
    yield* put(showHUDAction());
    const response = yield* apiProxy(updatePasswordApi, action.body);
    if (response.status === 200) {
      yield* put(
        showToastAction(
          i18n.t('successMessage.updatePassword'),
          ToastType.SUCCESS,
        ),
      );
      yield* put(updatePasswordSuccessAction({password: action.body.password}));
    } else {
      yield* put(
        showToastAction(`${response.data.errors[0]}`, ToastType.ERROR),
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

function* onUpdatePasswordSuccessSaga(action: AnyAction) {
  navigationRef.current.dispatch(CommonActions.goBack());
}

function* onUpdateProfileAvatarSaga(action: AnyAction) {}

export default function* () {
  yield* all([
    takeLeading(GET_AVATAR_REQUEST, onGetAvatarSaga),
    takeLeading(GET_PREVIEW_ALBUM_REQUEST, onGetPreviewAlbumSaga),
    takeLeading(UPDATE_PROFILE_REQUEST, onUpdateProfileSaga),
    takeLeading(UPDATE_PROFILE_SUCCESS, onUpdateProfileSuccessSaga),
    takeLeading(UPDATE_PASSWORD_REQUEST, onUpdatePasswordSaga),
    takeLeading(UPDATE_PASSWORD_SUCCESS, onUpdatePasswordSuccessSaga),
    takeLeading(UPDATE_PROFILE_AVATAR_REQUEST, onUpdateProfileAvatarSaga),
  ]);
}
