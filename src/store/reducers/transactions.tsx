import {PhotoType} from '@constants/types/albums';
import {
  TransactionCategoryType,
  TransactionType,
} from '@constants/types/transactions';
import {LOG_OUT} from '@store/actionTypes/signIn';
import {
  CREATE_TRANSACTION_EXPENSE_CATEGORY_SUCCESS,
  CREATE_TRANSACTION_INCOME_CATEGORY_SUCCESS,
  CREATE_TRANSACTION_SUCCESS,
  DELETE_TRANSACTION_EXPENSE_CATEGORY_SUCCESS,
  DELETE_TRANSACTION_INCOME_CATEGORY_SUCCESS,
  DELETE_TRANSACTION_SUCCESS,
  GET_TRANSACTIONS_SUCCESS,
  GET_TRANSACTION_DETAIL_SUCCESS,
  GET_TRANSACTION_EXPENSE_CATEGORIES_SUCCESS,
  GET_TRANSACTION_INCOME_CATEGORIES_SUCCESS,
  GET_TRANSACTION_PHOTOS_SUCCESS,
  UPDATE_IS_GETTING_TRANSACTIONS,
  UPDATE_IS_GETTING_TRANSACTION_EXPENSE_CATEGORIES,
  UPDATE_IS_GETTING_TRANSACTION_INCOME_CATEGORIES,
  UPDATE_IS_GETTING_TRANSACTION_PHOTOS,
  UPDATE_IS_LOADING_TRANSACTIONS,
  UPDATE_IS_LOADING_TRANSACTION_EXPENSE_CATEGORIES,
  UPDATE_IS_LOADING_TRANSACTION_INCOME_CATEGORIES,
  UPDATE_IS_REFRESHING_TRANSACTIONS,
  UPDATE_IS_REFRESHING_TRANSACTION_EXPENSE_CATEGORIES,
  UPDATE_IS_REFRESHING_TRANSACTION_INCOME_CATEGORIES,
  UPDATE_TRANSACTION_SUCCESS,
} from '@store/actionTypes/transactions';
import {AnyAction} from 'redux';

export type TransactionsState = {
  transactions: TransactionType[];
  transactionPhotos: PhotoType[];
  transactionDetail?: TransactionType;
  transactionExpenseCategories: TransactionCategoryType[];
  transactionIncomeCategories: TransactionCategoryType[];

  // Getting
  isGettingTransactions: boolean;
  isGettingTransactionPhotos: boolean;
  isGettingTransactionExpenseCategories: boolean;
  isGettingTransactionIncomeCategories: boolean;

  // Refreshing
  isRefreshingTransactions: boolean;
  isRefreshingTransactionExpenseCategories: boolean;
  isRefreshingTransactionIncomeCategories: boolean;

  // Load more
  isLoadingTransactions: boolean;
  isLoadingTransactionExpenseCategories: boolean;
  isLoadingTransactionIncomeCategories: boolean;
};

const defaultState: TransactionsState = {
  transactions: [],
  transactionPhotos: [],
  transactionDetail: undefined,
  transactionExpenseCategories: [],
  transactionIncomeCategories: [],
  isGettingTransactions: false,
  isGettingTransactionPhotos: false,
  isGettingTransactionExpenseCategories: false,
  isGettingTransactionIncomeCategories: false,
  isRefreshingTransactions: false,
  isRefreshingTransactionExpenseCategories: false,
  isRefreshingTransactionIncomeCategories: false,
  isLoadingTransactions: false,
  isLoadingTransactionExpenseCategories: false,
  isLoadingTransactionIncomeCategories: false,
};

