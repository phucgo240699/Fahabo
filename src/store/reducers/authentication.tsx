import {AnyAction} from 'redux';
import {
  GET_COUNTRY_CODE_SUCCESS,
  SIGN_UP_SUCCESS,
  VERIFY_USERNAME_SUCCESS,
} from '@store/actionTypes/signUp';
import {
  AUTO_SIGN_IN_SUCCESS,
  LOG_OUT,
  REFRESH_ACCESS_TOKEN_SUCCESS,
  SIGN_IN_SUCCESS,
} from '@store/actionTypes/signIn';
import {AuthenticationResponseType} from '@constants/types/authentication';
import {
  GET_AVATAR_SUCCESS,
  GET_PREVIEW_ALBUM_SUCCESS,
  UPDATE_LANGUAGE_SUCCESS,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PROFILE_SUCCESS,
} from '@store/actionTypes/profile';
import {ImageSource} from 'react-native-image-viewing/dist/@types';

export type AuthenticationState = {
  user?: AuthenticationResponseType;
  accessToken?: string;
  refreshToken?: string;
  listCountryCode?: Record<string, string>[];
  previewAlbum?: ImageSource[];
};

const defaultState: AuthenticationState = {
  user: undefined,
  accessToken: undefined,
  refreshToken: undefined,
  listCountryCode: [],
  previewAlbum: [],
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
    case GET_AVATAR_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          avatarUrl: action.payload.uri,
        },
      };
    case GET_PREVIEW_ALBUM_SUCCESS:
      return {
        ...state,
        previewAlbum: action.payload,
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
          ...action.payload,
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
    case REFRESH_ACCESS_TOKEN_SUCCESS:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    case LOG_OUT:
      return {
        ...state,
        user: undefined,
        accessToken: undefined,
        refreshToken: undefined,
      };
    default:
      return state;
  }
}
