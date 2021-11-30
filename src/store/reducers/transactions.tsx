import {PhotoType} from '@constants/types/albums';
import {
  TransactionCategoryType,
  TransactionDetailType,
  TransactionType,
} from '@constants/types/transactions';
import {LOG_OUT} from '@store/actionTypes/signIn';
import {
  CREATE_TRANSACTION_CATEGORY_SUCCESS,
  CREATE_TRANSACTION_SUCCESS,
  DELETE_TRANSACTION_SUCCESS,
  GET_TRANSACTIONS_SUCCESS,
  GET_TRANSACTION_CATEGORIES_SUCCESS,
  GET_TRANSACTION_DETAIL_SUCCESS,
  GET_TRANSACTION_PHOTOS_SUCCESS,
  UPDATE_IS_GETTING_TRANSACTIONS,
  UPDATE_IS_GETTING_TRANSACTION_CATEGORIES,
  UPDATE_IS_GETTING_TRANSACTION_PHOTOS,
  UPDATE_IS_LOADING_TRANSACTIONS,
  UPDATE_IS_LOADING_TRANSACTION_CATEGORIES,
  UPDATE_IS_REFRESHING_TRANSACTIONS,
  UPDATE_IS_REFRESHING_TRANSACTION_CATEGORIES,
  UPDATE_TRANSACTION_SUCCESS,
} from '@store/actionTypes/transactions';
import {AnyAction} from 'redux';

export type TransactionsState = {
  transactions: TransactionType[];
  transactionPhotos: PhotoType[];
  transactionDetail?: TransactionDetailType;
  transactionCategories: TransactionCategoryType[];

  // Getting
  isGettingTransactions: boolean;
  isGettingTransactionPhotos: boolean;
  isGettingTransactionCategories: boolean;

  // Refreshing
  isRefreshingTransactions: boolean;
  isRefreshingTransactionCategories: boolean;

  // Load more
  isLoadingTransactions: boolean;
  isLoadingTransactionCategories: boolean;
};

const defaultState: TransactionsState = {
  transactions: [],
  transactionPhotos: [],
  transactionDetail: undefined,
  transactionCategories: [],
  isGettingTransactions: false,
  isGettingTransactionPhotos: false,
  isGettingTransactionCategories: false,
  isRefreshingTransactions: false,
  isRefreshingTransactionCategories: false,
  isLoadingTransactions: false,
  isLoadingTransactionCategories: false,
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
    case CREATE_TRANSACTION_CATEGORY_SUCCESS:
      return {
        ...state,
        transactionCategories: [action.payload, ...state.transactionCategories],
      };
    case GET_TRANSACTION_CATEGORIES_SUCCESS:
      return {
        ...state,
        transactionCategories: action.payload,
      };

    // Category Session
    case UPDATE_IS_GETTING_TRANSACTION_CATEGORIES:
      return {
        ...state,
        isGettingTransactionCategories: action.payload,
      };
    case UPDATE_IS_REFRESHING_TRANSACTION_CATEGORIES:
      return {
        ...state,
        isRefreshingTransactionCategories: action.payload,
      };
    case UPDATE_IS_LOADING_TRANSACTION_CATEGORIES:
      return {
        ...state,
        isLoadingTransactionCategories: action.payload,
      };
    case LOG_OUT:
      return {
        ...state,
        transactions: [],
        transactionPhotos: [],
        transactionDetail: undefined,
        transactionCategories: [],
        isGettingTransactions: false,
        isGettingTransactionPhotos: false,
        isGettingTransactionCategories: false,
        isRefreshingTransactions: false,
        isRefreshingTransactionCategories: false,
        isLoadingTransactions: false,
        isLoadingTransactionCategories: false,
      };

    default:
      return state;
  }
}
