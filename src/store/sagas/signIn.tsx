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
import {all, call, put} from 'typed-redux-saga';
import {takeLatest} from 'redux-saga/effects';
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
        if (!isNull(response.data.languageCode)) {
          i18n.locale = response.data.languageCode;
          i18n.defaultLocale = response.data.languageCode;
        }
        console.log(
          'sign_in_success: ',
          parseSignInResponse({
            ...response.data.data,
            password: action.body.password,
          }),
        );
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
          username: action.body.username,
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
    // console.log('login status:', response.status);
    // console.log('login response:', response.data);
    // console.log('login errors:', response.data.errors);
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
      if (response.status === 200) {
        if (response.data.data.isValidEmail === true) {
          if (!isNull(response.data.languageCode)) {
            i18n.locale = response.data.languageCode;
            i18n.defaultLocale = response.data.languageCode;
          }
          console.log(
            'auto_sign_in_success: ',
            parseSignInResponse({
              ...response.data.data,
              password: action.body.password,
            }),
          );
          yield* put(
            autoSignInSuccessAction(
              parseSignInResponse({
                ...response.data.data,
                password: action.body.password,
              }),
            ),
          );
        }
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
    takeLatest(SIGN_IN_REQUEST, onSignInRequest),
    takeLatest(SIGN_IN_SUCCESS, onSignInSuccess),
    takeLatest(AUTO_SIGN_IN_REQUEST, onAutoSignInRequest),
    takeLatest(AUTO_SIGN_IN_SUCCESS, onAutoSignInSuccess),
    takeLatest(LOG_OUT, onLogOut),
  ]);
}
