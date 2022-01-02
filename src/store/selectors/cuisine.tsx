import {RootState} from '@store/index';

export const cuisinePostsSelector = (state: RootState) =>
  state.cuisine.cuisinePosts;

export const myCuisinePostsSelector = (state: RootState) =>
  state.cuisine.myCuisinePosts;

export const myBookmarkedCuisinePostsSelector = (state: RootState) =>
  state.cuisine.myBookmarkedCuisinePosts;

export const cuisinePostDetailSelector = (state: RootState) =>
  state.cuisine.cuisinePostDetail;

export const isGettingCuisinePostsSelector = (state: RootState) =>
  state.cuisine.isGettingCuisinePosts;
export const isLoadingCuisinePostsSelector = (state: RootState) =>
  state.cuisine.isLoadingCuisinePosts;
export const isRefreshingCuisinePostsSelector = (state: RootState) =>
  state.cuisine.isRefreshingCuisinePosts;

export const isGettingMyCuisinePostsSelector = (state: RootState) =>
  state.cuisine.isGettingMyCuisinePosts;
export const isLoadingMyCuisinePostsSelector = (state: RootState) =>
  state.cuisine.isLoadingMyCuisinePosts;
export const isRefreshingMyCuisinePostsSelector = (state: RootState) =>
  state.cuisine.isRefreshingMyCuisinePosts;

export const isGettingMyBookmarkedCuisinePostsSelector = (state: RootState) =>
  state.cuisine.isGettingMyBookmarkedCuisinePosts;
export const isLoadingMyBookmarkedCuisinePostsSelector = (state: RootState) =>
  state.cuisine.isLoadingMyBookmarkedCuisinePosts;
export const isRefreshingMyBookmarkedCuisinePostsSelector = (
  state: RootState,
) => state.cuisine.isRefreshingMyBookmarkedCuisinePosts;
