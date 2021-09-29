import {RootState} from '@store/index';

export const accessTokenSelector = (state: RootState) =>
  state.authentication.accessToken;

export const languageCodeSelector = (state: RootState) =>
  state.authentication.user.languageCode;
