import i18n from '@locales/index';
import {Dimensions} from 'react-native';
import {Config} from 'react-native-config';

export const BASE_URL = 'http://167.99.67.30:8080/api/v1';
export const GOOGLE_AUTH_WEB_CLIENT_ID = Config.GOOGLE_AUTH_WEB_CLIENT_ID;

const {width, height} = Dimensions.get('window');

// export enum AuthState {
//   LOGGED_IN = 'LoggedIn',
//   UNAUTHORIZED = 'Unauthorized',
// }

export enum StackName {
  AppStack = 'AppStack',
  MainStack = 'MainStack',
  AuthenticationStack = 'AuthenticationStack',
  HomeStack = 'HomeStack',
  TransactionsStack = 'TransactionsStack',
  InteractionsStack = 'InteractionsStack',
  LocationsStack = 'LocationsStack',
  ProfileStack = 'ProfileStack',
}

export enum ScreenName {
  FlashScreen = 'FlashScreen',
  CameraScreen = 'CameraScreen',
  MediaPickerScreen = 'MediaPickerScreen',
  FamilyOptionsScreen = 'FamilyOptionsScreen',
  ScanFamilyQRScreen = 'ScanFamilyQRScreen',
  FamiliesScreen = 'FamiliesScreen',
  SignInScreen = 'SignInScreen',
  SignUpScreen = 'SignUpScreen',
  CountryCodeScreen = 'CountryCodeScreen',
  PinCodeScreen = 'PinCodeScreen',
  ForgotPasswordScreen = 'ForgotPasswordScreen',
  NewPasswordScreen = 'NewPasswordScreen',
  HomeScreen = 'HomeScreen',
  ChoresScreen = 'ChoresScreen',
  EventsScreen = 'EventsScreen',
  TransactionsScreen = 'TransactionsScreen',
  InteractionsScreen = 'InteractionsScreen',
  LocationsScreen = 'LocationsScreen',
  ProfileScreen = 'ProfileScreen',
  MyChoresScreen = 'MyChoresScreen',
  MyEventsScreen = 'MyEventsScreen',
  UpdateProfileScreen = 'UpdateProfileScreen',
  SettingsScreen = 'SettingsScreen',
  LanguageScreen = 'LanguageScreen',
}

export const Constants = {
  MAX_WIDTH: width,
  MAX_HEIGHT: height,
};

export const languages: {key: string; value: string}[] = [
  {key: 'en', value: i18n.t('settings.language.english')},
  {key: 'vi', value: i18n.t('settings.language.vietnamese')},
];
