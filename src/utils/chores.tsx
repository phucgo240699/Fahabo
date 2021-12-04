import colors from '@themes/colors';
import i18n from '@locales/index';
import {ChoreStatus, ChoreType, RepeatType} from '@constants/types/chores';

export const mixChores = (oldData: ChoreType[], newData: ChoreType[]) => {
  var oldIds = new Set(oldData.map(item => item.id));
  var merged = [...oldData, ...newData.filter(item => !oldIds.has(item.id))];
  return merged;
};

export function getChoreStatus(value?: string): ChoreStatus | undefined {
  switch (value) {
    case ChoreStatus.DONE:
      return ChoreStatus.DONE;
    case ChoreStatus.IN_PROGRESS:
      return ChoreStatus.IN_PROGRESS;
    case ChoreStatus.EXPIRED:
      return ChoreStatus.EXPIRED;
    default:
      return undefined;
  }
}
export const getChoreStatusColor = (status?: string) => {
  switch (status) {
    case ChoreStatus.DONE:
      return colors.DONE_CHORE;
    case ChoreStatus.IN_PROGRESS:
      return colors.IN_PROGRESS_CHORE;
    default:
      return colors.EXPIRED_CHORE;
  }
};
export const getChoreStatusText = (status?: string) => {
  switch (status) {
    case ChoreStatus.DONE:
      return i18n.t('chores.done');
    case ChoreStatus.IN_PROGRESS:
      return i18n.t('chores.inProgress');
    default:
      return i18n.t('chores.expired');
  }
};

export function getRepeatType(value?: string): RepeatType {
  switch (value) {
    case RepeatType.DAILY:
      return RepeatType.DAILY;

    case RepeatType.WEEKLY:
      return RepeatType.WEEKLY;

    case RepeatType.MONTHLY:
      return RepeatType.MONTHLY;

    default:
      return RepeatType.NONE;
  }
}

export const getRepeatText = (type: RepeatType | string | undefined) => {
  switch (type) {
    case RepeatType.DAILY:
      return i18n.t('chores.daily');

    case RepeatType.WEEKLY:
      return i18n.t('chores.weekly');

    case RepeatType.MONTHLY:
      return i18n.t('chores.monthly');

    default:
      return i18n.t('chores.noneRepeat');
  }
};
