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
import {addToastAction, updateSessionAction} from '@store/actionTypes/session';

function* onSignUpRequest(action: AnyAction) {
  try {
    const response = yield* call(signUp, action.body);
    if (response.status === 200) {
      put(
        signUpSuccess({
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

function* onSignUpSuccess(action: AnyAction) {
  navigate(ScreenName.PinCodeScreen);
}

export default function* () {
  yield takeLatest(SIGN_UP_REQUEST, onSignUpRequest);
  yield takeLatest(SIGN_UP_SUCCESS, onSignUpSuccess);
}
