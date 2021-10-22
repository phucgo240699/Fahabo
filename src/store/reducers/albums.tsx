import {AlbumType, PhotoType} from '@constants/types/albums';
import {
  ADD_PHOTOS_SUCCESS,
  CREATE_ALBUM_SUCCESS,
  DELETE_ALBUM_SUCCESS,
  GET_ALBUMS_SUCCESS,
  GET_PHOTOS_SUCCESS,
  UPDATE_ALBUM_SUCCESS,
  UPDATE_PHOTO_SUCCESS,
} from '@store/actionTypes/albums';
import {LOG_OUT} from '@store/actionTypes/signIn';
import {AnyAction} from 'redux';

export type AlbumsState = {
  albums: AlbumType[];
  photos: PhotoType[];
};

const defaultState: AlbumsState = {
  albums: [],
  photos: [],
};

export default function albumsReducer(state = defaultState, action: AnyAction) {
  switch (action.type) {
    case CREATE_ALBUM_SUCCESS:
      return {
        ...state,
        albums: [...state.albums, action.payload],
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
        photos: [...state.photos, ...action.payload],
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
    case LOG_OUT:
      return {
        ...state,
        albums: [],
        photos: [],
      };
    default:
      return state;
  }
}
