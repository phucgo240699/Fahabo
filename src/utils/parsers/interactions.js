
import {
  convertOriginDateTimeStringToDate,
} from '@utils/index';

export const convertFireStoreMessageToUIMessage = (item) => {
  return {
    _id: item._data._id,
    text: item._data.text,
    createdAt: convertOriginDateTimeStringToDate(
      item._data.createdAt,
    ),
    user: {
      _id: item._data.authorId,
      name: item._data.authorName,
      avatar: item._data.authorAvatar,
    },
  }
}

export const convertUserDatabaseToUserUIMessage = (user) => {
  return {
    _id: user.id,
    name: user.name,
    avatar: user.avatarUrl
  }
}
