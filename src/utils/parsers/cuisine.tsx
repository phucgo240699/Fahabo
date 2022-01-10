import {get} from 'lodash/fp';
import {
  CuisineAuthorType,
  CuisinePostCommentType,
  CuisinePostType,
} from '@constants/types/cuisine';
import {BASE_DOMAIN} from '@constants/Constants';

export function parseCuisinePost(rawData: any): CuisinePostType {
  const id = get('cuisinePostId', rawData);
  const title = get('title', rawData);
  const rawThumbnail: string = `${get('thumbnail', rawData)}`;
  const thumbnail = rawThumbnail.includes('http')
    ? rawThumbnail
    : `${BASE_DOMAIN}${rawThumbnail}`;
  const content = get('content', rawData);
  const updatedAt = get('updatedAt', rawData);
  const angryRatings = parseInt(get('angryRatings', rawData));
  const likeRatings = parseInt(get('likeRatings', rawData));
  const yummyRatings = parseInt(get('yummyRatings', rawData));
  const isBookmarked = get('isBookmarked', rawData);
  const userReactedType = parseInt(get('userReactedType', rawData));
  const comments = get('comments', rawData);
  const author = parseCuisineAuthor(get('author', rawData));

  return {
    id,
    title,
    thumbnail,
    rawThumbnail,
    content,
    updatedAt,
    angryRatings,
    likeRatings,
    yummyRatings,
    isBookmarked,
    userReactedType,
    comments,
    author,
  };
}

export function parseCuisinePosts(rawData: any[]): CuisinePostType[] {
  const result: CuisinePostType[] = rawData.map(item => {
    return parseCuisinePost(item);
  });
  return result;
}

export function parseCuisineComment(rawData: any): CuisinePostCommentType {
  const parentId = get('parentCommentId', rawData);
  const id = get('commentId', rawData);
  const content = get('content', rawData);
  const author = parseCuisineAuthor(get('author', rawData));
  const updatedAt = get('updatedAt', rawData);
  const subComments = get('subComments', rawData).map((item: any) =>
    parseCuisineComment(item),
  );

  return {
    parentId,
    id,
    content,
    author,
    updatedAt,
    subComments,
  };
}

export function parseCuisineAuthor(rawData: any): CuisineAuthorType {
  const id = get('id', rawData);
  const name = get('name', rawData);
  const rawAvatar: string = `${get('avatar', rawData)}`;
  const avatar = rawAvatar.includes('http')
    ? rawAvatar
    : `${BASE_DOMAIN}${rawAvatar}`;
  return {
    id,
    name,
    avatar,
    rawAvatar,
  };
}