export default function transactionsReducer(
  state = defaultState,
  action: AnyAction,
) {
  switch (action.type) {
    // Transaction CRUD
    case CREATE_TRANSACTION_SUCCESS:
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
    case UPDATE_TRANSACTION_SUCCESS:
      return {
        ...state,
        transactions: state.transactions.map(item => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        }),
      };
    case DELETE_TRANSACTION_SUCCESS:
      return {
        ...state,
        transactions: state.transactions.filter(item => {
          return item.id !== action.payload.id;
        }),
      };
    case GET_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        transactions: action.payload,
      };
    case GET_TRANSACTION_PHOTOS_SUCCESS:
      return {
        ...state,
        transactionPhotos: action.payload,
      };
    case GET_TRANSACTION_DETAIL_SUCCESS:
      return {
        ...state,
        transactionDetail: action.payload,
      };
    // Transaction Session
    case UPDATE_IS_GETTING_TRANSACTIONS:
      return {
        ...state,
        isGettingTransactions: action.payload,
      };
    case UPDATE_IS_REFRESHING_TRANSACTIONS:
      return {
        ...state,
        isRefreshingTransactions: action.payload,
      };
    case UPDATE_IS_LOADING_TRANSACTIONS:
      return {
        ...state,
        isLoadingTransactions: action.payload,
      };
    case UPDATE_IS_GETTING_TRANSACTION_PHOTOS:
      return {
        ...state,
        isGettingTransactionPhotos: action.payload,
      };

    // Category CRUD
    case CREATE_TRANSACTION_EXPENSE_CATEGORY_SUCCESS:
      return {
        ...state,
        transactionExpenseCategories: [
          action.payload,
          ...state.transactionExpenseCategories,
        ],
      };
    case CREATE_TRANSACTION_INCOME_CATEGORY_SUCCESS:
      return {
        ...state,
        transactionIncomeCategories: [
          action.payload,
          ...state.transactionIncomeCategories,
        ],
      };
    case GET_TRANSACTION_EXPENSE_CATEGORIES_SUCCESS:
      return {
        ...state,
        transactionExpenseCategories: action.payload,
      };
    case GET_TRANSACTION_INCOME_CATEGORIES_SUCCESS:
      return {
        ...state,
        transactionIncomeCategories: action.payload,
      };
    case DELETE_TRANSACTION_EXPENSE_CATEGORY_SUCCESS:
      return {
        ...state,
        transactionExpenseCategories: state.transactionExpenseCategories.filter(
          item => {
            return item.id !== action.payload.id;
          },
        ),
      };
    case DELETE_TRANSACTION_INCOME_CATEGORY_SUCCESS:
      return {
        ...state,
        transactionIncomeCategories: state.transactionIncomeCategories.filter(
          item => {
            return item.id !== action.payload.id;
          },
        ),
      };

    // Category Session
    case UPDATE_IS_GETTING_TRANSACTION_EXPENSE_CATEGORIES:
      return {
        ...state,
        isGettingTransactionExpenseCategories: action.payload,
      };

    case UPDATE_IS_GETTING_TRANSACTION_INCOME_CATEGORIES:
      return {
        ...state,
        isGettingTransactionIncomeCategories: action.payload,
      };
    case UPDATE_IS_REFRESHING_TRANSACTION_EXPENSE_CATEGORIES:
      return {
        ...state,
        isRefreshingTransactionExpenseCategories: action.payload,
      };
    case UPDATE_IS_REFRESHING_TRANSACTION_INCOME_CATEGORIES:
      return {
        ...state,
        isRefreshingTransactionIncomeCategories: action.payload,
      };
    case UPDATE_IS_LOADING_TRANSACTION_EXPENSE_CATEGORIES:
      return {
        ...state,
        isLoadingTransactionExpenseCategories: action.payload,
      };
    case UPDATE_IS_LOADING_TRANSACTION_INCOME_CATEGORIES:
      return {
        ...state,
        isLoadingTransactionIncomeCategories: action.payload,
      };
    case LOG_OUT:
      return {
        ...state,
        transactions: [],
        transactionPhotos: [],
        transactionDetail: undefined,
        transactionExpenseCategories: [],
        transactionIncomeCategories: [],
        isGettingTransactions: false,
        isGettingTransactionPhotos: false,
        isGettingTransactionExpenseCategories: false,
        isGettingTransactionIncomeCategories: false,
        isRefreshingTransactions: false,
        isRefreshingTransactionExpenseCategories: false,
        isRefreshingTransactionIncomeCategories: false,
        isLoadingTransactions: false,
        isLoadingTransactionExpenseCategories: false,
        isLoadingTransactionIncomeCategories: false,
      };

    default:
      return state;
  }
}
