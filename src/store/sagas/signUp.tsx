import {AnyAction} from 'redux';
import i18n from '@locales/index';
import {
  GET_OTP_REQUEST,
  signUpSuccess,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  verifyEmailSuccess,
  VERIFY_EMAIL_REQUEST,
  VERIFY_EMAIL_SUCCESS,
} from '@store/actionTypes/signUp';
import {getOTP, signUp, verifyEmail} from '@services/signUp';
import {navigate, navigateReset} from '@navigators/index';
import {ScreenName, StackName} from '@constants/Constants';
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
    console.log({response});
    if (response.status === 200) {
      yield* put(
        signUpSuccess({
          ...response.data,
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        }),
      );
    } else {
      yield* put(showToastAction(response.data.errors[0], ToastType.ERROR));
    }
  } catch (error) {
    console.log({error});
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
    if (response.status !== 200) {
      yield* put(
        showToastAction(i18n.t(response.data.errors[0]), ToastType.ERROR),
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

function* onVerifyEmail(action: AnyAction) {
  try {
    yield* put(showHUDAction());
    const accessToken = useSelector(accessTokenSelector);
    const response = yield* apiProxy(verifyEmail, accessToken, action.body.otp);
    if (response.status === 200) {
      yield* put(verifyEmailSuccess());
    } else {
      yield* put(
        showToastAction(i18n.t(response.data.errors[0]), ToastType.ERROR),
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

function* onVerifyEmailSuccess(action: AnyAction) {
  yield* put(
    showToastAction(i18n.t('successMessage.signUpComplete'), ToastType.SUCCESS),
  );
  navigateReset(StackName.AuthenticationStack);
}

export default function* () {
  yield takeLeading(SIGN_UP_REQUEST, onSignUpRequest);
  yield takeLatest(SIGN_UP_SUCCESS, onSignUpSuccess);
  yield takeLatest(GET_OTP_REQUEST, onGetOTP);
  yield takeLeading(VERIFY_EMAIL_REQUEST, onVerifyEmail);
  yield takeLeading(VERIFY_EMAIL_SUCCESS, onVerifyEmailSuccess);
}
