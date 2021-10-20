import {RootState} from '@store/index';

//
// HUD
//
export const isLoadingSelector = (state: RootState) => state.session.loading;

//
// Refresh
//
export const isRefreshingTokenSelector = (state: RootState) =>
  state.session.refreshingToken;

export const isRefreshingProfileSelector = (state: RootState) =>
  state.session.isRefreshingProfile;

export const isRefreshingFamiliesSelector = (state: RootState) =>
  state.session.isRefreshingFamilies;

export const isRefreshingFamilyDetailSelector = (state: RootState) =>
  state.session.isRefreshingFamilyDetail;

export const isRefreshingFamilyMembersSelector = (state: RootState) =>
  state.session.isRefreshingFamilyMembers;
//
// Load More
//
export const isLoadingFamiliesSelector = (state: RootState) =>
  state.session.isLoadingFamilies;

export const isLoadingFamilyMembersSelector = (state: RootState) =>
  state.session.isLoadingFamilyMembers;

//
// Toast
//
export const toastsSelector = (state: RootState) => state.session.toasts;
