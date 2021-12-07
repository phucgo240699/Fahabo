import {AnyAction} from 'redux';
import i18n from '@locales/index';
import {
  closeHUDAction,
  showHUDAction,
  showToastAction,
} from '@store/actionTypes/session';
import {
  forgotPasswordSuccessAction,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  getCountryCodeSuccessAction,
  GET_COUNTRY_CODE_REQUEST,
  GET_FORGOT_PASSWORD_OTP_REQUEST,
  GET_FORGOT_PASSWORD_OTP_REQUEST_AGAIN,
  GET_OTP_REQUEST,
  GET_OTP_REQUEST_BACKGROUND,
  signUpSuccessAction,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  verifyUserSuccessAction,
  VERIFY_FORGOT_PASSWORD_OTP_REQUEST,
  VERIFY_USERNAME_REQUEST,
} from '@store/actionTypes/signUp';
import {ToastType} from '@constants/types/session';
import {all, call, put, takeLeading} from 'typed-redux-saga';
import {navigate, navigateReset} from '@navigators/index';
import {ScreenName, StackName} from '@constants/Constants';
import {
  forgotPassword,
  getCountryCode,
  getForgotPasswordOTP,
  getOTP,
  signUp,
  verifyEmail,
  verifyForgotPasswordOTP,
} from '@services/signUp';
import {
  parseSignUpResponse,
  parseVerifyForgotPasswordRequest,
  parseVerifyResponse,
  parseVerifyUsernameRequest,
} from '@utils/parsers/authentication';
import {showResetPasswordLinkModalAction} from '@store/actionTypes/modals';
import {parseDataResponse, parseErrorResponse} from '@utils/parsers';
import {getHomeScreenDataRequestAction} from '@store/actionTypes/screens';

function* onSignUpRequest(action: AnyAction) {
  try {
    yield* put(showHUDAction());
    const response = yield* call(signUp, action.body);
    if (response.status === 200) {
      yield* put(
        signUpSuccessAction(
          parseSignUpResponse({
            ...parseDataResponse(response),
            password: action.body.password,
          }),
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

function* onSignUpSuccess(action: AnyAction) {
  navigate(ScreenName.PinCodeScreen, {
    ...action.payload,
  });
}

function* onGetCountryCodeRequest(action: AnyAction) {
  try {
    const response = yield* call(getCountryCode);
    if (response.status === 200) {
      yield* put(getCountryCodeSuccessAction(response.data));
    }
  } catch (error) {
    yield* put(
      showToastAction(i18n.t('errorMessage.general'), ToastType.ERROR),
    );
  }
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

function* onGetOTPRequestBackground(action: AnyAction) {
  try {
    const response = yield* call(getOTP, action.body);
    if (response.status === 200) {
      // console.log(i18n.t(`successMessage.gotOTP ${action.body.username}`));
    } else {
      // console.log(i18n.t(`backend.${parseErrorResponse(response)}`));
    }
  } catch (error) {
    // console.log({error});
  } finally {
    yield* put(closeHUDAction());
  }
}

function* onVerifyUsernameRequest(action: AnyAction) {
  try {
    yield* put(showHUDAction());
    const response = yield* call(
      verifyEmail,
      parseVerifyUsernameRequest(action.body),
    );
    if (response.status === 200) {
      const data = parseDataResponse(response);
      yield* put(
        verifyUserSuccessAction(
          parseVerifyResponse({
            ...data,
            password: action.body.password,
          }),
        ),
      );
      if (data.user.familyNum > 0) {
        yield* put(getHomeScreenDataRequestAction());
      } else {
        navigate(ScreenName.FamilyOptionsScreen, {allowNavigateBack: true});
      }
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

function* onGetForgotPasswordOTPRequest(action: AnyAction) {
  try {
    yield* put(showHUDAction());
    const response = yield* call(getForgotPasswordOTP, action.body);
    if (response.status === 200) {
      const data = parseDataResponse(response);
      if (data.resetPasswordLink) {
        yield* put(showResetPasswordLinkModalAction(data.resetPasswordLink));
      } else {
        navigate(ScreenName.PinCodeScreen, {
          ...action.body,
          fromForgotPassword: true,
        });
      }
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

function* onGetForgotPasswordOTPRequestAgain(action: AnyAction) {
  try {
    yield* put(showHUDAction());
    const response = yield* call(getForgotPasswordOTP, action.body);
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

function* onVerifyForgotPasswordOTPRequest(action: AnyAction) {
  try {
    yield* put(showHUDAction());
    const response = yield* call(
      verifyForgotPasswordOTP,
      parseVerifyForgotPasswordRequest(action.body),
    );
    if (response.status === 200) {
      navigate(ScreenName.NewPasswordScreen, {...action.body});
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

function* onForgotPasswordRequest(action: AnyAction) {
  try {
    yield* put(showHUDAction());
    const response = yield* call(forgotPassword, action.body);
    if (response.status === 200) {
      yield* put(
        showToastAction(
          i18n.t('successMessage.resetPassword'),
          ToastType.SUCCESS,
        ),
      );
      yield* put(forgotPasswordSuccessAction());
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

function* onForgotPasswordSuccess(action: AnyAction) {
  navigateReset(StackName.AuthenticationStack);
}

export default function* () {
  yield* all([
    takeLeading(SIGN_UP_REQUEST, onSignUpRequest),
    takeLeading(SIGN_UP_SUCCESS, onSignUpSuccess),
    takeLeading(GET_COUNTRY_CODE_REQUEST, onGetCountryCodeRequest),
    takeLeading(GET_OTP_REQUEST, onGetOTPRequest),
    takeLeading(GET_OTP_REQUEST_BACKGROUND, onGetOTPRequestBackground),
    takeLeading(VERIFY_USERNAME_REQUEST, onVerifyUsernameRequest),
    takeLeading(GET_FORGOT_PASSWORD_OTP_REQUEST, onGetForgotPasswordOTPRequest),
    takeLeading(
      GET_FORGOT_PASSWORD_OTP_REQUEST_AGAIN,
      onGetForgotPasswordOTPRequestAgain,
    ),
    takeLeading(
      VERIFY_FORGOT_PASSWORD_OTP_REQUEST,
      onVerifyForgotPasswordOTPRequest,
    ),
    takeLeading(FORGOT_PASSWORD_REQUEST, onForgotPasswordRequest),
    takeLeading(FORGOT_PASSWORD_SUCCESS, onForgotPasswordSuccess),
  ]);
}
