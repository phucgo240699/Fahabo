import {RootState} from '@store/index';

export const previewAlbumSelector = (state: RootState) =>
  state.authentication.previewAlbum ?? [];
