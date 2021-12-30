import {get} from 'lodash/fp';
import {
  CuisineAuthorType,
  CuisinePostCommentType,
  CuisinePostType,
} from '@constants/types/cuisine';

export function parseCuisinePost(rawData: any): CuisinePostType {
  const id = get('cuisinePostId', rawData);
  const title = get('title', rawData);
  const thumbnail = get('thumbnail', rawData);
  const content = get('content', rawData);
  const updatedAt = get('updatedAt', rawData);
  const angryRatings = parseInt(get('angryRatings', rawData));
  const likeRatings = parseInt(get('likeRatings', rawData));
  const yummyRatings = parseInt(get('yummyRatings', rawData));
  const userReactedType = parseInt(get('userReactedType', rawData));
  const comments = get('comments', rawData);
  const author = parseCuisineAuthor(get('author', rawData));

  return {
    id,
    title,
    thumbnail,
    content,
    updatedAt,
    angryRatings,
    likeRatings,
    yummyRatings,
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
  const avatar = get('avatar', rawData);
  return {
    id,
    name,
    avatar,
  };
}