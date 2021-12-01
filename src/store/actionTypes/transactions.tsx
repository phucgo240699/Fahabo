//
// Transactions
//

import {PhotoType} from '@constants/types/albums';
import {
  CreateTransactionCategoryRequestType,
  CreateTransactionRequestType,
  DeleteTransactionCategoryRequestType,
  DeleteTransactionRequestType,
  GetTransactionCategoriesRequestType,
  GetTransactionDetailRequestType,
  GetTransactionPhotosRequestType,
  GetTransactionsRequestType,
  TransactionCategoryType,
  TransactionType,
  UpdateTransactionRequestType,
} from '@constants/types/transactions';

// Create
export const CREATE_TRANSACTION_REQUEST = 'CREATE_TRANSACTION_REQUEST';
export const createTransactionRequestAction = (
  body: CreateTransactionRequestType,
) => ({
  type: CREATE_TRANSACTION_REQUEST,
  body,
});
export const CREATE_TRANSACTION_SUCCESS = 'CREATE_TRANSACTION_SUCCESS';
export const createTransactionSuccessAction = (payload: TransactionType) => ({
  type: CREATE_TRANSACTION_SUCCESS,
  payload,
});

// Update
export const UPDATE_TRANSACTION_REQUEST = 'UPDATE_TRANSACTION_REQUEST';
export const updateTransactionRequestAction = (
  body: UpdateTransactionRequestType,
) => ({
  type: UPDATE_TRANSACTION_REQUEST,
  body,
});
export const UPDATE_TRANSACTION_SUCCESS = 'UPDATE_TRANSACTION_SUCCESS';
export const updateTransactionSuccessAction = (payload: TransactionType) => ({
  type: UPDATE_TRANSACTION_SUCCESS,
  payload,
});

// Delete
export const DELETE_TRANSACTION_REQUEST = 'DELETE_TRANSACTION_REQUEST';
export const deleteTransactionRequestAction = (
  body: DeleteTransactionRequestType,
) => ({
  type: DELETE_TRANSACTION_REQUEST,
  body,
});
export const DELETE_TRANSACTION_SUCCESS = 'DELETE_TRANSACTION_SUCCESS';
export const deleteTransactionSuccessAction = (payload: TransactionType) => ({
  type: DELETE_TRANSACTION_SUCCESS,
  payload,
});

// Get All
export const GET_TRANSACTIONS_REQUEST = 'GET_TRANSACTIONS_REQUEST';
export const getTransactionsRequestAction = (
  body: GetTransactionsRequestType,
) => ({
  type: GET_TRANSACTIONS_REQUEST,
  body,
});
export const GET_TRANSACTIONS_SUCCESS = 'GET_TRANSACTIONS_SUCCESS';
export const getTransactionsSuccessAction = (payload: TransactionType[]) => ({
  type: GET_TRANSACTIONS_SUCCESS,
  payload,
});

// Get Detail
export const GET_TRANSACTION_DETAIL_REQUEST = 'GET_TRANSACTION_DETAIL_REQUEST';
export const getTransactionDetailRequestAction = (
  body: GetTransactionDetailRequestType,
) => ({
  type: GET_TRANSACTION_DETAIL_REQUEST,
  body,
});
export const GET_TRANSACTION_DETAIL_SUCCESS = 'GET_TRANSACTION_DETAIL_SUCCESS';
export const getTransactionDetailSuccessAction = (
  payload: TransactionType,
) => ({
  type: GET_TRANSACTION_DETAIL_SUCCESS,
  payload,
});

// Get Photos
export const GET_TRANSACTION_PHOTOS_REQUEST = 'GET_TRANSACTION_PHOTOS_REQUEST';
export const getTransactionPhotosRequestAction = (
  body: GetTransactionPhotosRequestType,
) => ({
  type: GET_TRANSACTION_PHOTOS_REQUEST,
  body,
});
export const GET_TRANSACTION_PHOTOS_SUCCESS = 'GET_TRANSACTION_PHOTOS_SUCCESS';
export const getTransactionPhotosSuccessAction = (payload: PhotoType[]) => ({
  type: GET_TRANSACTION_PHOTOS_SUCCESS,
  payload,
});

// Session
export const UPDATE_IS_GETTING_TRANSACTIONS = 'UPDATE_IS_GETTING_TRANSACTIONS';
export const updateIsGettingTransactionsAction = (payload: boolean) => ({
  type: UPDATE_IS_GETTING_TRANSACTIONS,
  payload,
});
export const UPDATE_IS_REFRESHING_TRANSACTIONS =
  'UPDATE_IS_REFRESHING_TRANSACTIONS';
export const updateIsRefreshingTransactionsAction = (payload: boolean) => ({
  type: UPDATE_IS_REFRESHING_TRANSACTIONS,
  payload,
});
export const UPDATE_IS_LOADING_TRANSACTIONS = 'UPDATE_IS_LOADING_TRANSACTIONS';
export const updateIsLoadingTransactionsAction = (payload: boolean) => ({
  type: UPDATE_IS_LOADING_TRANSACTIONS,
  payload,
});
export const UPDATE_IS_GETTING_TRANSACTION_PHOTOS =
  'UPDATE_IS_GETTING_TRANSACTION_PHOTOS';
export const updateIsGettingTransactionPhotosAction = (payload: boolean) => ({
  type: UPDATE_IS_GETTING_TRANSACTION_PHOTOS,
  payload,
});

//
// Category
//

// Create
export const CREATE_TRANSACTION_CATEGORY_REQUEST =
  'CREATE_TRANSACTION_CATEGORY_REQUEST';
