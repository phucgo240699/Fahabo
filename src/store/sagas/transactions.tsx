import {ToastType} from '@constants/types/session';
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
import i18n from '@locales/index';
import {
  createTransactionApi,
  createTransactionCategoryApi,
  deleteTransactionApi,
  getTransactionCategoriesApi,
  getTransactionDetailApi,
  getTransactionPhotosApi,
  getTransactionsApi,
  updateTransactionApi,
} from '@services/transactions';
import {
  closeHUDAction,
  showHUDAction,
  showToastAction,
} from '@store/actionTypes/session';
import {
  createTransactionCategorySuccessAction,
  createTransactionSuccessAction,
  CREATE_TRANSACTION_CATEGORY_REQUEST,
  CREATE_TRANSACTION_REQUEST,
  deleteTransactionSuccessAction,
  DELETE_TRANSACTION_REQUEST,
  getTransactionCategoriesSuccessAction,
  getTransactionDetailSuccessAction,
  getTransactionPhotosSuccessAction,
  getTransactionsSuccessAction,
  GET_TRANSACTIONS_REQUEST,
  GET_TRANSACTION_CATEGORIES_REQUEST,
  GET_TRANSACTION_DETAIL_REQUEST,
  GET_TRANSACTION_PHOTOS_REQUEST,
  updateIsGettingTransactionCategoriesAction,
  updateIsGettingTransactionPhotosAction,
  updateIsGettingTransactionsAction,
  updateIsLoadingTransactionCategoriesAction,
  updateIsLoadingTransactionsAction,
  updateIsRefreshingTransactionCategoriesAction,
  updateIsRefreshingTransactionsAction,
  updateTransactionSuccessAction,
  UPDATE_TRANSACTION_REQUEST,
} from '@store/actionTypes/transactions';
import {
  transactionCategoriesSelector,
  transactionPhotosSelector,
  transactionsSelector,
} from '@store/selectors/transactions';
import {mixPhotos} from '@utils/albums';
import {parseDataResponse, parseErrorResponse} from '@utils/parsers';
import {parsePhotos} from '@utils/parsers/albums';
import {
  parseTransaction,
  parseTransactionCategories,
  parseTransactionCategory,
  parseTransactionDetail,
  parseTransactions,
} from '@utils/parsers/transactions';
import {mixTransactionCategories, mixTransactions} from '@utils/transactions';
import {all, put, takeLeading, select} from 'typed-redux-saga';
import {apiProxy} from './apiProxy';

function* createTransactionSaga({
  body,
}: {
  type: string;
  body: CreateTransactionRequestType;
}) {
  try {
    yield* put(showHUDAction());
    const response = yield* apiProxy(createTransactionApi, body);
    if (response.status === 200) {
      yield* put(
        createTransactionSuccessAction(
          parseTransaction(parseDataResponse(response)),
        ),
      );
    } else {
      yield* put(
        showToastAction(
          i18n.t(`backend.${parseErrorResponse(response)}`),
          ToastType.ERROR,
        ),
      );
    }
  } catch (error) {
    yield* put(
      showToastAction(i18n.t('errorMessage.general'), ToastType.ERROR),
    );
  } finally {
    yield* put(closeHUDAction());
  }
}

function* updateTransactionSaga({
  body,
}: {
  type: string;
  body: UpdateTransactionRequestType;
}) {
  try {
    yield* put(showHUDAction());
    const response = yield* apiProxy(updateTransactionApi, body);
    if (response.status === 200) {
      yield* put(
        updateTransactionSuccessAction(
          parseTransaction(parseDataResponse(response)),
        ),
      );
    } else {
      yield* put(
        showToastAction(
          i18n.t(`backend.${parseErrorResponse(response)}`),
          ToastType.ERROR,
        ),
      );
    }
  } catch (error) {
    yield* put(
      showToastAction(i18n.t('errorMessage.general'), ToastType.ERROR),
    );
  } finally {
    yield* put(closeHUDAction());
  }
}

