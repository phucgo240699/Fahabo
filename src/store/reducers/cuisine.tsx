import {CuisinePostType} from '@constants/types/cuisine';
import {
  CREATE_CUISINE_POST_SUCCESS,
  DELETE_CUISINE_POST_SUCCESS,
  GET_CUISINE_POSTS_SUCCESS,
  GET_CUISINE_POST_DETAIL_SUCCESS,
  GET_MY_BOOKMARKED_CUISINE_POSTS_SUCCESS,
  GET_MY_CUISINE_POSTS_SUCCESS,
  UPDATE_CUISINE_POST_SUCCESS,
  UPDATE_IS_GETTING_CUISINE_POSTS,
  UPDATE_IS_GETTING_MY_BOOKMARKED_CUISINE_POSTS,
  UPDATE_IS_GETTING_MY_CUISINE_POSTS,
  UPDATE_IS_LOADING_CUISINE_POSTS,
  UPDATE_IS_LOADING_MY_BOOKMARKED_CUISINE_POSTS,
  UPDATE_IS_LOADING_MY_CUISINE_POSTS,
  UPDATE_IS_REFRESHING_CUISINE_POSTS,
  UPDATE_IS_REFRESHING_MY_BOOKMARKED_CUISINE_POSTS,
  UPDATE_IS_REFRESHING_MY_CUISINE_POSTS,
} from '@store/actionTypes/cuisine';
import {LOG_OUT} from '@store/actionTypes/signIn';
import {AnyAction} from 'redux';

export type CuisineState = {
  cuisinePosts: CuisinePostType[];
  myCuisinePosts: CuisinePostType[];
  myBookmarkedCuisinePosts: CuisinePostType[];
  cuisinePostDetail?: CuisinePostType;

  isGettingCuisinePosts: boolean;
  isLoadingCuisinePosts: boolean;
  isRefreshingCuisinePosts: boolean;

  isGettingMyCuisinePosts: boolean;
  isLoadingMyCuisinePosts: boolean;
  isRefreshingMyCuisinePosts: boolean;

  isGettingMyBookmarkedCuisinePosts: boolean;
  isLoadingMyBookmarkedCuisinePosts: boolean;
  isRefreshingMyBookmarkedCuisinePosts: boolean;
};

const defaultState: CuisineState = {
  cuisinePosts: [],
  myCuisinePosts: [],
  myBookmarkedCuisinePosts: [],
  cuisinePostDetail: undefined,

  isGettingCuisinePosts: false,
  isLoadingCuisinePosts: false,
  isRefreshingCuisinePosts: false,

  isGettingMyCuisinePosts: false,
  isLoadingMyCuisinePosts: false,
  isRefreshingMyCuisinePosts: false,

  isGettingMyBookmarkedCuisinePosts: false,
  isLoadingMyBookmarkedCuisinePosts: false,
  isRefreshingMyBookmarkedCuisinePosts: false,
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
        myCuisinePosts: [action.payload, ...state.myCuisinePosts],
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
        myCuisinePosts: state.myCuisinePosts.map(item => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        }),
        myBookmarkedCuisinePosts: state.myBookmarkedCuisinePosts.map(item => {
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
        myCuisinePosts: state.myCuisinePosts.filter(item => {
          return item.id !== action.payload.id;
        }),
        myBookmarkedCuisinePosts: state.myBookmarkedCuisinePosts.filter(
          item => {
            return item.id !== action.payload.id;
          },
        ),
      };
    case GET_CUISINE_POSTS_SUCCESS:
      return {
        ...state,
        cuisinePosts: action.payload,
      };
    case GET_CUISINE_POST_DETAIL_SUCCESS:
      return {
        ...state,
        cuisinePostDetail: action.payload,
      };
    case GET_MY_CUISINE_POSTS_SUCCESS:
      return {
        ...state,
        myCuisinePosts: action.payload,
      };
    case GET_MY_BOOKMARKED_CUISINE_POSTS_SUCCESS:
      return {
        ...state,
        myBookmarkedCuisinePosts: action.payload,
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

    case UPDATE_IS_GETTING_MY_CUISINE_POSTS:
      return {
        ...state,
        isGettingMyCuisinePosts: action.payload,
      };
    case UPDATE_IS_LOADING_MY_CUISINE_POSTS:
      return {
        ...state,
        isLoadingMyCuisinePosts: action.payload,
      };
    case UPDATE_IS_REFRESHING_MY_CUISINE_POSTS:
      return {
        ...state,
        isRefreshingMyCuisinePosts: action.payload,
      };

    case UPDATE_IS_GETTING_MY_BOOKMARKED_CUISINE_POSTS:
      return {
        ...state,
        isGettingMyBookmarkedCuisinePosts: action.payload,
      };
    case UPDATE_IS_LOADING_MY_BOOKMARKED_CUISINE_POSTS:
      return {
        ...state,
        isLoadingMyBookmarkedCuisinePosts: action.payload,
      };
    case UPDATE_IS_REFRESHING_MY_BOOKMARKED_CUISINE_POSTS:
      return {
        ...state,
        isRefreshingMyBookmarkedCuisinePosts: action.payload,
      };
    case LOG_OUT:
      return {
        ...state,
        cuisinePosts: [],
        myCuisinePosts: [],
        myBookmarkedCuisinePosts: [],
        cuisinePostDetail: undefined,

        isGettingCuisinePosts: false,
        isLoadingCuisinePosts: false,
        isRefreshingCuisinePosts: false,

        isGettingMyCuisinePosts: false,
        isLoadingMyCuisinePosts: false,
        isRefreshingMyCuisinePosts: false,

        isGettingMyBookmarkedCuisinePosts: false,
        isLoadingMyBookmarkedCuisinePosts: false,
        isRefreshingMyBookmarkedCuisinePosts: false,
      };
    default:
      return state;
  }
}
