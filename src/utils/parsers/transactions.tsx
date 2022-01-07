import {get} from 'lodash/fp';
import {
  TransactionCategoryType,
  TransactionStatisticType,
  TransactionType,
} from '@constants/types/transactions';
import colors from '@themes/colors';
import {generateRandomColor} from '@utils/index';
import i18n from '@locales/index';
import {BASE_DOMAIN} from '@constants/Constants';

// Transaction
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

// Category
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
  const rawIcon: string = `${get('icon', rawData)}`;
  const icon = rawIcon.includes('http') ? rawIcon : `${BASE_DOMAIN}${rawIcon}`;
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

// Statistic
export function parseTransactionStatistics(
  rawData: any[],
): TransactionStatisticType[] {
  const result: TransactionStatisticType[] = rawData.map((item, index) => {
    return parseTransactionStatistic({...item, index: index});
  });
  return result;
}
export function parseTransactionStatistic(
  rawData: any,
): TransactionStatisticType {
  const name = get('categoryName', rawData);
  const population = parseInt(get('cost', rawData));
  const translated: boolean = get('translated', rawData);
  const color = generateRandomColor();
  const legendFontColor = colors.SILVER;
  const legendFontSize = 14;
  // const name = translated ? i18n.t(`backend.${rawName}`) : rawName;

  return {
    name,
    translated,
    population,
    color,
    legendFontColor,
    legendFontSize,
  };
}
