import i18n from '@locales/index';
import {Dimensions} from 'react-native';
import {Config} from 'react-native-config';

export const BASE_URL = Config.BASE_URL;
export const QR_SALT_CODE = Config.QR_SALT_CODE;
export const GOOGLE_AUTH_WEB_CLIENT_ID = Config.GOOGLE_AUTH_WEB_CLIENT_ID;

const {width, height} = Dimensions.get('window');

export enum StackName {
  AppStack = 'AppStack',
  MainStack = 'MainStack',
  AuthenticationStack = 'AuthenticationStack',
  HomeStack = 'HomeStack',
  NotificationsStack = 'NotificationsStack',
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
  MembersPickerScreen = 'MembersPickerScreen',
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
  ChoreDetailScreen = 'ChoreDetailScreen',
  ChorePhotosScreen = 'ChorePhotosScreen',
  RepeatPickerScreen = 'RepeatPickerScreen',
  EventsScreen = 'EventsScreen',
  CalendarEventsScreen = 'CalendarEventsScreen',
  CreateEventScreen = 'CreateEventScreen',
  EventDetailScreen = 'EventDetailScreen',
  EventPhotosScreen = 'EventPhotosScreen',
  NotificationsScreen = 'NotificationsScreen',
  InteractionsScreen = 'InteractionsScreen',
  ConferenceCallScreen = 'ConferenceCallScreen',
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
  LIMIT_PHOTO_UPLOAD: 10,
  LIMIT_PHOTO_DELETE: 5,
  LIMIT_CHORE_PHOTO: 100,
  LIMIT_EVENT_PHOTO: 100,
  PROFILE_AVATAR_WIDTH: 128,
  PROFILE_AVATAR_HEIGHT: 128,
  FAMILY_THUMBNAIL_WIDTH: 512,
  FAMILY_THUMBNAIL_HEIGHT: 320,
};

export const languages: {key: string; value: string}[] = [
  {key: 'auto', value: i18n.t('settings.language.auto')},
  {key: 'en', value: i18n.t('settings.language.english')},
  {key: 'vi', value: i18n.t('settings.language.vietnamese')},
];

export const Pagination = {
  Family: 10,
  FamilyMembers: 10,
  Albums: 14,
  Photos: 24,
  Chores: 10,
  ChorePhotos: 24,
  Events: 10,
  EventPhotos: 24,
  Notifications: 10,
};
