import colors from '@themes/colors';
import i18n from '@locales/index';
import {EventType} from '@constants/types/events';

export const mixEvents = (oldData: EventType[], newData: EventType[]) => {
  let uniqueData = new Set<EventType>(oldData);
  let result: EventType[] = [];
  newData.forEach(item => {
    uniqueData.add(item);
  });
  uniqueData.forEach(item => {
    result.push(item);
  });
  return result;
};
