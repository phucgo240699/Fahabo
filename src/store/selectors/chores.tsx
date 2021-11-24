import {RootState} from '@store/index';

export const isRefreshingChoresSelector = (state: RootState) =>
  state.chores.isRefreshingChores;

export const isRefreshingChorePhotosSelector = (state: RootState) =>
  state.chores.isRefreshingChorePhotos;

export const isLoadingChoresSelector = (state: RootState) =>
  state.chores.isLoadingChores;

export const isLoadingChorePhotosSelector = (state: RootState) =>
  state.chores.isLoadingChorePhotos;

export const choresSelector = (state: RootState) => state.chores.chores;
export const chorePhotosSelector = (state: RootState) =>
  state.chores.chorePhotos;
export const choreDetailSelector = (state: RootState) =>
  state.chores.choreDetail;
