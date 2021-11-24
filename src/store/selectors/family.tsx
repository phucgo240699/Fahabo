import {RootState} from '@store/index';

export const familiesSelector = (state: RootState) => state.family.families;

export const familyDetailSelector = (state: RootState) =>
  state.family.familyDetail;

export const membersInFamilySelector = (state: RootState) =>
  state.family.membersInFamily;

export const choreFilterMembersSelector = (state: RootState) =>
  state.family.choreFilterMembers;

export const focusFamilySelector = (state: RootState) =>
  state.family.focusFamily;

// Getting
export const isGettingFamilyMembersSelector = (state: RootState) =>
  state.family.isGettingFamilyMembers;

// Refresh
export const isRefreshingFamiliesSelector = (state: RootState) =>
  state.family.isRefreshingFamilies;

export const isRefreshingFamilyDetailSelector = (state: RootState) =>
  state.family.isRefreshingFamilyDetail;

export const isRefreshingFamilyMembersSelector = (state: RootState) =>
  state.family.isRefreshingFamilyMembers;

// Load more
export const isLoadingFamiliesSelector = (state: RootState) =>
  state.family.isLoadingFamilies;

export const isLoadingFamilyMembersSelector = (state: RootState) =>
  state.family.isLoadingFamilyMembers;
