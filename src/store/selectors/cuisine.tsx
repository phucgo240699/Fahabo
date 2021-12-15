import {RootState} from '@store/index';

export const cuisinePostsSelector = (state: RootState) =>
  state.cuisine.cuisinePosts;

export const isGettingCuisinePostsSelector = (state: RootState) =>
  state.cuisine.isGettingCuisinePosts;

export const isLoadingCuisinePostsSelector = (state: RootState) =>
  state.cuisine.isLoadingCuisinePosts;

export const isRefreshingCuisinePostsSelector = (state: RootState) =>
  state.cuisine.isRefreshingCuisinePosts;