function* deleteTransactionSaga({
  body,
}: {
  type: string;
  body: DeleteTransactionRequestType;
}) {
  try {
    yield* put(showHUDAction());
    const response = yield* apiProxy(deleteTransactionApi, body);
    if (response.status === 200) {
      yield* put(
        deleteTransactionSuccessAction(
          parseTransaction(parseDataResponse(response)),
        ),
      );
    } else {
      yield* put(
        showToastAction(
          i18n.t(`backend.${parseErrorResponse(response)}`),
          ToastType.ERROR,
        ),
      );
    }
  } catch (error) {
    yield* put(
      showToastAction(i18n.t('errorMessage.general'), ToastType.ERROR),
    );
  } finally {
    yield* put(closeHUDAction());
  }
}

function* getTransactionsSaga({
  body,
}: {
  type: string;
  body: GetTransactionsRequestType;
}) {
  try {
    if (body.showHUD) {
      yield* put(showHUDAction());
    }
    if (body.getting) {
      yield* put(updateIsGettingTransactionsAction(true));
    }
    if (body.refresh) {
      yield* put(updateIsRefreshingTransactionsAction(true));
    }
    if (body.getting) {
      yield* put(updateIsLoadingTransactionsAction(true));
    }
    const response = yield* apiProxy(getTransactionsApi, body);
    if (response.status === 200) {
      if (body.page && body.page > 0) {
        const newData = parseTransactions(parseDataResponse(response));
        if (newData.length > 0) {
          const oldData = yield* select(transactionsSelector);
          yield* put(
            getTransactionsSuccessAction(mixTransactions(oldData, newData)),
          );
        }
      } else {
        yield* put(
          getTransactionsSuccessAction(
            parseTransactions(parseDataResponse(response)),
          ),
        );
      }
    } else {
      yield* put(
        showToastAction(
          i18n.t(`backend.${parseErrorResponse(response)}`),
          ToastType.ERROR,
        ),
      );
    }
  } catch (error) {
    yield* put(
      showToastAction(i18n.t('errorMessage.general'), ToastType.ERROR),
    );
  } finally {
    if (body.showHUD) {
      yield* put(showHUDAction());
    }
    if (body.getting) {
      yield* put(updateIsGettingTransactionsAction(false));
    }
    if (body.refresh) {
      yield* put(updateIsRefreshingTransactionsAction(false));
    }
    if (body.getting) {
      yield* put(updateIsLoadingTransactionsAction(false));
    }
  }
}

function* getTransactionDetailSaga({
  body,
}: {
  type: string;
  body: GetTransactionDetailRequestType;
}) {
  try {
    yield* put(showHUDAction());
    const response = yield* apiProxy(getTransactionDetailApi, body);
    if (response.status === 200) {
      yield* put(
        getTransactionDetailSuccessAction(
          parseTransactionDetail(parseDataResponse(response)),
        ),
      );
    } else {
      yield* put(
        showToastAction(
          i18n.t(`backend.${parseErrorResponse(response)}`),
          ToastType.ERROR,
        ),
      );
    }
  } catch (error) {
    yield* put(
      showToastAction(i18n.t('errorMessage.general'), ToastType.ERROR),
    );
  } finally {
    yield* put(closeHUDAction());
  }
}

function* getTransactionPhotosSaga({
  body,
}: {
  type: string;
  body: GetTransactionPhotosRequestType;
}) {
  try {
    if (body.showHUD) {
      yield* put(showHUDAction());
    }
    if (body.getting) {
      yield* put(updateIsGettingTransactionPhotosAction(true));
    }
    const response = yield* apiProxy(getTransactionPhotosApi, body);
    if (response.status === 200) {
      if (body.page && body.page > 0) {
        const newData = parsePhotos(parseDataResponse(response));
        if (newData.length > 0) {
          const oldData = yield* select(transactionPhotosSelector);
          yield* put(
            getTransactionPhotosSuccessAction(mixPhotos(oldData, newData)),
          );
        }
      } else {
        yield* put(
          getTransactionPhotosSuccessAction(
            parsePhotos(parseDataResponse(response)),
          ),
        );
      }
    } else {
      yield* put(
        showToastAction(
          i18n.t(`backend.${parseErrorResponse(response)}`),
          ToastType.ERROR,
        ),
      );
    }
  } catch (error) {
    yield* put(
      showToastAction(i18n.t('errorMessage.general'), ToastType.ERROR),
    );
  } finally {
    if (body.showHUD) {
      yield* put(showHUDAction());
    }
    if (body.getting) {
      yield* put(updateIsGettingTransactionPhotosAction(false));
    }
  }
}

