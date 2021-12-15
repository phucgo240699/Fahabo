import {CuisinePostEmoji, CuisinePostType} from '@constants/types/cuisine';

export const mixCuisinePosts = (
  oldData: CuisinePostType[],
  newData: CuisinePostType[],
) => {
  var oldIds = new Set(oldData.map(item => item.id));
  var merged = [...oldData, ...newData.filter(item => !oldIds.has(item.id))];
  return merged;
};

export const getEmoji = (emojiId: number) => {
  switch (emojiId) {
    case 1:
      return CuisinePostEmoji.ANGRY;
    case 2:
      return CuisinePostEmoji.LIKE;
    default:
      return CuisinePostEmoji.DELICIOUS;
  }
};
