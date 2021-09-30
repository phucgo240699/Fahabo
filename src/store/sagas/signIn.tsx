import {AnyAction} from 'redux';
import i18n from '@locales/index';
import {
  signInSuccess,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
} from '@store/actionTypes/signIn';
import {signIn} from '@services/signIn';
import {call, put} from 'typed-redux-saga';
import {takeLatest} from 'redux-saga/effects';
import {StackName} from '@constants/Constants';
import {navigateReset} from '@navigators/index';
import {ToastType} from '@constants/types/session';
import {
  closeHUDAction,
  showHUDAction,
  showToastAction,
} from '@store/actionTypes/session';

function* onSignInRequest(action: AnyAction) {
  try {
    yield* put(showHUDAction());
    const response = yield* call(signIn, action.body);

    if (response.status === 200) {
      yield* put(
        signInSuccess({
          ...response.data,
          accessToken: response.data.accessToken,
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

function* onSignInSuccess(action: AnyAction) {
  navigateReset(StackName.MainStack);
}

export default function* () {
  yield takeLatest(SIGN_IN_REQUEST, onSignInRequest);
  yield takeLatest(SIGN_IN_SUCCESS, onSignInSuccess);
}
