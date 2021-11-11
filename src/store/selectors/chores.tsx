import {RootState} from '@store/index';

export const choresSelector = (state: RootState) => state.chores.chores;
export const chorePhotosSelector = (state: RootState) =>
  state.chores.chorePhotos;
export const choreDetailSelector = (state: RootState) =>
  state.chores.choreDetail;
