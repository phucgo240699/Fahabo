import {RootState} from '@store/index';

//
// Route
//
export const routeNameSelector = (state: RootState) => state.session.routeName;

//
// HUD
//
export const isLoadingSelector = (state: RootState) => state.session.loading;

//
// Refresh
//
export const isRefreshingTokenSelector = (state: RootState) =>
  state.session.refreshingToken;

//
// Toast
//
export const toastsSelector = (state: RootState) => state.session.toasts;
