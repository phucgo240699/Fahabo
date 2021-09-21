import {Dimensions} from 'react-native';
import {Config} from 'react-native-config';

export const BASE_URL = Config.BASE_URL;
export const GOOGLE_AUTH_WEB_CLIENT_ID = Config.GOOGLE_AUTH_WEB_CLIENT_ID;

const {width, height} = Dimensions.get('window');

export enum AuthState {
  LOGGED_IN = 'LoggedIn',
  UNAUTHORIZED = 'Unauthorized',
}

export enum StackName {
  AppStack = 'AppStack',
  MainStack = 'MainStack',
  AuthenticationStack = 'AuthenticationStack',
  HomeStack = 'HomeStack',
  ChoresStack = 'ChoresStack',
  EventStack = 'EventStack',
  ProfileStack = 'ProfileStack',
}

export enum ScreenName {
  SignInScreen = 'SignInScreen',
  SignUpScreen = 'SignUpScreen',
  PinCodeScreen = 'PinCodeScreen',
  ForgotPasswordScreen = 'ForgotPasswordScreen',
  HomeScreen = 'HomeScreen',
  ChoresScreen = 'ChoresScreen',
  EventsScreen = 'EventsScreen',
  ProfileScreen = 'ProfileScreen',
  UpdateProfileScreen = 'UpdateProfileScreen',
  SettingsScreen = 'SettingsScreen',
  LanguageScreen = 'LanguageScreen',
}

export const Constants = {
  MAX_WIDTH: width,
  MAX_HEIGHT: height,
};
