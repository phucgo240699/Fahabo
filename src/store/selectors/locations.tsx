import {RootState} from '@store/index';

export const regionSelector = (state: RootState) => state.locations.region;

export const memberLocationsSelector = (state: RootState) =>
  state.locations.memberLocations;
