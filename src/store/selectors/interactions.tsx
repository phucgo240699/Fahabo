import {RootState} from '@store/index';

export const twilioAccessTokenSelector = (state: RootState) =>
  state.interactions.twilioAccessToken;

export const twilioRoomNameSelector = (state: RootState) =>
  state.interactions.twilioRoomName;
