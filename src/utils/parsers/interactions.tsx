import {MessageType} from '@constants/types/interactions';
import {convertOriginDateTimeStringToDate} from '@utils/index';

export const convertFireStoreMessageToUIMessage = (item: any) => {
  const result: MessageType = {
    _id: item._data._id,
    createdAt: convertOriginDateTimeStringToDate(item._data.createdAt),
    user: {
      _id: item._data.authorId,
      name: item._data.authorName,
      avatar: item._data.authorAvatar,
    },
    timeStamp: item._data.timeStamp,
    text: item._data.text,
    cuisinePost: {
      id: item._data.cuisinePostId,
      title: item._data.cuisinePostTitle,
      thumbnail: item._data.cuisinePostThumbnail,
    },
    type: item._data.type,
  };
  return result;
};

export const convertUserDatabaseToUserUIMessage = (user: any) => {
  return {
    _id: user.id,
    name: user.name,
    avatar: user.avatarUrl,
  };
};
