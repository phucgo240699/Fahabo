import {get} from 'lodash/fp';
import {
  NotificationDataType,
  NotificationType,
} from '@constants/types/notifications';

export function parseDataNotification(rawData: any): NotificationDataType {
  const id = get('id', rawData);
  const navigate = get('navigate', rawData);
  const familyId = get('familyId', rawData);
  return {
    id,
    navigate,
    familyId,
  };
}

export function parseNotification(rawData: any): NotificationType {
  const id = get('id', rawData);
  const type = get('type', rawData);
  const title = get('title', rawData);
  const description = get('description', rawData);
  const isClicked = get('isClicked', rawData);
  const createdAt = get('created_at', rawData);
  const data = parseDataNotification(rawData.data);
  return {
    id,
    type,
    title,
    description,
    isClicked,
    createdAt,
    data,
  };
}

export function parseNotifications(rawData: any[]): NotificationType[] {
  const result: NotificationType[] = rawData.map((item, index) => {
    return parseNotification({...item, index: index});
  });
  return result;
}
