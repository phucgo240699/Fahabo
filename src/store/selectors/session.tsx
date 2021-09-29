import {RootState} from '@store/index';

export const getSessionLoading = (state: RootState) =>
  state.session.loading || false;

export const getToastsSelector = (state: RootState) => state.session.toasts;
