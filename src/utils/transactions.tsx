import {
  TransactionCategoryType,
  TransactionType,
} from '@constants/types/transactions';
import i18n from '@locales/index';

export const mixTransactions = (
  oldData: TransactionType[],
  newData: TransactionType[],
) => {
  var oldIds = new Set(oldData.map(item => item.id));
  var merged = [...oldData, ...newData.filter(item => !oldIds.has(item.id))];
  return merged;
};

export const mixTransactionCategories = (
  oldData: TransactionCategoryType[],
  newData: TransactionCategoryType[],
) => {
  let uniqueData = new Set<TransactionCategoryType>(oldData);
  let result: TransactionCategoryType[] = [];
  newData.forEach(item => {
    uniqueData.add(item);
  });
  uniqueData.forEach(item => {
    result.push(item);
  });
  return result;
};

export const getCategorySegmentName = (value: string) => {
  switch (value) {
    case 'EXPENSE':
      return i18n.t('transaction.expense');

    default:
      return i18n.t('transaction.income');
  }
};
