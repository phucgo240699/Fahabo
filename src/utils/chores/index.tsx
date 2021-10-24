import colors from '@themes/colors';
import i18n from '@locales/index';
import {ChoreStatus, ChoreType, RepeatType} from '@constants/types/chores';

export const mixChores = (oldData: ChoreType[], newData: ChoreType[]) => {
  let uniqueData = new Set<ChoreType>(oldData);
  let result: ChoreType[] = [];
  newData.forEach(item => {
    uniqueData.add(item);
  });
  uniqueData.forEach(item => {
    result.push(item);
  });
  return result;
};

export const getChoreStatusColor = (status: ChoreStatus) => {
  switch (status) {
    case ChoreStatus.DONE:
      return colors.DONE_CHORE;
    case ChoreStatus.IN_PROGRESS:
      return colors.IN_PROGRESS_CHORE;
    default:
      return colors.EXPIRED_CHORE;
  }
};
export const getChoreStatusText = (status: ChoreStatus) => {
  switch (status) {
    case ChoreStatus.DONE:
      return i18n.t('chores.done');
    case ChoreStatus.IN_PROGRESS:
      return i18n.t('chores.inProgress');
    default:
      return i18n.t('chores.expired');
  }
};

export const getRepeatText = (type: RepeatType) => {
  switch (type) {
    case RepeatType.DAILY:
      return i18n.t('chores.daily');

    case RepeatType.WEEKLY:
      return i18n.t('chores.weekly');

    default:
      return i18n.t('chores.monthly');
  }
};
