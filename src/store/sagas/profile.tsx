import {ToastType} from '@constants/types/session';
import i18n from '@locales/index';
import {navigationRef, navigate, navigateReset} from '@navigators/index';
import {
  getProfileApi,
  updatePasswordApi,
  updateProfileApi,
  updateProfileAvatarApi,
} from '@services/profile';
import {
  getProfileSuccessAction,
  GET_PROFILE_REQUEST,
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
import {updateIsRefreshingProfileAction} from '@store/actionTypes/profile';
import {AnyAction} from 'redux';
import {all, delay, put, takeLeading} from 'typed-redux-saga';
import {apiProxy} from './apiProxy';
import {CommonActions} from '@react-navigation/native';
import {
  parseUpdateProfileResponse,
  parseUser,
} from '@utils/parsers/authentication';
import {ScreenName, StackName} from '@constants/Constants';
import {parseDataResponse, parseErrorResponse} from '@utils/parsers';
import {setGlobalLocale} from '@utils/index';
import {getHomeScreenDataRequestAction} from '@store/actionTypes/screens';

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
      yield* put(updateProfileAvatarSuccessAction(parseDataResponse(response)));
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
function* onUpdateProfileAvatarSuccessSaga(action: AnyAction) {
  navigate(ScreenName.ProfileScreen);
}

// Profile
function* onGetProfileSaga(action: AnyAction) {
  try {
    yield* put(updateIsRefreshingProfileAction(true));
    const response: any = yield* apiProxy(getProfileApi, action.body);
    if (response.status === 200) {
      yield* put(
        getProfileSuccessAction(parseUser(parseDataResponse(response))),
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
    yield* put(updateIsRefreshingProfileAction(false));
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
          parseUpdateProfileResponse(parseDataResponse(response)),
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
function* onUpdateProfileSuccessSaga(action: AnyAction) {
  navigationRef.current.dispatch(CommonActions.goBack());
}

// Language
function* onUpdateLanguageSaga(action: AnyAction) {
  try {
    yield* put(showHUDAction());
    const response = yield* apiProxy(updateProfileApi, action.body);
    if (response.status === 200) {
      const data = parseDataResponse(response);
      console.log('\n');
      console.log('data.languageCode: ', data.languageCode);
      console.log('\n');
      setGlobalLocale(data.languageCode);
      yield* put(
        showToastAction(
          i18n.t('successMessage.updateLanguage'),
          ToastType.SUCCESS,
        ),
      );
      yield* put(
        updateLanguageSuccessAction(
          parseUpdateProfileResponse(parseDataResponse(response)),
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
function* onUpdateLanguageSuccessSaga(action: AnyAction) {
  yield* delay(300);
  yield* put(getHomeScreenDataRequestAction());
  navigateReset(StackName.MainStack);
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
function* onUpdatePasswordSuccessSaga(action: AnyAction) {
  navigationRef.current.dispatch(CommonActions.goBack());
}

export default function* () {
  yield* all([
    takeLeading(UPDATE_PROFILE_AVATAR_REQUEST, onUpdateProfileAvatarSaga), // Avatar
    takeLeading(
      UPDATE_PROFILE_AVATAR_SUCCESS,
      onUpdateProfileAvatarSuccessSaga,
    ),
    takeLeading(GET_PROFILE_REQUEST, onGetProfileSaga), // Profile
    takeLeading(UPDATE_PROFILE_REQUEST, onUpdateProfileSaga),
    takeLeading(UPDATE_PROFILE_SUCCESS, onUpdateProfileSuccessSaga),
    takeLeading(UPDATE_LANGUAGE_REQUEST, onUpdateLanguageSaga), // Language
    takeLeading(UPDATE_LANGUAGE_SUCCESS, onUpdateLanguageSuccessSaga),
    takeLeading(UPDATE_PASSWORD_REQUEST, onUpdatePasswordSaga), // Password
    takeLeading(UPDATE_PASSWORD_SUCCESS, onUpdatePasswordSuccessSaga),
  ]);
}
