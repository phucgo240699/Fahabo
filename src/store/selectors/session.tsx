import {RootState} from '@store/index';

export const isLoadingSelector = (state: RootState) => state.session.loading;

export const isRefreshingTokenSelector = (state: RootState) =>
  state.session.refreshingToken;

export const isRefreshingProfileSelector = (state: RootState) =>
  state.session.isRefreshingProfile;

export const toastsSelector = (state: RootState) => state.session.toasts;
