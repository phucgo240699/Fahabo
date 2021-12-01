import {get} from 'lodash/fp';
import {
  TransactionCategoryType,
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
  const note = get('note', rawData);
  const date = get('date', rawData);
  const cost = parseInt(get('cost', rawData));
  const repeatType = get('repeatType', rawData);
  const category = parseTransactionCategory(get('category', rawData));

  return {
    id,
    type,
    note,
    date,
    cost,
    repeatType,
    category,
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
  const title = get('title', rawData);
  const icon = get('icon', rawData);
  const translated = get('translated', rawData);
  const type = get('type', rawData);

  return {
    id,
    title,
    icon,
    translated,
    type,
  };
}
