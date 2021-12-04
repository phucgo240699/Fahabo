import colors from '@themes/colors';
import i18n from '@locales/index';
import {EventType} from '@constants/types/events';

export const mixEvents = (oldData: EventType[], newData: EventType[]) => {
  var oldIds = new Set(oldData.map(item => item.id));
  var merged = [...oldData, ...newData.filter(item => !oldIds.has(item.id))];
  return merged;
};
