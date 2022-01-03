import {BASE_URL, Pagination} from '@constants/Constants';
import {
  BookmarkCuisinePostRequestType,
  CreateCuisinePostRequestType,
  DeleteCuisinePostRequestType,
  GetCuisinePostDetailRequestType,
  GetCuisinePostsRequestType,
  GetMyBookmarkedCuisinePostsRequestType,
  GetMyCuisinePostsRequestType,
  UpdateCuisinePostRequestType,
  VoteCuisinePostRequestType,
} from '@constants/types/cuisine';
import {isNull} from '@utils/index';
import {apiProvider} from './apiProvider';

export function createCuisinePostApi(
  accessToken?: string,
  body?: CreateCuisinePostRequestType,
) {
  return new apiProvider(accessToken).post(
    `${BASE_URL}/cuisine_posts/create`,
    body,
  );
}

export function updateCuisinePostApi(
  accessToken?: string,
  body?: UpdateCuisinePostRequestType,
) {
  return new apiProvider(accessToken).post(
    `${BASE_URL}/cuisine_posts/update`,
    body,
  );
}

export function deleteCuisinePostApi(
  accessToken?: string,
  body?: DeleteCuisinePostRequestType,
) {
  return new apiProvider(accessToken).post(
    `${BASE_URL}/cuisine_posts/delete`,
    body,
  );
}

export function getCuisinePostsApi(
  accessToken?: string,
  body?: GetCuisinePostsRequestType,
) {
  let page = 0;
  let size = Pagination.CuisinePosts;
  if (!isNull(body)) {
    if (!isNull(body?.page)) {
      page = body?.page ?? 0;
    }
    if (!isNull(body?.size)) {
      size = body?.size ?? Pagination.CuisinePosts;
    }
  }
  return new apiProvider(accessToken).post(
    `${BASE_URL}/cuisine_posts?page=${page}&size=${size}`,
    body,
  );
}

export function getCuisinePostDetailApi(
  accessToken?: string,
  body?: GetCuisinePostDetailRequestType,
) {
  return new apiProvider(accessToken).post(
    `${BASE_URL}/cuisine_posts/detail?id=${body?.cuisinePostId}`,
    body,
  );
}

export function voteCuisinePostApi(
  accessToken?: string,
  body?: VoteCuisinePostRequestType,
) {
  return new apiProvider(accessToken).post(
    `${BASE_URL}/cuisine_posts/vote`,
    body,
  );
}

export function bookmarkCuisinePostApi(
  accessToken?: string,
  body?: BookmarkCuisinePostRequestType,
) {
  return new apiProvider(accessToken).post(
    `${BASE_URL}/cuisine_posts/bookmark?id=${body?.cuisinePostId}`,
  );
}

export function getMyCuisinePostsApi(
  accessToken?: string,
  body?: GetMyCuisinePostsRequestType,
) {
  let page = 0;
  let size = Pagination.CuisinePosts;
  if (!isNull(body)) {
    if (!isNull(body?.page)) {
      page = body?.page ?? 0;
    }
    if (!isNull(body?.size)) {
      size = body?.size ?? Pagination.CuisinePosts;
    }
  }
  return new apiProvider(accessToken).post(
    `${BASE_URL}/cuisine_posts/writtenPosts?page=${page}&size=${size}`,
    body,
  );
}

export function getMyBookmarkedCuisinePostsApi(
  accessToken?: string,
  body?: GetMyBookmarkedCuisinePostsRequestType,
) {
  let page = 0;
  let size = Pagination.CuisinePosts;
  if (!isNull(body)) {
    if (!isNull(body?.page)) {
      page = body?.page ?? 0;
    }
    if (!isNull(body?.size)) {
      size = body?.size ?? Pagination.CuisinePosts;
    }
  }
  return new apiProvider(accessToken).post(
    `${BASE_URL}/cuisine_posts/bookmark/list?page=${page}&size=${size}`,
    body,
  );
}
