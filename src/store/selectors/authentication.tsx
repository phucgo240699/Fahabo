import {RootState} from '@store/index';

export const listCountryCodeSelector = (state: RootState) =>
  state.authentication.listCountryCode ?? [];

export const accessTokenSelector = (state: RootState) =>
  state.authentication.accessToken;

export const refreshTokenSelector = (state: RootState) =>
  state.authentication.refreshToken;

export const fcmTokenSelector = (state: RootState) =>
  state.authentication.fcmToken;

export const userSelector = (state: RootState) => state.authentication.user;

export const languageCodeSelector = (state: RootState) =>
  state.authentication.user?.languageCode;

export const isRefreshingProfileSelector = (state: RootState) =>
  state.authentication.isRefreshing;
