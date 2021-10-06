import {RootState} from '@store/index';
export const resetPasswordLinkSelector = (state: RootState) =>
  state.modals.resetPasswordLink;
