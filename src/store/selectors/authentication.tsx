import {RootState} from '@store/index';

export const accessTokenSelector = (state: RootState) =>
  state.authentication.accessToken;
