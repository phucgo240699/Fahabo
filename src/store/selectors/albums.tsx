import {RootState} from '@store/index';

export const albumsSelector = (state: RootState) => state.albums.albums;

export const photosSelector = (state: RootState) => state.albums.photos;
