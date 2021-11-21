import {BASE_URL, Pagination} from '@constants/Constants';
import {
  ClearInteractionBadgeRequestType,
  ClickNotificationRequestType,
  GetBadgesRequestType,
  GetNotificationsRequestType,
} from '@constants/types/notifications';
import {isNull} from '@utils/index';
import {apiProvider} from './apiProvider';

export function getNotificationsApi(
  accessToken?: string,
  body?: GetNotificationsRequestType,
) {
  let page = 0;
  let size = Pagination.Notifications;
  if (!isNull(body)) {
    if (!isNull(body?.page)) {
      page = body?.page ?? 0;
    }
    if (!isNull(body?.size)) {
      size = body?.size ?? Pagination.Notifications;
    }
  }
  return new apiProvider(accessToken).post(
    `${BASE_URL}/notifications?page=${page}&size=${size}`,
    body,
  );
}

export function getBadgesApi(
  accessToken?: string,
  body?: GetBadgesRequestType,
) {
  return new apiProvider(accessToken).post(
    `${BASE_URL}/notifications/count_notification`,
    body,
  );
}

export function clearNotificationBadgeApi(accessToken?: string) {
  return new apiProvider(accessToken).post(
    `${BASE_URL}/notifications/clear_noti`,
  );
}

export function clearInteractionBadgeApi(
  accessToken?: string,
  body?: ClearInteractionBadgeRequestType,
) {
  return new apiProvider(accessToken).post(
    `${BASE_URL}/notifications/clear_chat_noti`,
    body,
  );
}

export function clickNotificationApi(
  accessToken?: string,
  body?: ClickNotificationRequestType,
) {
  return new apiProvider(accessToken).post(
    `${BASE_URL}/notifications/click`,
    body,
  );
}
