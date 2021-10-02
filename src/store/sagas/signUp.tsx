import {AnyAction} from 'redux';
import i18n from '@locales/index';
import {
  GET_OTP_REQUEST,
  signUpSuccessAction,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  verifyUserSuccessAction,
  VERIFY_USERNAME_REQUEST,
  VERIFY_USERNAME_SUCCESS,
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
import {parseVerifyResponse} from '@utils/parsers/authentication';

function* onSignUpRequest(action: AnyAction) {
  try {
    yield* put(showHUDAction());
    const response = yield* call(signUp, action.body);
    if (response.status === 200) {
      yield* put(
        signUpSuccessAction({
          ...response.data.data,
          password: action.body.password,
        }),
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

function* onSignUpSuccess(action: AnyAction) {
  navigate(ScreenName.PinCodeScreen);
}

function* onGetOTPRequest(action: AnyAction) {
  try {
    yield* put(showHUDAction());
    const response = yield* call(getOTP, action.body);
    if (response.status === 200) {
      yield* put(
        showToastAction(
          i18n.t(`successMessage.gotOTP ${action.body.username}`),
          ToastType.SUCCESS,
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

function* onVerifyUsernameRequest(action: AnyAction) {
  try {
    yield* put(showHUDAction());
    const response = yield* call(verifyEmail, action.body);
    if (response.status === 200) {
      yield* put(
        verifyUserSuccessAction(parseVerifyResponse(response.data.data)),
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

function* onVerifyUsernameSuccess(action: AnyAction) {
  navigateReset(StackName.MainStack);
}

export default function* () {
  yield takeLatest(SIGN_UP_REQUEST, onSignUpRequest);
  yield takeLatest(SIGN_UP_SUCCESS, onSignUpSuccess);
  yield takeLatest(GET_OTP_REQUEST, onGetOTPRequest);
  yield takeLatest(VERIFY_USERNAME_REQUEST, onVerifyUsernameRequest);
  yield takeLatest(VERIFY_USERNAME_SUCCESS, onVerifyUsernameSuccess);
}
