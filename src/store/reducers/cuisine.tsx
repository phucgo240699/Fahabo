import {CuisinePostType} from '@constants/types/cuisine';
import {
  CREATE_CUISINE_POST_SUCCESS,
  DELETE_CUISINE_POST_SUCCESS,
  GET_CUISINE_POSTS_SUCCESS,
  UPDATE_CUISINE_POST_SUCCESS,
  UPDATE_IS_GETTING_CUISINE_POSTS,
  UPDATE_IS_LOADING_CUISINE_POSTS,
  UPDATE_IS_REFRESHING_CUISINE_POSTS,
} from '@store/actionTypes/cuisine';
import {LOG_OUT} from '@store/actionTypes/signIn';
import {AnyAction} from 'redux';

export type CuisineState = {
  cuisinePosts: CuisinePostType[];
  isGettingCuisinePosts: boolean;
  isLoadingCuisinePosts: boolean;
  isRefreshingCuisinePosts: boolean;
};

const defaultState: CuisineState = {
  cuisinePosts: [],
  isGettingCuisinePosts: false,
  isLoadingCuisinePosts: false,
  isRefreshingCuisinePosts: false,
};

export default function cuisineReducer(
  state = defaultState,
  action: AnyAction,
) {
  switch (action.type) {
    case CREATE_CUISINE_POST_SUCCESS:
      return {
        ...state,
        cuisinePosts: [action.payload, ...state.cuisinePosts],
      };
    case UPDATE_CUISINE_POST_SUCCESS:
      return {
        ...state,
        cuisinePosts: state.cuisinePosts.map(item => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        }),
      };
    case DELETE_CUISINE_POST_SUCCESS:
      return {
        ...state,
        cuisinePosts: state.cuisinePosts.filter(item => {
          return item.id !== action.payload.id;
        }),
      };
    case GET_CUISINE_POSTS_SUCCESS:
      return {
        ...state,
        cuisinePosts: action.payload,
      };
    case UPDATE_IS_GETTING_CUISINE_POSTS:
      return {
        ...state,
        isGettingCuisinePosts: action.payload,
      };
    case UPDATE_IS_LOADING_CUISINE_POSTS:
      return {
        ...state,
        isLoadingCuisinePosts: action.payload,
      };
    case UPDATE_IS_REFRESHING_CUISINE_POSTS:
      return {
        ...state,
        isRefreshingCuisinePosts: action.payload,
      };
    case LOG_OUT:
      return {
        ...state,
        cuisinePosts: [],
        isGettingCuisinePosts: false,
        isLoadingCuisinePosts: false,
        isRefreshingCuisinePosts: false,
      };
    default:
      return state;
  }
}
