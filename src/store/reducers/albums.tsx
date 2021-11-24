import {AlbumType, PhotoType} from '@constants/types/albums';
import {
  ADD_PHOTOS_SUCCESS,
  CREATE_ALBUM_SUCCESS,
  DELETE_ALBUM_SUCCESS,
  GET_ALBUMS_SUCCESS,
  GET_PHOTOS_SUCCESS,
  GET_PREVIEW_ALBUM_SUCCESS,
  UPDATE_ALBUM_SUCCESS,
  UPDATE_IS_GETTING_ALBUMS,
  UPDATE_IS_GETTING_PHOTOS,
  UPDATE_IS_LOADING_ALBUMS,
  UPDATE_IS_LOADING_PHOTOS,
  UPDATE_IS_REFRESHING_ALBUMS,
  UPDATE_IS_REFRESHING_PHOTOS,
  UPDATE_PHOTO_SUCCESS,
} from '@store/actionTypes/albums';
import {LOG_OUT} from '@store/actionTypes/signIn';
import {AnyAction} from 'redux';

export type AlbumsState = {
  albums: AlbumType[];
  photos: PhotoType[];
  previewAlbum: PhotoType[];

  // Getting
  isGettingAlbums: boolean;
  isGettingPhotos: boolean;

  // Refresh
  isRefreshingAlbums: boolean;
  isRefreshingPhotos: boolean;

  // Load more
  isLoadingAlbums: boolean;
  isLoadingPhotos: boolean;
};

const defaultState: AlbumsState = {
  albums: [],
  photos: [],
  previewAlbum: [],

  // Getting
  isGettingAlbums: false,
  isGettingPhotos: false,

  // Refresh
  isRefreshingAlbums: false,
  isRefreshingPhotos: false,

  // Load more
  isLoadingAlbums: false,
  isLoadingPhotos: false,
};

export default function albumsReducer(state = defaultState, action: AnyAction) {
  switch (action.type) {
    case CREATE_ALBUM_SUCCESS:
      return {
        ...state,
        albums: [action.payload, ...state.albums],
      };
    case UPDATE_ALBUM_SUCCESS:
      return {
        ...state,
        albums: state.albums.map(item => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        }),
      };
    case DELETE_ALBUM_SUCCESS:
      return {
        ...state,
        albums: state.albums.filter(item => {
          return item.id !== action.payload.id;
        }),
      };
    case GET_ALBUMS_SUCCESS:
      return {
        ...state,
        albums: action.payload,
      };
    case ADD_PHOTOS_SUCCESS:
      return {
        ...state,
        photos: [...action.payload, ...state.photos],
      };
    case UPDATE_PHOTO_SUCCESS:
      return {
        ...state,
        photos: state.photos.map(item => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        }),
      };
    case GET_PHOTOS_SUCCESS:
      return {
        ...state,
        photos: action.payload,
      };
    case GET_PREVIEW_ALBUM_SUCCESS:
      return {
        ...state,
        previewAlbum: action.payload,
      };
    // Getting
    case UPDATE_IS_GETTING_ALBUMS:
      return {
        ...state,
        isGettingAlbums: action.payload,
      };
    case UPDATE_IS_GETTING_PHOTOS:
      return {
        ...state,
        isGettingPhotos: action.payload,
      };

    // Refresh
    case UPDATE_IS_REFRESHING_ALBUMS:
      return {
        ...state,
        isRefreshingAlbums: action.payload,
      };
    case UPDATE_IS_REFRESHING_PHOTOS:
      return {
        ...state,
        isRefreshingPhotos: action.payload,
      };

    // Load more
    case UPDATE_IS_LOADING_ALBUMS:
      return {
        ...state,
        isLoadingAlbums: action.payload,
      };
    case UPDATE_IS_LOADING_PHOTOS:
      return {
        ...state,
        isLoadingPhotos: action.payload,
      };
    case LOG_OUT:
      return {
        ...state,
        albums: [],
        photos: [],
        previewAlbum: [],
        isGettingAlbums: false,
        isGettingPhotos: false,
        isRefreshingAlbums: false,
        isRefreshingPhotos: false,
        isLoadingAlbums: false,
        isLoadingPhotos: false,
      };
    default:
      return state;
  }
}
