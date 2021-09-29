import {AnyAction} from 'redux';
import i18n from '@locales/index';
import {
  signUpSuccess,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
} from '@store/actionTypes/signUp';
import {signUp} from '@services/signUp';
import {navigate} from '@navigators/index';
import {ScreenName} from '@constants/Constants';
import {ToastType} from '@constants/types/session';
import {call, put, takeLatest} from 'typed-redux-saga';
import {
  closeHUDAction,
  showHUDAction,
  showToastAction,
} from '@store/actionTypes/session';

function* onSignUpRequest(action: AnyAction) {
  try {
    yield* put(showHUDAction());
    const response = yield* call(signUp, action.body);

    if (response.status === 200) {
      yield* put(
        signUpSuccess({
          ...response.data,
          accessToken: response.headers.accessToken,
        }),
      );
    } else {
      yield* put(showToastAction(response.data.message[0], ToastType.ERROR));
    }
  } catch (error) {
    yield* put(
      showToastAction(i18n.t('errorMessage.general'), ToastType.ERROR),
    );
  } finally {
    yield* put(closeHUDAction());
  }
}

function* onSignUpSuccess(action: AnyAction) {
  navigate(ScreenName.PinCodeScreen);
}

export default function* () {
  yield takeLatest(SIGN_UP_REQUEST, onSignUpRequest);
  yield takeLatest(SIGN_UP_SUCCESS, onSignUpSuccess);
}
