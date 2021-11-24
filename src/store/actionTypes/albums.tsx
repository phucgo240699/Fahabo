import {
  AddPhotosRequestType,
  AlbumType,
  CreateAlbumRequestType,
  DeleteAlbumRequestType,
  DeletePhotosRequestType,
  GetAlbumsRequestType,
  GetPhotosRequestType,
  GetPreviewAlbumRequestType,
  PhotoType,
  UpdateAlbumRequestType,
  UpdatePhotoRequestType,
} from '@constants/types/albums';

// Getting
export const UPDATE_IS_GETTING_ALBUMS = 'UPDATE_IS_GETTING_ALBUMS';
export const updateIsGettingAlbumsAction = (payload: boolean) => ({
  type: UPDATE_IS_GETTING_ALBUMS,
  payload,
});
export const UPDATE_IS_GETTING_PHOTOS = 'UPDATE_IS_GETTING_PHOTOS';
export const updateIsGettingPhotosAction = (payload: boolean) => ({
  type: UPDATE_IS_GETTING_PHOTOS,
  payload,
});

// Refresh
export const UPDATE_IS_REFRESHING_ALBUMS = 'UPDATE_IS_REFRESHING_ALBUMS';
export const updateIsRefreshingAlbumsAction = (payload: boolean) => ({
  type: UPDATE_IS_REFRESHING_ALBUMS,
  payload,
});
export const UPDATE_IS_REFRESHING_PHOTOS = 'UPDATE_IS_REFRESHING_PHOTOS';
export const updateIsRefreshingPhotosAction = (payload: boolean) => ({
  type: UPDATE_IS_REFRESHING_PHOTOS,
  payload,
});

// Load more
export const UPDATE_IS_LOADING_ALBUMS = 'UPDATE_IS_LOADING_ALBUMS';
export const updateIsLoadingAlbumsAction = (payload: boolean) => ({
  type: UPDATE_IS_LOADING_ALBUMS,
  payload,
});
export const UPDATE_IS_LOADING_PHOTOS = 'UPDATE_IS_LOADING_PHOTOS';
export const updateIsLoadingPhotosAction = (payload: boolean) => ({
  type: UPDATE_IS_LOADING_PHOTOS,
  payload,
});

export const CREATE_ALBUM_REQUEST = 'CREATE_ALBUM_REQUEST';
export const createAlbumRequestAction = (body: CreateAlbumRequestType) => ({
  type: CREATE_ALBUM_REQUEST,
  body,
});
export const CREATE_ALBUM_SUCCESS = 'CREATE_ALBUM_SUCCESS';
export const createAlbumSuccessAction = (payload: AlbumType) => ({
  type: CREATE_ALBUM_SUCCESS,
  payload,
});

export const UPDATE_ALBUM_REQUEST = 'UPDATE_ALBUM_REQUEST';
export const updateAlbumRequestAction = (body: UpdateAlbumRequestType) => ({
  type: UPDATE_ALBUM_REQUEST,
  body,
});
export const UPDATE_ALBUM_SUCCESS = 'UPDATE_ALBUM_SUCCESS';
export const updateAlbumSuccessAction = (payload: AlbumType) => ({
  type: UPDATE_ALBUM_SUCCESS,
  payload,
});

export const DELETE_ALBUM_REQUEST = 'DELETE_ALBUM_REQUEST';
export const deleteAlbumRequestAction = (body: DeleteAlbumRequestType) => ({
  type: DELETE_ALBUM_REQUEST,
  body,
});
export const DELETE_ALBUM_SUCCESS = 'DELETE_ALBUM_SUCCESS';
export const deleteAlbumSuccessAction = (payload: AlbumType) => ({
  type: DELETE_ALBUM_SUCCESS,
  payload,
});

export const GET_ALBUMS_REQUEST = 'GET_ALBUMS_REQUEST';
export const getAlbumsRequestAction = (body: GetAlbumsRequestType) => ({
  type: GET_ALBUMS_REQUEST,
  body,
});
export const GET_ALBUMS_SUCCESS = 'GET_ALBUMS_SUCCESS';
export const getAlbumsSuccessAction = (payload: AlbumType[]) => ({
  type: GET_ALBUMS_SUCCESS,
  payload,
});

export const ADD_PHOTOS_REQUEST = 'ADD_PHOTOS_REQUEST';
export const addPhotosRequestAction = (body: AddPhotosRequestType) => ({
  type: ADD_PHOTOS_REQUEST,
  body,
});
export const ADD_PHOTOS_SUCCESS = 'ADD_PHOTOS_SUCCESS';
export const addPhotosSuccessAction = (payload: PhotoType[]) => ({
  type: ADD_PHOTOS_SUCCESS,
  payload,
});

export const UPDATE_PHOTO_REQUEST = 'UPDATE_PHOTO_REQUEST';
export const updatePhotoRequestAction = (body: UpdatePhotoRequestType) => ({
  type: UPDATE_PHOTO_REQUEST,
  body,
});
export const UPDATE_PHOTO_SUCCESS = 'UPDATE_PHOTO_SUCCESS';
export const updatePhotoSuccessAction = (payload: PhotoType) => ({
  type: UPDATE_PHOTO_SUCCESS,
  payload,
});

export const DELETE_PHOTOS_REQUEST = 'DELETE_PHOTOS_REQUEST';
export const deletePhotosRequestAction = (body: DeletePhotosRequestType) => ({
  type: DELETE_PHOTOS_REQUEST,
  body,
});

export const GET_PHOTOS_REQUEST = 'GET_PHOTOS_REQUEST';
export const getPhotosRequestAction = (body: GetPhotosRequestType) => ({
  type: GET_PHOTOS_REQUEST,
  body,
});
export const GET_PHOTOS_SUCCESS = 'GET_PHOTOS_SUCCESS';
export const getPhotosSuccessAction = (payload: PhotoType[]) => ({
  type: GET_PHOTOS_SUCCESS,
  payload,
});

export const GET_PREVIEW_ALBUM_REQUEST = 'GET_PREVIEW_ALBUM_REQUEST';
export const getPreviewAlbumRequestAction = (
  body: GetPreviewAlbumRequestType,
) => ({
  type: GET_PREVIEW_ALBUM_REQUEST,
  body,
});
export const GET_PREVIEW_ALBUM_SUCCESS = 'GET_PREVIEW_ALBUM_SUCCESS';
export const getPreviewAlbumSuccessAction = (payload: PhotoType[]) => ({
  type: GET_PREVIEW_ALBUM_SUCCESS,
  payload,
});
