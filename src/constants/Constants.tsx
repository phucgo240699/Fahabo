import i18n from '@locales/index';
import {Dimensions} from 'react-native';
import {Config} from 'react-native-config';

export const BASE_URL = 'http://167.99.67.30:8080/api/v1';
export const QR_SALT_CODE = Config.QR_SALT_CODE;
export const GOOGLE_AUTH_WEB_CLIENT_ID = Config.GOOGLE_AUTH_WEB_CLIENT_ID;

const {width, height} = Dimensions.get('window');

export enum StackName {
  AppStack = 'AppStack',
  MainStack = 'MainStack',
  AuthenticationStack = 'AuthenticationStack',
  HomeStack = 'HomeStack',
  TransactionsStack = 'TransactionsStack',
  InteractionsStack = 'InteractionsStack',
  LocationsStack = 'LocationsStack',
  FamilyStack = 'FamilyStack',
  ProfileStack = 'ProfileStack',
}

export enum ScreenName {
  FlashScreen = 'FlashScreen',
  CameraScreen = 'CameraScreen',
  MediaPickerScreen = 'MediaPickerScreen',
  ImageViewerScreen = 'ImageViewerScreen',
  FamilyOptionsScreen = 'FamilyOptionsScreen',
  QRPresenterScreen = 'QRPresenterScreen',
  ScanFamilyQRScreen = 'ScanFamilyQRScreen',
  FamiliesScreen = 'FamiliesScreen',
  FamilyDetailScreen = 'FamilyDetailScreen',
  FamilyMembersScreen = 'FamilyMembersScreen',
  SignInScreen = 'SignInScreen',
  ManualSignInScreen = 'ManualSignInScreen',
  SignUpScreen = 'SignUpScreen',
  CountryCodeScreen = 'CountryCodeScreen',
  PinCodeScreen = 'PinCodeScreen',
  ForgotPasswordScreen = 'ForgotPasswordScreen',
  NewPasswordScreen = 'NewPasswordScreen',
  HomeScreen = 'HomeScreen',
  ChoresScreen = 'ChoresScreen',
  CreateChoreScreen = 'CreateChoreScreen',
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
  UpdatePasswordScreen = 'UpdatePasswordScreen',
  AlbumsScreen = 'AlbumsScreen',
  AlbumDetailScreen = 'AlbumDetailScreen',
}

export const Constants = {
  MAX_WIDTH: width,
  MAX_HEIGHT: height,
  LIMIT_PHOTO_UPLOAD: 4,
  LIMIT_PHOTO_DELETE: 5,
  PROFILE_AVATAR_WIDTH: 128,
  PROFILE_AVATAR_HEIGHT: 128,
  FAMILY_THUMBNAIL_WIDTH: 512,
  FAMILY_THUMBNAIL_HEIGHT: 320,
};

export const languages: {key: string; value: string}[] = [
  {key: 'en', value: i18n.t('settings.language.english')},
  {key: 'vi', value: i18n.t('settings.language.vietnamese')},
];

export const Pagination = {
  Family: 10,
  FamilyMembers: 10,
  Albums: 14,
  Photos: 24,
};
