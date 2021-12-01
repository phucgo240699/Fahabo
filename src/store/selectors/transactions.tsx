import {RootState} from '@store/index';

export const transactionsSelector = (state: RootState) =>
  state.transactions.transactions;

export const transactionDetailSelector = (state: RootState) =>
  state.transactions.transactionDetail;

export const transactionPhotosSelector = (state: RootState) =>
  state.transactions.transactionPhotos;

export const transactionExpenseCategoriesSelector = (state: RootState) =>
  state.transactions.transactionExpenseCategories;

export const transactionIncomeCategoriesSelector = (state: RootState) =>
  state.transactions.transactionIncomeCategories;

export const isGettingTransactionsSelector = (state: RootState) =>
  state.transactions.isGettingTransactions;

export const isGettingTransactionPhotosSelector = (state: RootState) =>
  state.transactions.isGettingTransactionPhotos;

export const isGettingTransactionExpenseCategoriesSelector = (
  state: RootState,
) => state.transactions.isGettingTransactionExpenseCategories;

export const isGettingTransactionIncomeCategoriesSelector = (
  state: RootState,
) => state.transactions.isGettingTransactionIncomeCategories;

export const isRefreshingTransactionsSelector = (state: RootState) =>
  state.transactions.isRefreshingTransactions;

export const isRefreshingTransactionExpenseCategoriesSelector = (
  state: RootState,
) => state.transactions.isRefreshingTransactionExpenseCategories;

export const isRefreshingTransactionIncomeCategoriesSelector = (
  state: RootState,
) => state.transactions.isRefreshingTransactionIncomeCategories;

export const isLoadingTransactionsSelector = (state: RootState) =>
  state.transactions.isLoadingTransactions;

export const isLoadingTransactionExpenseCategoriesSelector = (
  state: RootState,
) => state.transactions.isLoadingTransactionExpenseCategories;

export const isLoadingTransactionIncomeCategoriesSelector = (
  state: RootState,
) => state.transactions.isLoadingTransactionIncomeCategories;
