import {
  CreateCuisinePostRequestType,
  CuisinePostType,
  DeleteCuisinePostRequestType,
  GetCuisinePostsRequestType,
  UpdateCuisinePostRequestType,
  VoteCuisinePostRequestType,
} from '@constants/types/cuisine';

export const CREATE_CUISINE_POST_REQUEST = 'CREATE_CUISINE_POST_REQUEST';
export const createCuisinePostRequestAction = (
  body: CreateCuisinePostRequestType,
) => ({
  type: CREATE_CUISINE_POST_REQUEST,
  body,
});
export const CREATE_CUISINE_POST_SUCCESS = 'CREATE_CUISINE_POST_SUCCESS';
export const createCuisinePostSuccessAction = (payload: CuisinePostType) => ({
  type: CREATE_CUISINE_POST_SUCCESS,
  payload,
});

export const UPDATE_CUISINE_POST_REQUEST = 'UPDATE_CUISINE_POST_REQUEST';
export const updateCuisinePostRequestAction = (
  body: UpdateCuisinePostRequestType,
) => ({
  type: UPDATE_CUISINE_POST_REQUEST,
  body,
});
export const UPDATE_CUISINE_POST_SUCCESS = 'UPDATE_CUISINE_POST_SUCCESS';
export const updateCuisinePostSuccessAction = (payload: CuisinePostType) => ({
  type: UPDATE_CUISINE_POST_SUCCESS,
  payload,
});

export const DELETE_CUISINE_POST_REQUEST = 'DELETE_CUISINE_POST_REQUEST';
export const deleteCuisinePostRequestAction = (
  body: DeleteCuisinePostRequestType,
) => ({
  type: DELETE_CUISINE_POST_REQUEST,
  body,
});
export const DELETE_CUISINE_POST_SUCCESS = 'DELETE_CUISINE_POST_SUCCESS';
export const deleteCuisinePostSuccessAction = (payload: CuisinePostType) => ({
  type: DELETE_CUISINE_POST_SUCCESS,
  payload,
});

export const GET_CUISINE_POSTS_REQUEST = 'GET_CUISINE_POSTS_REQUEST';
export const getCuisinePostsRequestAction = (
  body: GetCuisinePostsRequestType,
) => ({
  type: GET_CUISINE_POSTS_REQUEST,
  body,
});
export const GET_CUISINE_POSTS_SUCCESS = 'GET_CUISINE_POSTS_SUCCESS';
export const getCuisinePostsSuccessAction = (payload: CuisinePostType[]) => ({
  type: GET_CUISINE_POSTS_SUCCESS,
  payload,
});

export const VOTE_CUISINE_POST_REQUEST = 'VOTE_CUISINE_POST_REQUEST';
export const voteCuisinePostRequestAction = (
  body: VoteCuisinePostRequestType,
) => ({
  type: VOTE_CUISINE_POST_REQUEST,
  body,
});

// Session
export const UPDATE_IS_GETTING_CUISINE_POSTS =
  'UPDATE_IS_GETTING_CUISINE_POSTS';
export const updateIsGettingCuisinePostsAction = (payload: boolean) => ({
  type: UPDATE_IS_GETTING_CUISINE_POSTS,
  payload,
});
export const UPDATE_IS_LOADING_CUISINE_POSTS =
  'UPDATE_IS_LOADING_CUISINE_POSTS';
export const updateIsLoadingCuisinePostsAction = (payload: boolean) => ({
  type: UPDATE_IS_LOADING_CUISINE_POSTS,
  payload,
});
export const UPDATE_IS_REFRESHING_CUISINE_POSTS =
  'UPDATE_IS_REFRESHING_CUISINE_POSTS';
export const updateIsRefreshingCuisinePostsAction = (payload: boolean) => ({
  type: UPDATE_IS_REFRESHING_CUISINE_POSTS,
  payload,
});
