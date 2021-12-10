export type CuisinePostType = {
  id?: number;
  title?: string;
  thumbnail?: string;
  rating?: number;
  content?: string;
  author?: {
    id?: number;
    name?: string;
    avatar?: string;
  };
};

export enum CuisinePostEmoji {
  ANGRY = '',
  LIKE = '',
  DELICIOUS = '',
}
