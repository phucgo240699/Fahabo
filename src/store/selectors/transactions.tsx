import {RootState} from '@store/index';

export const transactionsSelector = (state: RootState) =>
  state.transactions.transactions;

export const transactionPhotosSelector = (state: RootState) =>
  state.transactions.transactionPhotos;

export const transactionCategoriesSelector = (state: RootState) =>
  state.transactions.transactionCategories;

export const isGettingTransactionsSelector = (state: RootState) =>
  state.transactions.isGettingTransactions;

export const isGettingTransactionPhotosSelector = (state: RootState) =>
  state.transactions.isGettingTransactionPhotos;

export const isGettingTransactionCategoriesSelector = (state: RootState) =>
  state.transactions.isGettingTransactionCategories;

export const isRefreshingTransactionsSelector = (state: RootState) =>
  state.transactions.isRefreshingTransactions;

export const isRefreshingTransactionCategoriesSelector = (state: RootState) =>
  state.transactions.isRefreshingTransactionCategories;

export const isLoadingTransactionsSelector = (state: RootState) =>
  state.transactions.isLoadingTransactions;

export const isLoadingTransactionCategoriesSelector = (state: RootState) =>
  state.transactions.isLoadingTransactionCategories;
