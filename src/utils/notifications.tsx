import {NotificationType} from '@constants/types/notifications';
import i18n from '@locales/index';

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

export const getMessageDate = (date: string) => {
  if (i18n.defaultLocale === 'vi') {
    if (date.includes('Jan')) {
      return date.replace('Jan', 'Tháng 1');
    } else if (date.includes('Feb')) {
      return date.replace('Feb', 'Tháng 2');
    } else if (date.includes('Mar')) {
      return date.replace('Mar', 'Tháng 3');
    } else if (date.includes('Apr')) {
      return date.replace('Apr', 'Tháng 4');
    } else if (date.includes('May')) {
      return date.replace('May', 'Tháng 5');
    } else if (date.includes('Jun')) {
      return date.replace('Jun', 'Tháng 6');
    } else if (date.includes('Jul')) {
      return date.replace('Jul', 'Tháng 7');
    } else if (date.includes('Aug')) {
      return date.replace('Aug', 'Tháng 8');
    } else if (date.includes('Sep')) {
      return date.replace('Sep', 'Tháng 9');
    } else if (date.includes('Oct')) {
      return date.replace('Oct', 'Tháng 10');
    } else if (date.includes('Nov')) {
      return date.replace('Nov', 'Tháng 11');
    } else if (date.includes('Dec')) {
      return date.replace('Dec', 'Tháng 12');
    }
  } else {
    return date;
  }
};
