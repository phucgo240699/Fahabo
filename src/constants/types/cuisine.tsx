//
// Request
//
// Post
export type CreateCuisinePostRequestType = {
  title?: string;
  thumbnail?: string;
  content?: string;
};

export type UpdateCuisinePostRequestType = {
  cuisinePostId?: number;
  title?: string;
  thumbnail?: string;
  content?: string;
};

export type DeleteCuisinePostRequestType = {
  cuisinePostId?: number;
};

export type GetCuisinePostsRequestType = {
  searchText?: string;
  showHUD?: boolean;
  getting?: boolean;
  loading?: boolean;
  refreshing?: boolean;
  page?: number;
  size?: number;
};

export type GetCuisinePostDetailRequestType = {
  cuisinePostId?: number;
};

export type BookmarkCuisinePostRequestType = {
  cuisinePostId?: number;
};

export type GetMyCuisinePostsRequestType = {
  showHUD?: boolean;
  getting?: boolean;
  loading?: boolean;
  refreshing?: boolean;
  searchText?: string;
  page?: number;
  size?: number;
};

export type GetMyBookmarkedCuisinePostsRequestType = {
  showHUD?: boolean;
  getting?: boolean;
  loading?: boolean;
  refreshing?: boolean;
  searchText?: string;
  page?: number;
  size?: number;
};

export type VoteCuisinePostRequestType = {
  voteId?: number;
  cuisinePostId?: number;
};

// Comment
export type CreateCuisinePostCommentRequestType = {
  cuisinePostId: number;
  parentCommentId: number; // optional
  content: string;
};

export type UpdateCuisinePostCommentRequestType = {
  commentId: number;
  content: string;
};

export type DeleteCuisinePostCommentRequestType = {
  parentCommentId: number;
  commentId: number;
};

export type GetCuisinePostCommentsRequestType = {
  parentCommentId: number;
  commentId: number;
};

//
// Type
//
export type CuisinePostType = {
  id?: number;
  title?: string;
  thumbnail?: string;
  rawThumbnail?: string;
  content?: string;
  updatedAt?: string;
  angryRatings?: number;
  likeRatings?: number;
  yummyRatings?: number;
  isBookmarked?: boolean;
  userReactedType?: number;
  author: CuisineAuthorType;
  comments?: [];
};

export type CuisinePostCommentType = {
  parentId?: number;
  id?: number;
  content?: string;
  author?: CuisineAuthorType;
  updatedAt?: string;
  subComments?: []; // 2 oldest comments
};

export type CuisineAuthorType = {
  id?: number;
  name?: string;
  avatar?: string;
  rawAvatar?: string;
};

export enum CuisinePostEmoji {
  ANGRY = '😡',
  LIKE = '👍',
  DELICIOUS = '😋',
}
