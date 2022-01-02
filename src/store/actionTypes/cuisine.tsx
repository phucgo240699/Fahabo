import {
  BookmarkCuisinePostRequestType,
  CreateCuisinePostRequestType,
  CuisinePostType,
  DeleteCuisinePostRequestType,
  GetCuisinePostDetailRequestType,
  GetCuisinePostsRequestType,
  GetMyBookmarkedCuisinePostsRequestType,
  GetMyCuisinePostsRequestType,
  UpdateCuisinePostRequestType,
  VoteCuisinePostRequestType,
} from '@constants/types/cuisine';

// Create
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

// Update
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

// Delete
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

// Get
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

// Get Detail
export const GET_CUISINE_POST_DETAIL_REQUEST =
  'GET_CUISINE_POST_DETAIL_REQUEST';
export const getCuisinePostDetailRequestAction = (
  body: GetCuisinePostDetailRequestType,
) => ({
  type: GET_CUISINE_POST_DETAIL_REQUEST,
  body,
});
export const GET_CUISINE_POST_DETAIL_SUCCESS =
  'GET_CUISINE_POST_DETAIL_SUCCESS';
export const getCuisinePostDetailSuccessAction = (
  payload: CuisinePostType,
) => ({
  type: GET_CUISINE_POST_DETAIL_SUCCESS,
  payload,
});

// Vote
export const VOTE_CUISINE_POST_REQUEST = 'VOTE_CUISINE_POST_REQUEST';
export const voteCuisinePostRequestAction = (
  body: VoteCuisinePostRequestType,
) => ({
  type: VOTE_CUISINE_POST_REQUEST,
  body,
});

// Bookmark
export const BOOKMARK_CUISINE_POST_REQUEST = 'BOOKMARK_CUISINE_POST_REQUEST';
export const bookmarkCuisinePostRequestAction = (
  body: BookmarkCuisinePostRequestType,
) => ({
  type: BOOKMARK_CUISINE_POST_REQUEST,
  body,
});

// Get My Posts
export const GET_MY_CUISINE_POSTS_REQUEST = 'GET_MY_CUISINE_POSTS_REQUEST';
export const getMyCuisinePostsRequestAction = (
  body: GetMyCuisinePostsRequestType,
) => ({
  type: GET_MY_CUISINE_POSTS_REQUEST,
  body,
});
export const GET_MY_CUISINE_POSTS_SUCCESS = 'GET_MY_CUISINE_POSTS_SUCCESS';
export const getMyCuisinePostsSuccessAction = (payload: CuisinePostType[]) => ({
  type: GET_MY_CUISINE_POSTS_SUCCESS,
  payload,
});

// Get My Bookmarked Posts
export const GET_MY_BOOKMARKED_CUISINE_POSTS_REQUEST =
  'GET_MY_BOOKMARKED_CUISINE_POSTS_REQUEST';
export const getMyBookmarkedCuisinePostsRequestAction = (
  body: GetMyBookmarkedCuisinePostsRequestType,
) => ({
  type: GET_MY_BOOKMARKED_CUISINE_POSTS_REQUEST,
  body,
});
export const GET_MY_BOOKMARKED_CUISINE_POSTS_SUCCESS =
  'GET_MY_BOOKMARKED_CUISINE_POSTS_SUCCESS';
export const getMyBookmarkedCuisinePostsSuccessAction = (
  payload: CuisinePostType[],
) => ({
  type: GET_MY_BOOKMARKED_CUISINE_POSTS_SUCCESS,
  payload,
});

// Session
// Cuisine Posts
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

// My Cuisine Posts
export const UPDATE_IS_GETTING_MY_CUISINE_POSTS =
  'UPDATE_IS_GETTING_MY_CUISINE_POSTS';
export const updateIsGettingMyCuisinePostsAction = (payload: boolean) => ({
  type: UPDATE_IS_GETTING_MY_CUISINE_POSTS,
  payload,
});
export const UPDATE_IS_LOADING_MY_CUISINE_POSTS =
  'UPDATE_IS_LOADING_MY_CUISINE_POSTS';
export const updateIsLoadingMyCuisinePostsAction = (payload: boolean) => ({
  type: UPDATE_IS_LOADING_MY_CUISINE_POSTS,
  payload,
});
export const UPDATE_IS_REFRESHING_MY_CUISINE_POSTS =
  'UPDATE_IS_REFRESHING_MY_CUISINE_POSTS';
export const updateIsRefreshingMyCuisinePostsAction = (payload: boolean) => ({
  type: UPDATE_IS_REFRESHING_MY_CUISINE_POSTS,
  payload,
});

// Bookmarked cuisine post
export const UPDATE_IS_GETTING_MY_BOOKMARKED_CUISINE_POSTS =
  'UPDATE_IS_GETTING_MY_BOOKMARKED_CUISINE_POSTS';
export const updateIsGettingMyBookmarkedCuisinePostsAction = (
  payload: boolean,
) => ({
  type: UPDATE_IS_GETTING_MY_BOOKMARKED_CUISINE_POSTS,
  payload,
});
export const UPDATE_IS_LOADING_MY_BOOKMARKED_CUISINE_POSTS =
  'UPDATE_IS_LOADING_MY_BOOKMARKED_CUISINE_POSTS';
export const updateIsLoadingMyBookmarkedCuisinePostsAction = (
  payload: boolean,
) => ({
  type: UPDATE_IS_LOADING_MY_BOOKMARKED_CUISINE_POSTS,
  payload,
});
export const UPDATE_IS_REFRESHING_MY_BOOKMARKED_CUISINE_POSTS =
  'UPDATE_IS_REFRESHING_MY_BOOKMARKED_CUISINE_POSTS';
export const updateIsRefreshingMyBookmarkedCuisinePostsAction = (
  payload: boolean,
) => ({
  type: UPDATE_IS_REFRESHING_MY_BOOKMARKED_CUISINE_POSTS,
  payload,
});
