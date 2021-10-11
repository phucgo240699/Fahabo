import {AnyAction} from 'redux';
import i18n from '@locales/index';
import {
  autoSignInSuccessAction,
  AUTO_SIGN_IN_REQUEST,
  AUTO_SIGN_IN_SUCCESS,
  LOG_OUT,
  signInSuccessAction,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
} from '@store/actionTypes/signIn';
import {signIn} from '@services/signIn';
import {all, call, put, takeLatest, takeLeading} from 'typed-redux-saga';
import {ScreenName, StackName} from '@constants/Constants';
import {navigate, navigateReset} from '@navigators/index';
import {ToastType} from '@constants/types/session';
import {
  closeHUDAction,
  showHUDAction,
  showToastAction,
} from '@store/actionTypes/session';
import {isNull} from '@utils/index';
import {parseSignInResponse} from '@utils/parsers/authentication';

function* onSignInRequest(action: AnyAction) {
  try {
    yield* put(showHUDAction());
    const response = yield* call(signIn, action.body);
    if (response.status === 200) {
      if (response.data.data.isValidEmail === true) {
        if (!isNull(response.data.data.user.languageCode)) {
          i18n.locale = response.data.data.user.languageCode;
          i18n.defaultLocale = response.data.data.user.languageCode;
        }
        yield* put(
          signInSuccessAction(
            parseSignInResponse({
              ...response.data.data,
              password: action.body.password,
            }),
          ),
        );
      } else {
        yield* put(
          showToastAction(
            i18n.t('warningMessage.activeAccount'),
            ToastType.WARNING,
          ),
        );
        navigate(ScreenName.PinCodeScreen, {
          ...action.body,
          sendOTPRequest: true,
        });
      }
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

function* onSignInSuccess(action: AnyAction) {
  navigateReset(StackName.MainStack);
}

// Call from FlashScreen
function* onAutoSignInRequest(action: AnyAction) {
  console.log('Auto sign in request:', action.body);
  try {
    if (!isNull(action.body.username) && !isNull(action.body.password)) {
      const response = yield* call(signIn, action.body);
      console.log({languageCode: response.data.data.user.languageCode});
      if (response.status === 200 && response.data.data.isValidEmail === true) {
        if (!isNull(response.data.data.user.languageCode)) {
          i18n.locale = response.data.data.user.languageCode;
          i18n.defaultLocale = response.data.data.user.languageCode;
        }
        yield* put(
          autoSignInSuccessAction(
            parseSignInResponse({
              ...response.data.data,
              password: action.body.password,
            }),
          ),
        );
      } else {
        navigateReset(StackName.AuthenticationStack);
      }
    } else {
      navigateReset(StackName.AuthenticationStack);
    }
  } catch (error) {
    navigateReset(StackName.AuthenticationStack);
  }
}

function* onAutoSignInSuccess(action: AnyAction) {
  navigateReset(StackName.MainStack);
}

function* onLogOut(action: AnyAction) {
  navigateReset(StackName.AuthenticationStack);
}

export default function* () {
  yield* all([
    takeLeading(SIGN_IN_REQUEST, onSignInRequest),
    takeLeading(SIGN_IN_SUCCESS, onSignInSuccess),
    takeLeading(AUTO_SIGN_IN_REQUEST, onAutoSignInRequest),
    takeLeading(AUTO_SIGN_IN_SUCCESS, onAutoSignInSuccess),
    takeLeading(LOG_OUT, onLogOut),
  ]);
}
