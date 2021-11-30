import {
  TransactionCategoryType,
  TransactionType,
} from '@constants/types/transactions';

export const mixTransactions = (
  oldData: TransactionType[],
  newData: TransactionType[],
) => {
  let uniqueData = new Set<TransactionType>(oldData);
  let result: TransactionType[] = [];
  newData.forEach(item => {
    uniqueData.add(item);
  });
  uniqueData.forEach(item => {
    result.push(item);
  });
  return result;
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
