import {
  GetAvatarResponseType,
  GetMyProfileRequestType,
  UpdateLanguageRequestType,
  UpdatePasswordRequestType,
  UpdatePasswordResponseType,
  UpdateProfileAvatarRequestType,
  UpdateProfileAvatarResponseType,
  UpdateProfileRequestType,
} from '@constants/types/profile';
import {AuthenticationResponseType} from '@constants/types/authentication';
import {ImageSource} from 'react-native-image-viewing/dist/@types';

export const GET_PROFILE_REQUEST = 'GET_PROFILE_REQUEST';
export const getProfileRequestAction = (body: GetMyProfileRequestType) => ({
  type: GET_PROFILE_REQUEST,
  body,
});
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const getProfileSuccessAction = (
  payload: AuthenticationResponseType,
) => ({
  type: GET_PROFILE_SUCCESS,
  payload,
});

export const UPDATE_PROFILE_AVATAR_REQUEST = 'UPDATE_PROFILE_AVATAR_REQUEST';
export const updateProfileAvatarRequestAction = (
  body: UpdateProfileAvatarRequestType,
) => ({
  type: UPDATE_PROFILE_AVATAR_REQUEST,
  body,
});
export const UPDATE_PROFILE_AVATAR_SUCCESS = 'UPDATE_PROFILE_AVATAR_SUCCESS';
export const updateProfileAvatarSuccessAction = (payload: {
  avatar: string;
  rawAvatar: string;
}) => ({
  type: UPDATE_PROFILE_AVATAR_SUCCESS,
  payload,
});

export const UPDATE_PROFILE_REQUEST = 'UPDATE_PROFILE_REQUEST';
export const updateProfileRequestAction = (body: UpdateProfileRequestType) => ({
  type: UPDATE_PROFILE_REQUEST,
  body,
});
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const updateProfileSuccessAction = (
  payload: AuthenticationResponseType,
) => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload,
});

export const UPDATE_LANGUAGE_REQUEST = 'UPDATE_LANGUAGE_REQUEST';
export const updateLanguageRequestAction = (
  body: UpdateLanguageRequestType,
) => ({
  type: UPDATE_LANGUAGE_REQUEST,
  body,
});
export const UPDATE_LANGUAGE_SUCCESS = 'UPDATE_LANGUAGE_SUCCESS';
export const updateLanguageSuccessAction = (payload: string) => ({
  type: UPDATE_LANGUAGE_SUCCESS,
  payload,
});

export const UPDATE_PASSWORD_REQUEST = 'UPDATE_PASSWORD_REQUEST';
export const updatePasswordRequestAction = (
  body: UpdatePasswordRequestType,
) => ({
  type: UPDATE_PASSWORD_REQUEST,
  body,
});
export const UPDATE_PASSWORD_SUCCESS = 'UPDATE_PASSWORD_SUCCESS';
export const updatePasswordSuccessAction = (
  payload: UpdatePasswordResponseType,
) => ({
  type: UPDATE_PASSWORD_SUCCESS,
  payload,
});

export const UPDATE_IS_REFRESHING_PROFILE = 'UPDATE_IS_REFRESHING_PROFILE';
export const updateIsRefreshingProfileAction = (payload: boolean) => ({
  type: UPDATE_IS_REFRESHING_PROFILE,
  payload,
});
