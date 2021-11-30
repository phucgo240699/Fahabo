import {isNull} from '@utils/index';
import {apiProvider} from './apiProvider';
import {BASE_URL, Pagination} from '@constants/Constants';
import {
  CreateTransactionCategoryRequestType,
  CreateTransactionRequestType,
  DeleteTransactionRequestType,
  GetTransactionCategoriesRequestType,
  GetTransactionDetailRequestType,
  GetTransactionPhotosRequestType,
  GetTransactionsRequestType,
  UpdateTransactionRequestType,
} from '@constants/types/transactions';

export function createTransactionApi(
  accessToken?: string,
  body?: CreateTransactionRequestType,
) {
  return new apiProvider(accessToken).post(
    `${BASE_URL}/transactions/create`,
    body,
  );
}

export function updateTransactionApi(
  accessToken?: string,
  body?: UpdateTransactionRequestType,
) {
  return new apiProvider(accessToken).post(
    `${BASE_URL}/transactions/update`,
    body,
  );
}
export function deleteTransactionApi(
  accessToken?: string,
  body?: DeleteTransactionRequestType,
) {
  return new apiProvider(accessToken).post(
    `${BASE_URL}/transactions/delete`,
    body,
  );
}
export function getTransactionsApi(
  accessToken?: string,
  body?: GetTransactionsRequestType,
) {
  let page = 0;
  let size = Pagination.Transactions;
  if (!isNull(body)) {
    if (!isNull(body?.page)) {
      page = body?.page ?? 0;
    }
    if (!isNull(body?.size)) {
      size = body?.size ?? Pagination.Transactions;
    }
  }
  return new apiProvider(accessToken).post(
    `${BASE_URL}/transactions?page=${page}&size=${size}`,
    body,
  );
}

export function getTransactionPhotosApi(
  accessToken?: string,
  body?: GetTransactionPhotosRequestType,
) {
  let page = 0;
  let size = Pagination.TransactionPhotos;
  if (!isNull(body)) {
    if (!isNull(body?.page)) {
      page = body?.page ?? 0;
    }
    if (!isNull(body?.size)) {
      size = body?.size ?? Pagination.TransactionPhotos;
    }
  }
  return new apiProvider(accessToken).post(
    `${BASE_URL}/transactions/photos?page=${page}&size=${size}`,
    body,
  );
}

export function getTransactionDetailApi(
  accessToken?: string,
  body?: GetTransactionDetailRequestType,
) {
  return new apiProvider(accessToken).post(
    `${BASE_URL}/transactions/detail`,
    body,
  );
}

export function createTransactionCategoryApi(
  accessToken?: string,
  body?: CreateTransactionCategoryRequestType,
) {
  return new apiProvider(accessToken).post(
    `${BASE_URL}/transaction_category/create`,
    body,
  );
}

export function getTransactionCategoriesApi(
  accessToken?: string,
  body?: GetTransactionCategoriesRequestType,
) {
  let page = 0;
  let size = Pagination.TransactionCategories;
  if (!isNull(body)) {
    if (!isNull(body?.page)) {
      page = body?.page ?? 0;
    }
    if (!isNull(body?.size)) {
      size = body?.size ?? Pagination.TransactionCategories;
    }
  }
  return new apiProvider(accessToken).post(
    `${BASE_URL}/transaction_category?page=${page}&size=${size}`,
    body,
  );
}
