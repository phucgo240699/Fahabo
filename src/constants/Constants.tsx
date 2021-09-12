import {Dimensions} from 'react-native';

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
  TaskStack = 'TaskStack',
  EventStack = 'EventStack',
  ProfileStack = 'ProfileStack',
}

export enum ScreenName {
  SignInScreen = 'SignInScreen',
  SignUpScreen = 'SignUpScreen',
  PinCodeScreen = 'PinCodeScreen',
  ForgotPasswordScreen = 'ForgotPasswordScreen',
  HomeScreen = 'HomeScreen',
  TasksScreen = 'TasksScreen',
  EventsScreen = 'EventsScreen',
  ProfileScreen = 'ProfileScreen',
}

export const Constants = {
  MAX_WIDTH: width,
  MAX_HEIGHT: height,
};
