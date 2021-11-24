import {PhotoType} from '@constants/types/albums';
import {ChoreType} from '@constants/types/chores';
import {
  CREATE_CHORE_SUCCESS,
  DELETE_CHORE_SUCCESS,
  GET_CHORES_SUCCESS,
  GET_CHORE_DETAIL_SUCCESS,
  GET_CHORE_PHOTOS_SUCCESS,
  UPDATE_CHORE_SUCCESS,
  UPDATE_IS_LOADING_CHORES,
  UPDATE_IS_LOADING_CHORE_PHOTOS,
  UPDATE_IS_REFRESHING_CHORES,
  UPDATE_IS_REFRESHING_CHORE_PHOTOS,
} from '@store/actionTypes/chores';
import {LOG_OUT} from '@store/actionTypes/signIn';
import {AnyAction} from 'redux';

export type ChoresState = {
  isRefreshingChores: boolean;
  isRefreshingChorePhotos: boolean;
  isLoadingChores: boolean;
  isLoadingChorePhotos: boolean;
  chores: ChoreType[];
  chorePhotos: PhotoType[];
  choreDetail?: ChoreType;
};

const defaultState: ChoresState = {
  isRefreshingChores: false,
  isRefreshingChorePhotos: false,
  isLoadingChores: false,
  isLoadingChorePhotos: false,
  chores: [],
  chorePhotos: [],
  choreDetail: undefined,
};

export default function choresReducer(state = defaultState, action: AnyAction) {
  switch (action.type) {
    case UPDATE_IS_REFRESHING_CHORES:
      return {
        ...state,
        isRefreshingChores: action.payload,
      };
    case UPDATE_IS_REFRESHING_CHORE_PHOTOS:
      return {
        ...state,
        isRefreshingChorePhotos: action.payload,
      };
    case UPDATE_IS_LOADING_CHORES:
      return {
        ...state,
        isLoadingChores: action.payload,
      };
    case UPDATE_IS_LOADING_CHORE_PHOTOS:
      return {
        ...state,
        isLoadingChorePhotos: action.payload,
      };
    case CREATE_CHORE_SUCCESS:
      return {
        ...state,
        chores: [action.payload, ...state.chores],
      };
    case UPDATE_CHORE_SUCCESS:
      return {
        ...state,
        chores: state.chores.map(item => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        }),
      };
    case DELETE_CHORE_SUCCESS:
      return {
        ...state,
        chores: state.chores.filter(item => {
          return item.id !== action.payload;
        }),
      };
    case GET_CHORES_SUCCESS:
      return {
        ...state,
        chores: action.payload,
      };
    case GET_CHORE_PHOTOS_SUCCESS:
      return {
        ...state,
        chorePhotos: action.payload,
      };
    case GET_CHORE_DETAIL_SUCCESS:
      return {
        ...state,
        choreDetail: action.payload,
      };
    case LOG_OUT:
      return {
        ...state,
        isRefreshingChores: false,
        isRefreshingChorePhotos: false,
        isLoadingChores: false,
        isLoadingChorePhotos: false,
        chores: [],
        chorePhotos: [],
        choreDetail: undefined,
      };
    default:
      return state;
  }
}
