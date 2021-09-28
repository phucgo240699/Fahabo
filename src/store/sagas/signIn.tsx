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
import {addToastAction, updateSessionAction} from '@store/actionTypes/session';

function* onSignInRequest(action: AnyAction) {
  try {
    const response = yield* call(signIn, action.body);
    if (response.status === 200) {
      put(
        signInSuccess({
          ...response.data,
          accessToken: response.headers.accessToken,
        }),
      );
    } else {
      put(addToastAction(response.data.message[0], ToastType.ERROR));
    }
  } catch (error) {
    put(addToastAction(i18n.t('errorMessage.general'), ToastType.ERROR));
  } finally {
    put(updateSessionAction({loading: false}));
  }
}

function* onSignInSuccess(action: AnyAction) {
  navigateReset(StackName.MainStack);
}

export default function* () {
  yield takeLatest(SIGN_IN_REQUEST, onSignInRequest);
  yield takeLatest(SIGN_IN_SUCCESS, onSignInSuccess);
}