export const createTransactionCategoryRequestAction = (
  body: CreateTransactionCategoryRequestType,
) => ({
  type: CREATE_TRANSACTION_CATEGORY_REQUEST,
  body,
});
export const CREATE_TRANSACTION_EXPENSE_CATEGORY_SUCCESS =
  'CREATE_TRANSACTION_EXPENSE_CATEGORY_SUCCESS';
export const createTransactionExpenseCategorySuccessAction = (
  payload: TransactionCategoryType,
) => ({
  type: CREATE_TRANSACTION_EXPENSE_CATEGORY_SUCCESS,
  payload,
});
export const CREATE_TRANSACTION_INCOME_CATEGORY_SUCCESS =
  'CREATE_TRANSACTION_INCOME_CATEGORY_SUCCESS';
export const createTransactionIncomeCategorySuccessAction = (
  payload: TransactionCategoryType,
) => ({
  type: CREATE_TRANSACTION_INCOME_CATEGORY_SUCCESS,
  payload,
});

// Get All
export const GET_TRANSACTION_CATEGORIES_REQUEST =
  'GET_TRANSACTION_CATEGORIES_REQUEST';
export const getTransactionCategoriesRequestAction = (
  body: GetTransactionCategoriesRequestType,
) => ({
  type: GET_TRANSACTION_CATEGORIES_REQUEST,
  body,
});
export const GET_TRANSACTION_EXPENSE_CATEGORIES_SUCCESS =
  'GET_TRANSACTION_EXPENSE_CATEGORIES_SUCCESS';
export const getTransactionExpenseCategoriesSuccessAction = (
  payload: TransactionCategoryType[],
) => ({
  type: GET_TRANSACTION_EXPENSE_CATEGORIES_SUCCESS,
  payload,
});
export const GET_TRANSACTION_INCOME_CATEGORIES_SUCCESS =
  'GET_TRANSACTION_INCOME_CATEGORIES_SUCCESS';
export const getTransactionIncomeCategoriesSuccessAction = (
  payload: TransactionCategoryType[],
) => ({
  type: GET_TRANSACTION_INCOME_CATEGORIES_SUCCESS,
  payload,
});

// Delete
export const DELETE_TRANSACTION_CATEGORY_REQUEST =
  'DELETE_TRANSACTION_CATEGORY_REQUEST';
export const deleteTransactionCategoryRequestAction = (
  body: DeleteTransactionCategoryRequestType,
) => ({
  type: DELETE_TRANSACTION_CATEGORY_REQUEST,
  body,
});
export const DELETE_TRANSACTION_EXPENSE_CATEGORY_SUCCESS =
  'DELETE_TRANSACTION_EXPENSE_CATEGORY_SUCCESS';
export const deleteTransactionExpenseCategorySuccessAction = (
  payload: TransactionCategoryType,
) => ({
  type: DELETE_TRANSACTION_EXPENSE_CATEGORY_SUCCESS,
  payload,
});
export const DELETE_TRANSACTION_INCOME_CATEGORY_SUCCESS =
  'DELETE_TRANSACTION_INCOME_CATEGORY_SUCCESS';
export const deleteTransactionIncomeCategorySuccessAction = (
  payload: TransactionCategoryType,
) => ({
  type: DELETE_TRANSACTION_INCOME_CATEGORY_SUCCESS,
  payload,
});

// Session
export const UPDATE_IS_GETTING_TRANSACTION_EXPENSE_CATEGORIES =
  'UPDATE_IS_GETTING_TRANSACTION_EXPENSE_CATEGORIES';
export const updateIsGettingTransactionExpenseCategoriesAction = (
  payload: boolean,
) => ({
  type: UPDATE_IS_GETTING_TRANSACTION_EXPENSE_CATEGORIES,
  payload,
});
export const UPDATE_IS_GETTING_TRANSACTION_INCOME_CATEGORIES =
  'UPDATE_IS_GETTING_TRANSACTION_INCOME_CATEGORIES';
export const updateIsGettingTransactionIncomeCategoriesAction = (
  payload: boolean,
) => ({
  type: UPDATE_IS_GETTING_TRANSACTION_INCOME_CATEGORIES,
  payload,
});
export const UPDATE_IS_REFRESHING_TRANSACTION_EXPENSE_CATEGORIES =
  'UPDATE_IS_REFRESHING_TRANSACTION_EXPENSE_CATEGORIES';
export const updateIsRefreshingTransactionExpenseCategoriesAction = (
  payload: boolean,
) => ({
  type: UPDATE_IS_REFRESHING_TRANSACTION_EXPENSE_CATEGORIES,
  payload,
});
export const UPDATE_IS_REFRESHING_TRANSACTION_INCOME_CATEGORIES =
  'UPDATE_IS_REFRESHING_TRANSACTION_INCOME_CATEGORIES';
export const updateIsRefreshingTransactionIncomeCategoriesAction = (
  payload: boolean,
) => ({
  type: UPDATE_IS_REFRESHING_TRANSACTION_INCOME_CATEGORIES,
  payload,
});
export const UPDATE_IS_LOADING_TRANSACTION_EXPENSE_CATEGORIES =
  'UPDATE_IS_LOADING_TRANSACTION_EXPENSE_CATEGORIES';
export const updateIsLoadingTransactionExpenseCategoriesAction = (
  payload: boolean,
) => ({
  type: UPDATE_IS_LOADING_TRANSACTION_EXPENSE_CATEGORIES,
  payload,
});
export const UPDATE_IS_LOADING_TRANSACTION_INCOME_CATEGORIES =
  'UPDATE_IS_LOADING_TRANSACTION_INCOME_CATEGORIES';
export const updateIsLoadingTransactionIncomeCategoriesAction = (
  payload: boolean,
) => ({
  type: UPDATE_IS_LOADING_TRANSACTION_INCOME_CATEGORIES,
  payload,
});
