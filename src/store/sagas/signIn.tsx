import {AnyAction} from 'redux';
import i18n from '@locales/index';
import {
  ADD_FCM_TOKEN_REQUEST,
  autoSignInSuccessAction,
  AUTO_SIGN_IN_REQUEST,
  LOG_OUT,
  signInSuccessAction,
  SIGN_IN_REQUEST,
} from '@store/actionTypes/signIn';
import {addFCMTokenApi, signIn} from '@services/signIn';
import {all, call, put, select, takeLeading} from 'typed-redux-saga';
import {ScreenName, StackName} from '@constants/Constants';
import {navigate, navigateReset} from '@navigators/index';
import {ToastType} from '@constants/types/session';
import {
  closeHUDAction,
  showHUDAction,
  showToastAction,
} from '@store/actionTypes/session';
import {getDefaultLanguageCode, isNull, setGlobalLocale} from '@utils/index';
import {parseSignInResponse} from '@utils/parsers/authentication';
import {parseDataResponse, parseErrorResponse} from '@utils/parsers';
import {languageCodeSelector} from '@store/selectors/authentication';
import {AddFCMTokenRequestType} from '@constants/types/authentication';
import {apiProxy} from './apiProxy';

function* onSignInRequest(action: AnyAction) {
  try {
    yield* put(showHUDAction());
    const response = yield* call(signIn, action.body);
    if (response.status === 200) {
      const data = parseDataResponse(response);
      // Check is Active
      if (data.isValidEmail === true) {
        // Check is join Family
        if (data.user.familyNum > 0) {
          if (!isNull(data.user.languageCode)) {
            setGlobalLocale(data.user.languageCode);
          }
          yield* put(
            signInSuccessAction(
              parseSignInResponse({
                ...data,
                password: action.body.password,
              }),
            ),
          );

          navigateReset(StackName.MainStack);
        } else {
          if (!isNull(data.user.languageCode)) {
            setGlobalLocale(data.user.languageCode);
          }
          yield* put(
            signInSuccessAction(
              parseSignInResponse({
                ...data,
                password: action.body.password,
              }),
            ),
          );
          navigate(ScreenName.FamilyOptionsScreen, {allowNavigateBack: true});
        }
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

// Call from FlashScreen
function* onAutoSignInRequest(action: AnyAction) {
  try {
    if (!isNull(action.body.username) && !isNull(action.body.password)) {
      const response = yield* call(signIn, action.body);
      // Check is Active
      if (response.status === 200 && response.data.data.isValidEmail === true) {
        const data = parseDataResponse(response);
        // Check is join Family
        if (data.user.familyNum > 0) {
          if (!isNull(data.user.languageCode)) {
            setGlobalLocale(data.user.languageCode);
          }
          yield* put(
            autoSignInSuccessAction(
              parseSignInResponse({
                ...data,
                password: action.body.password,
              }),
            ),
          );

          navigateReset(StackName.MainStack);
          return;
        }
      }
    }
    const languageCode = yield* select(languageCodeSelector);
    if (!isNull(languageCode)) {
      setGlobalLocale(languageCode ?? '');
    } else {
      // Device language
      setGlobalLocale(getDefaultLanguageCode());
    }
    navigateReset(StackName.AuthenticationStack);
  } catch (error) {
    navigateReset(StackName.AuthenticationStack);
  } finally {
    yield* put(closeHUDAction());
  }
}

function* addFCMTokenSaga({
  body,
}: {
  type: string;
  body: AddFCMTokenRequestType;
}) {
  try {
    const response = yield* apiProxy(addFCMTokenApi, body);
    if (response.status !== 200) {
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
  }
}

function* onLogOut(action: AnyAction) {
  navigateReset(StackName.AuthenticationStack);
}

export default function* () {
  yield* all([
    takeLeading(SIGN_IN_REQUEST, onSignInRequest),
    takeLeading(AUTO_SIGN_IN_REQUEST, onAutoSignInRequest),
    takeLeading(ADD_FCM_TOKEN_REQUEST, addFCMTokenSaga),
    takeLeading(LOG_OUT, onLogOut),
  ]);
}
