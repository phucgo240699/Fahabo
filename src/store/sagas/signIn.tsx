import {AnyAction} from 'redux';
import i18n from '@locales/index';
import {
  autoSignInSuccessAction,
  AUTO_SIGN_IN_REQUEST,
  AUTO_SIGN_IN_SUCCESS,
  signInSuccessAction,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
} from '@store/actionTypes/signIn';
import {signIn} from '@services/signIn';
import {call, put, takeLeading} from 'typed-redux-saga';
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
      if (response.data.isValidEmail) {
        if (response.data.languageCode) {
          i18n.locale = response.data.languageCode;
          i18n.defaultLocale = response.data.languageCode;
        }
        yield* put(
          signInSuccessAction(parseSignInResponse(response.data.data)),
        );
      } else {
        yield* put(
          showToastAction(
            i18n.t('warningMessage.activeAccount'),
            ToastType.WARNING,
          ),
        );
        navigate(ScreenName.PinCodeScreen);
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
  try {
    if (!isNull(action.body.username) && !isNull(action.body.password)) {
      const response = yield* call(signIn, action.body);
      if (response.status === 200) {
        if (response.data.isValidEmail) {
          if (response.data.languageCode) {
            i18n.locale = response.data.languageCode;
            i18n.defaultLocale = response.data.languageCode;
          }
          yield* put(
            autoSignInSuccessAction(parseSignInResponse(response.data.data)),
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

export default function* () {
  yield takeLeading(SIGN_IN_REQUEST, onSignInRequest);
  yield takeLatest(SIGN_IN_SUCCESS, onSignInSuccess);
  yield takeLeading(AUTO_SIGN_IN_REQUEST, onAutoSignInRequest);
  yield takeLatest(AUTO_SIGN_IN_SUCCESS, onAutoSignInSuccess);
}
