import {PhotoType} from '@constants/types/albums';
import {ChoreType} from '@constants/types/chores';
import {
  CREATE_CHORE_SUCCESS,
  DELETE_CHORE_SUCCESS,
  GET_CHORES_SUCCESS,
  GET_CHORE_PHOTOS_SUCCESS,
  UPDATE_CHORE_SUCCESS,
} from '@store/actionTypes/chores';
import {LOG_OUT} from '@store/actionTypes/signIn';
import {AnyAction} from 'redux';

export type ChoresState = {
  chores: ChoreType[];
  chorePhotos: PhotoType[];
};

const defaultState: ChoresState = {
  chores: [],
  chorePhotos: [],
};

export default function choresReducer(state = defaultState, action: AnyAction) {
  switch (action.type) {
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
    case LOG_OUT:
      return {
        ...state,
        chores: [],
        chorePhotos: [],
      };
    default:
      return state;
  }
}
