import {RootState} from '@store/index';

export const familiesSelector = (state: RootState) => state.family.families;

export const familyDetailSelector = (state: RootState) =>
  state.family.familyDetail;

export const membersInFamilySelector = (state: RootState) =>
  state.family.membersInFamily;
