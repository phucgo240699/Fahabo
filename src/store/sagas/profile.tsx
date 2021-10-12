import {ToastType} from '@constants/types/session';
import i18n from '@locales/index';
import {navigationRef, navigate} from '@navigators/index';
import {
  // getAvatarApi,
  getPreviewAlbumApi,
  updatePasswordApi,
  updateProfileApi,
  updateProfileAvatarApi,
} from '@services/profile';
import {
  // getAvatarSuccessAction,
  getPreviewAlbumSuccessAction,
  // GET_AVATAR_REQUEST,
  GET_PREVIEW_ALBUM_REQUEST,
  updateLanguageSuccessAction,
  updatePasswordSuccessAction,
  updateProfileAvatarSuccessAction,
  updateProfileSuccessAction,
  UPDATE_LANGUAGE_REQUEST,
  UPDATE_LANGUAGE_SUCCESS,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PROFILE_AVATAR_REQUEST,
  UPDATE_PROFILE_AVATAR_SUCCESS,
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
import {all, delay, put, takeLeading} from 'typed-redux-saga';
import {apiProxy} from './apiProxy';
import {CommonActions} from '@react-navigation/native';
import {parseUpdateProfileResponse} from '@utils/parsers/authentication';
import RNRestart from 'react-native-restart';
import {ScreenName} from '@constants/Constants';

// function* onGetAvatarSaga(action: AnyAction) {
//   try {
//     const response: any = yield* apiProxy(getAvatarApi);
//     if (response.status === 200) {
//       yield* put(
//         getAvatarSuccessAction(parseGetAvatarResponse(response.data.data)),
//       );
//     } else {
//       yield* put(
//         showToastAction(i18n.t(`backend.${response.data.errors[0]}`), ToastType.ERROR),
//       );
//     }
//   } catch (error) {
//     yield* put(
//       showToastAction(i18n.t('errorMessage.general'), ToastType.ERROR),
//     );
//   }
// }
function* onGetPreviewAlbumSaga(action: AnyAction) {
  try {
    const response: any = yield* apiProxy(getPreviewAlbumApi);
    if (response.status === 200) {
      yield* put(getPreviewAlbumSuccessAction(response.data.data));
    } else {
      yield* put(
        showToastAction(
          i18n.t(`backend.${response.data.errors[0]}`),
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

// Avatar
function* onUpdateProfileAvatarSaga(action: AnyAction) {
  try {
    yield* put(showHUDAction());
    const response: any = yield* apiProxy(updateProfileAvatarApi, action.body);
    if (response.status === 200) {
      yield* put(
        showToastAction(
          i18n.t('successMessage.updateAvatar'),
          ToastType.SUCCESS,
        ),
      );
      yield* put(updateProfileAvatarSuccessAction(response.data.data));
    } else {
      yield* put(
        showToastAction(
          i18n.t(`backend.${response.data.errors[0]}`),
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
function* onUpdateProfileAvatarSuccessSaga(action: AnyAction) {
  navigate(ScreenName.ProfileScreen);
}

// Profile
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
        showToastAction(
          i18n.t(`backend.${response.data.errors[0]}`),
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
function* onUpdateProfileSuccessSaga(action: AnyAction) {
  navigationRef.current.dispatch(CommonActions.goBack());
}

// Language
function* onUpdateLanguageSaga(action: AnyAction) {
  try {
    yield* put(showHUDAction());
    const response = yield* apiProxy(updateProfileApi, action.body);
    if (response.status === 200) {
      yield* put(
        showToastAction(
          i18n.t('successMessage.updateLanguage'),
          ToastType.SUCCESS,
        ),
      );
      yield* put(
        updateLanguageSuccessAction(
          parseUpdateProfileResponse(response.data.data),
        ),
      );
    } else {
      yield* put(
        showToastAction(
          i18n.t(`backend.${response.data.errors[0]}`),
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
function* onUpdateLanguageSuccessSaga(action: AnyAction) {
  yield* delay(300);
  RNRestart.Restart();
}

// Password
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
        showToastAction(
          i18n.t(`backend.${response.data.errors[0]}`),
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
function* onUpdatePasswordSuccessSaga(action: AnyAction) {
  navigationRef.current.dispatch(CommonActions.goBack());
}

export default function* () {
  yield* all([
    // takeLeading(GET_AVATAR_REQUEST, onGetAvatarSaga),
    takeLeading(GET_PREVIEW_ALBUM_REQUEST, onGetPreviewAlbumSaga),
    takeLeading(UPDATE_PROFILE_AVATAR_REQUEST, onUpdateProfileAvatarSaga), // Avatar
    takeLeading(
      UPDATE_PROFILE_AVATAR_SUCCESS,
      onUpdateProfileAvatarSuccessSaga,
    ),
    takeLeading(UPDATE_PROFILE_REQUEST, onUpdateProfileSaga), // Profile
    takeLeading(UPDATE_PROFILE_SUCCESS, onUpdateProfileSuccessSaga),
    takeLeading(UPDATE_LANGUAGE_REQUEST, onUpdateLanguageSaga), // Language
    takeLeading(UPDATE_LANGUAGE_SUCCESS, onUpdateLanguageSuccessSaga),
    takeLeading(UPDATE_PASSWORD_REQUEST, onUpdatePasswordSaga), // Password
    takeLeading(UPDATE_PASSWORD_SUCCESS, onUpdatePasswordSuccessSaga),
  ]);
}
