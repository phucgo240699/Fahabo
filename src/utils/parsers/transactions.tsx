import {get} from 'lodash/fp';
import {
  TransactionCategoryType,
  TransactionDetailType,
  TransactionType,
} from '@constants/types/transactions';

export function parseTransactions(rawData: any[]): TransactionType[] {
  const result: TransactionType[] = rawData.map((item, index) => {
    return parseTransaction({...item, index: index});
  });
  return result;
}

export function parseTransaction(rawData: any): TransactionType {
  const id = get('transactionId', rawData);
  const type = get('type', rawData);
  const date = get('date', rawData);
  const cost = get('cost', rawData);
  const categoryName = get('categoryName', rawData);
  const categoryIcon = get('categoryIcon', rawData);

  return {
    id,
    type,
    date,
    cost,
    categoryName,
    categoryIcon,
  };
}

export function parseTransactionDetail(rawData: any): TransactionDetailType {
  const id = get('transactionId', rawData);
  const type = get('type', rawData);
  const note = get('note', rawData);
  const date = get('date', rawData);
  const cost = get('cost', rawData);
  const categoryName = get('categoryName', rawData);
  const categoryIcon = get('categoryIcon', rawData);
  const repeatType = get('repeatType', rawData);

  return {
    id,
    type,
    note,
    date,
    cost,
    categoryName,
    categoryIcon,
    repeatType,
  };
}

export function parseTransactionCategories(
  rawData: any[],
): TransactionCategoryType[] {
  const result: TransactionCategoryType[] = rawData.map((item, index) => {
    return parseTransactionCategory({...item, index: index});
  });
  return result;
}

export function parseTransactionCategory(
  rawData: any,
): TransactionCategoryType {
  const id = get('categoryId', rawData);
  const name = get('name', rawData);
  const icon = get('icon', rawData);

  return {
    id,
    name,
    icon,
  };
}
