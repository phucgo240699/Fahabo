import {NotificationType} from '@constants/types/notifications';

export const mixNotifications = (
  oldData: NotificationType[],
  newData: NotificationType[],
) => {
  let uniqueData = new Set<NotificationType>(oldData);
  let result: NotificationType[] = [];
  newData.forEach(item => {
    uniqueData.add(item);
  });
  uniqueData.forEach(item => {
    result.push(item);
  });
  return result;
};
