import {RootState} from '@store/index';

export const albumsSelector = (state: RootState) => state.albums.albums;

export const photosSelector = (state: RootState) => state.albums.photos;

export const previewAlbumSelector = (state: RootState) =>
  state.albums.previewAlbum;

// Getting
export const isGettingAlbumsSelector = (state: RootState) =>
  state.albums.isGettingAlbums;

export const isGettingPhotosSelector = (state: RootState) =>
  state.albums.isGettingPhotos;

// Refresh
export const isRefreshingAlbumsSelector = (state: RootState) =>
  state.albums.isRefreshingAlbums;

export const isRefreshingPhotosSelector = (state: RootState) =>
  state.albums.isRefreshingPhotos;

// Load more
export const isLoadingAlbumsSelector = (state: RootState) =>
  state.albums.isLoadingAlbums;

export const isLoadingPhotosSelector = (state: RootState) =>
  state.albums.isLoadingPhotos;
