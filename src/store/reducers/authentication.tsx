import {AnyAction} from 'redux';
import {
  GET_COUNTRY_CODE_SUCCESS,
  SIGN_UP_SUCCESS,
  VERIFY_USERNAME_SUCCESS,
} from '@store/actionTypes/signUp';
import {
  ADD_FCM_TOKEN_SUCCESS,
  AUTO_SIGN_IN_SUCCESS,
  LOG_OUT,
  REFRESH_ACCESS_TOKEN_SUCCESS,
  SIGN_IN_SUCCESS,
} from '@store/actionTypes/signIn';
import {AuthenticationResponseType} from '@constants/types/authentication';
import {
  GET_PROFILE_SUCCESS,
  UPDATE_IS_REFRESHING_PROFILE,
  UPDATE_LANGUAGE_SUCCESS,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PROFILE_AVATAR_SUCCESS,
  UPDATE_PROFILE_SUCCESS,
} from '@store/actionTypes/profile';

export type AuthenticationState = {
  user?: AuthenticationResponseType;
  accessToken?: string;
  refreshToken?: string;
  fcmToken?: string;
  listCountryCode?: Record<string, string>[];
  isRefreshing?: boolean;
};

const defaultState: AuthenticationState = {
  user: undefined,
  accessToken: undefined,
  refreshToken: undefined,
  fcmToken: undefined,
  listCountryCode: [],
  isRefreshing: false,
};

export default function authenticationReducer(
  state = defaultState,
  action: AnyAction,
) {
  switch (action.type) {
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    case UPDATE_PROFILE_AVATAR_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          avatarUrl: action.payload.avatar,
          rawAvatarUrl: action.payload.rawAvatar,
        },
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    case UPDATE_LANGUAGE_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          languageCode: action.payload,
        },
      };
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          password: action.payload.password,
        },
      };
    case GET_COUNTRY_CODE_SUCCESS:
      return {
        ...state,
        listCountryCode: action.payload.data,
      };
    case VERIFY_USERNAME_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case AUTO_SIGN_IN_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case ADD_FCM_TOKEN_SUCCESS:
      return {
        ...state,
        fcmToken: action.payload,
      };
    case REFRESH_ACCESS_TOKEN_SUCCESS:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        listCountryCode: [],
      };
    case UPDATE_IS_REFRESHING_PROFILE:
      return {
        ...state,
        isRefreshing: action.payload,
      };
    case LOG_OUT:
      return {
        ...state,
        user: {
          ...state.user,
          email: undefined,
          password: undefined,
          name: undefined,
          username: undefined,
          phoneNumber: undefined,
          // still keep languageCode
          languageCode: undefined, //state.user?.languageCode,
          birthday: undefined,
          avatarUrl: undefined,
          rawAvatarUrl: undefined,
          totalFamilies: undefined,
          authType: undefined,
        },
        accessToken: undefined,
        refreshToken: undefined,
        fcmToken: undefined,
        isRefreshing: false,
      };
    default:
      return state;
  }
}