function* createTransactionCategorySaga({
  body,
}: {
  type: string;
  body: CreateTransactionCategoryRequestType;
}) {
  try {
    yield* put(showHUDAction());
    const response = yield* apiProxy(createTransactionCategoryApi, body);
    if (response.status === 200) {
      yield* put(
        createTransactionCategorySuccessAction(
          parseTransactionCategory(parseDataResponse(response)),
        ),
      );
    } else {
      yield* put(
        showToastAction(
          i18n.t(`backend.${parseErrorResponse(response)}`),
          ToastType.ERROR,
        ),
      );
    }
  } catch (error) {
    yield* put(
      showToastAction(i18n.t('errorMessage.general'), ToastType.ERROR),
    );
  } finally {
    yield* put(closeHUDAction());
  }
}

function* getTransactionCategoriesSaga({
  body,
}: {
  type: string;
  body: GetTransactionCategoriesRequestType;
}) {
  try {
    if (body.showHUD) {
      yield* put(showHUDAction());
    }
    if (body.getting) {
      yield* put(updateIsGettingTransactionCategoriesAction(true));
    }
    if (body.refresh) {
      yield* put(updateIsRefreshingTransactionCategoriesAction(true));
    }
    if (body.getting) {
      yield* put(updateIsLoadingTransactionCategoriesAction(true));
    }

    const response = yield* apiProxy(getTransactionCategoriesApi, body);
    if (response.status === 200) {
      if (body.page && body.page > 0) {
        const newData = parseTransactionCategories(parseDataResponse(response));
        if (newData.length > 0) {
          const oldData = yield* select(transactionCategoriesSelector);
          yield* put(
            getTransactionCategoriesSuccessAction(
              mixTransactionCategories(oldData, newData),
            ),
          );
        }
      } else {
        yield* put(
          getTransactionCategoriesSuccessAction(
            parseTransactionCategories(parseDataResponse(response)),
          ),
        );
      }
    } else {
      yield* put(
        showToastAction(
          i18n.t(`backend.${parseErrorResponse(response)}`),
          ToastType.ERROR,
        ),
      );
    }
  } catch (error) {
    yield* put(
      showToastAction(i18n.t('errorMessage.general'), ToastType.ERROR),
    );
  } finally {
    if (body.showHUD) {
      yield* put(closeHUDAction());
    }
    if (body.getting) {
      yield* put(updateIsGettingTransactionCategoriesAction(false));
    }
    if (body.refresh) {
      yield* put(updateIsRefreshingTransactionCategoriesAction(false));
    }
    if (body.getting) {
      yield* put(updateIsLoadingTransactionCategoriesAction(false));
    }
  }
}

export default function* () {
  yield* all([
    takeLeading(CREATE_TRANSACTION_REQUEST, createTransactionSaga),
    takeLeading(UPDATE_TRANSACTION_REQUEST, updateTransactionSaga),
    takeLeading(DELETE_TRANSACTION_REQUEST, deleteTransactionSaga),
    takeLeading(GET_TRANSACTIONS_REQUEST, getTransactionsSaga),
    takeLeading(GET_TRANSACTION_DETAIL_REQUEST, getTransactionDetailSaga),
    takeLeading(GET_TRANSACTION_PHOTOS_REQUEST, getTransactionPhotosSaga),
    takeLeading(
      CREATE_TRANSACTION_CATEGORY_REQUEST,
      createTransactionCategorySaga,
    ),
    takeLeading(
      GET_TRANSACTION_CATEGORIES_REQUEST,
      getTransactionCategoriesSaga,
    ),
  ]);
}
