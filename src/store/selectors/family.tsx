import {RootState} from '@store/index';

export const myFamiliesSelector = (state: RootState) => state.family.myFamilies;

export const membersInFamilySelector = (state: RootState) =>
  state.family.usersInFamily;
