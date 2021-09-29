import {AnyAction} from 'redux';
import i18n from '@locales/index';
import {SIGN_IN_SUCCESS} from '@store/actionTypes/signIn';
import {AuthenticationResponseType} from '@constants/types/authentication';
import {SIGN_UP_SUCCESS, UPDATE_LANGUAGE_CODE} from '@store/actionTypes/signUp';
import {NativeModules, Platform} from 'react-native';

export type AuthenticationState = {
  user: AuthenticationResponseType;
  accessToken: string;
};

const defaultState: AuthenticationState = {
  user: {
    email: '',
    password: '',
    name: '',
    birthday: '',
    phoneNumber: '',
    languageCode: `${
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
        : NativeModules.I18nManager.localeIdentifier
    }`.split('_')[0],
  },
  accessToken: '',
};

export default function authenticationReducer(
  state = defaultState,
  action: AnyAction,
) {
  switch (action.type) {
    case SIGN_UP_SUCCESS:
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case UPDATE_LANGUAGE_CODE:
      return {
        ...state,
        user: {
          ...state.user,
          languageCode: action.payload,
        },
      };
    default:
      return state;
  }
}
