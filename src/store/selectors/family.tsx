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
