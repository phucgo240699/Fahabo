import {AnyAction} from 'redux';
import i18n from '@locales/index';
import {
  GET_OTP_REQUEST,
  signUpSuccess,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
} from '@store/actionTypes/signUp';
import {getOTP, signUp} from '@services/signUp';
import {navigate} from '@navigators/index';
import {ScreenName} from '@constants/Constants';
import {ToastType} from '@constants/types/session';
import {call, put, takeLatest, takeLeading} from 'typed-redux-saga';
import {
  closeHUDAction,
  showHUDAction,
  showToastAction,
} from '@store/actionTypes/session';
import {apiProxy} from './apiProxy';
import {accessTokenSelector} from '@store/selectors/authentication';
import {useSelector} from 'react-redux';

function* onSignUpRequest(action: AnyAction) {
  try {
    yield* put(showHUDAction());
    const response = yield* call(signUp, action.body);

    if (response.status === 200) {
      yield* put(
        signUpSuccess({
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

function* onSignUpSuccess(action: AnyAction) {
  navigate(ScreenName.PinCodeScreen);
}

function* onGetOTP(action: AnyAction) {
  try {
    yield* put(showHUDAction());
    const accessToken = useSelector(accessTokenSelector);
    const response = yield* apiProxy(getOTP, accessToken);
    if (response.status === 200) {
      showToastAction(
        i18n.t('successMessage.signUpSuccess'),
        ToastType.SUCCESS,
      );
    } else {
      yield* put(
        showToastAction(i18n.t(response.data.message[0]), ToastType.ERROR),
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

export default function* () {
  yield takeLeading(SIGN_UP_REQUEST, onSignUpRequest);
  yield takeLatest(SIGN_UP_SUCCESS, onSignUpSuccess);
  yield takeLatest(GET_OTP_REQUEST, onGetOTP);
}
