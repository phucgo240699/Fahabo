import {ToastType} from '@constants/types/session';
import {
  CreateTransactionCategoryRequestType,
  CreateTransactionRequestType,
  DeleteTransactionCategoryRequestType,
  DeleteTransactionRequestType,
  GetTransactionCategoriesRequestType,
  GetTransactionDetailRequestType,
  GetTransactionPhotosRequestType,
  GetTransactionsRequestType,
  GetTransactionStatisticRequestType,
  TransactionCategorySegment,
  UpdateTransactionRequestType,
} from '@constants/types/transactions';
import i18n from '@locales/index';
import {navigationRef, push} from '@navigators/index';
import {
  createTransactionApi,
  createTransactionCategoryApi,
  deleteTransactionApi,
  deleteTransactionCategoryApi,
  getTransactionCategoriesApi,
  getTransactionDetailApi,
  getTransactionPhotosApi,
  getTransactionsApi,
  getTransactionStatisticsApi,
  updateTransactionApi,
} from '@services/transactions';
import {
  closeHUDAction,
  showHUDAction,
  showToastAction,
} from '@store/actionTypes/session';
import {
  createTransactionExpenseCategorySuccessAction,
  createTransactionIncomeCategorySuccessAction,
  createTransactionSuccessAction,
  CREATE_TRANSACTION_CATEGORY_REQUEST,
  CREATE_TRANSACTION_REQUEST,
  deleteTransactionExpenseCategorySuccessAction,
  deleteTransactionIncomeCategorySuccessAction,
  deleteTransactionSuccessAction,
  DELETE_TRANSACTION_CATEGORY_REQUEST,
  DELETE_TRANSACTION_REQUEST,
  getExpenseTransactionStatisticsSuccessAction,
  getIncomeTransactionStatisticsSuccessAction,
  getTotalExpenseTransactionSuccessAction,
  getTotalIncomeTransactionSuccessAction,
  getTransactionDetailSuccessAction,
  getTransactionExpenseCategoriesSuccessAction,
  getTransactionIncomeCategoriesSuccessAction,
  getTransactionPhotosSuccessAction,
  getTransactionsSuccessAction,
  getTransactionStatisticsRequestAction,
  GET_TRANSACTIONS_REQUEST,
  GET_TRANSACTION_CATEGORIES_REQUEST,
  GET_TRANSACTION_DETAIL_REQUEST,
  GET_TRANSACTION_PHOTOS_REQUEST,
  GET_TRANSACTION_STATISTICS_REQUEST,
  updateIsGettingExpenseTransactionStatisticsAction,
  updateIsGettingIncomeTransactionStatisticsAction,
  updateIsGettingTransactionExpenseCategoriesAction,
  updateIsGettingTransactionIncomeCategoriesAction,
  updateIsGettingTransactionPhotosAction,
  updateIsGettingTransactionsAction,
  updateIsLoadingTransactionExpenseCategoriesAction,
  updateIsLoadingTransactionIncomeCategoriesAction,
  updateIsLoadingTransactionsAction,
  updateIsRefreshingTransactionExpenseCategoriesAction,
  updateIsRefreshingTransactionIncomeCategoriesAction,
  updateIsRefreshingTransactionsAction,
  updateTransactionSuccessAction,
  UPDATE_TRANSACTION_REQUEST,
} from '@store/actionTypes/transactions';
import {
  transactionExpenseCategoriesSelector,
  transactionIncomeCategoriesSelector,
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
  parseTransactions,
  parseTransactionStatistics,
} from '@utils/parsers/transactions';
import {mixTransactionCategories, mixTransactions} from '@utils/transactions';
import {
  all,
  put,
  takeLeading,
  select,
  takeLatest,
  take,
  takeEvery,
} from 'typed-redux-saga';
import {apiProxy} from './apiProxy';
import {CommonActions} from '@react-navigation/native';
import {ScreenName} from '@constants/Constants';
import {isNull} from '@utils/index';
import {focusFamilySelector} from '@store/selectors/family';

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
      const focusFamily = yield* select(focusFamilySelector);
      const dateComponents = body.date?.split('-') ?? [];
      yield* all([
        put(
          getTransactionStatisticsRequestAction({
            familyId: focusFamily?.id,
            month: parseInt(dateComponents[1]),
            year: parseInt(dateComponents[2]),
            type: TransactionCategorySegment.EXPENSE,
          }),
        ),
        put(
          getTransactionStatisticsRequestAction({
            familyId: focusFamily?.id,
            month: parseInt(dateComponents[1]),
            year: parseInt(dateComponents[2]),
            type: TransactionCategorySegment.INCOME,
          }),
        ),
        put(
          createTransactionSuccessAction(
            parseTransaction(parseDataResponse(response)),
          ),
        ),
      ]);
      // yield* put(
      //   createTransactionSuccessAction(
      //     parseTransaction(parseDataResponse(response)),
      //   ),
      // );
      navigationRef.current?.dispatch(CommonActions.goBack());
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
      const focusFamily = yield* select(focusFamilySelector);
      const dateComponents = body.date?.split('-') ?? [];
      yield* all([
        put(
          getTransactionStatisticsRequestAction({
            familyId: focusFamily?.id,
            month: parseInt(dateComponents[1]),
            year: parseInt(dateComponents[2]),
            type: TransactionCategorySegment.EXPENSE,
          }),
        ),
        put(
          getTransactionStatisticsRequestAction({
            familyId: focusFamily?.id,
            month: parseInt(dateComponents[1]),
            year: parseInt(dateComponents[2]),
            type: TransactionCategorySegment.INCOME,
          }),
        ),
        put(
          updateTransactionSuccessAction(
            parseTransaction(parseDataResponse(response)),
          ),
        ),
      ]);
      // yield* put(
      //   updateTransactionSuccessAction(
      //     parseTransaction(parseDataResponse(response)),
      //   ),
      // );
      navigationRef.current?.dispatch(CommonActions.goBack());
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
      const focusFamily = yield* select(focusFamilySelector);
      yield* all([
        put(
          getTransactionStatisticsRequestAction({
            familyId: focusFamily?.id,
            month: body.month,
            year: body.year,
            type: TransactionCategorySegment.EXPENSE,
          }),
        ),
        put(
          getTransactionStatisticsRequestAction({
            familyId: focusFamily?.id,
            month: body.month,
            year: body.year,
            type: TransactionCategorySegment.INCOME,
          }),
        ),
        put(
          deleteTransactionSuccessAction(
            parseTransaction(parseDataResponse(response)),
          ),
        ),
      ]);
      // yield* put(
      //   deleteTransactionSuccessAction(
      //     parseTransaction(parseDataResponse(response)),
      //   ),
      // );
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
    if (body.loadMore) {
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
      yield* put(closeHUDAction());
    }
    if (body.getting) {
      yield* put(updateIsGettingTransactionsAction(false));
    }
    if (body.refresh) {
      yield* put(updateIsRefreshingTransactionsAction(false));
    }
    if (body.loadMore) {
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
          parseTransaction(parseDataResponse(response)),
        ),
      );
      push(ScreenName.TransactionDetailScreen);
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
      yield* put(closeHUDAction());
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
      if (body.type === TransactionCategorySegment.EXPENSE) {
        yield* put(
          createTransactionExpenseCategorySuccessAction(
            parseTransactionCategory(parseDataResponse(response)),
          ),
        );
      } else if (body.type === TransactionCategorySegment.INCOME) {
        yield* put(
          createTransactionIncomeCategorySuccessAction(
            parseTransactionCategory(parseDataResponse(response)),
          ),
        );
      }
      navigationRef.current?.dispatch(CommonActions.goBack());
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

function* deleteTransactionCategorySaga({
  body,
}: {
  type: string;
  body: DeleteTransactionCategoryRequestType;
}) {
  try {
    yield* put(showHUDAction());
    const response = yield* apiProxy(deleteTransactionCategoryApi, body);
    if (response.status === 200) {
      if (body.type === TransactionCategorySegment.EXPENSE) {
        yield* put(
          deleteTransactionExpenseCategorySuccessAction(
            parseTransactionCategory(parseDataResponse(response)),
          ),
        );
      } else if (body.type === TransactionCategorySegment.INCOME) {
        yield* put(
          deleteTransactionIncomeCategorySuccessAction(
            parseTransactionCategory(parseDataResponse(response)),
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
      if (body.type === TransactionCategorySegment.EXPENSE) {
        yield* put(updateIsGettingTransactionExpenseCategoriesAction(true));
      } else if (body.type === TransactionCategorySegment.INCOME) {
        yield* put(updateIsGettingTransactionIncomeCategoriesAction(true));
      }
    }
    if (body.refresh) {
      if (body.type === TransactionCategorySegment.EXPENSE) {
        yield* put(updateIsRefreshingTransactionExpenseCategoriesAction(true));
      } else if (body.type === TransactionCategorySegment.INCOME) {
        yield* put(updateIsRefreshingTransactionIncomeCategoriesAction(true));
      }
    }
    if (body.loadMore) {
      if (body.type === TransactionCategorySegment.EXPENSE) {
        yield* put(updateIsLoadingTransactionExpenseCategoriesAction(true));
      } else if (body.type === TransactionCategorySegment.INCOME) {
        yield* put(updateIsLoadingTransactionIncomeCategoriesAction(true));
      }
    }

    const response = yield* apiProxy(getTransactionCategoriesApi, body);
    if (response.status === 200) {
      if (body.page && body.page > 0) {
        const newData = parseTransactionCategories(parseDataResponse(response));
        if (newData.length > 0) {
          if (body.type === TransactionCategorySegment.EXPENSE) {
            const oldData = yield* select(transactionExpenseCategoriesSelector);
            yield* put(
              getTransactionExpenseCategoriesSuccessAction(
                mixTransactionCategories(oldData, newData),
              ),
            );
          } else if (body.type === TransactionCategorySegment.INCOME) {
            const oldData = yield* select(transactionIncomeCategoriesSelector);
            yield* put(
              getTransactionIncomeCategoriesSuccessAction(
                mixTransactionCategories(oldData, newData),
              ),
            );
          }
        }
      } else {
        if (body.type === TransactionCategorySegment.EXPENSE) {
          yield* put(
            getTransactionExpenseCategoriesSuccessAction(
              parseTransactionCategories(parseDataResponse(response)),
            ),
          );
        } else if (body.type === TransactionCategorySegment.INCOME) {
          yield* put(
            getTransactionIncomeCategoriesSuccessAction(
              parseTransactionCategories(parseDataResponse(response)),
            ),
          );
        }
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
      if (body.type === TransactionCategorySegment.EXPENSE) {
        yield* put(updateIsGettingTransactionExpenseCategoriesAction(false));
      } else if (body.type === TransactionCategorySegment.INCOME) {
        yield* put(updateIsGettingTransactionIncomeCategoriesAction(false));
      }
    }
    if (body.refresh) {
      if (body.type === TransactionCategorySegment.EXPENSE) {
        yield* put(updateIsRefreshingTransactionExpenseCategoriesAction(false));
      } else if (body.type === TransactionCategorySegment.INCOME) {
        yield* put(updateIsRefreshingTransactionIncomeCategoriesAction(false));
      }
    }
    if (body.loadMore) {
      if (body.type === TransactionCategorySegment.EXPENSE) {
        yield* put(updateIsLoadingTransactionExpenseCategoriesAction(false));
      } else if (body.type === TransactionCategorySegment.INCOME) {
        yield* put(updateIsLoadingTransactionIncomeCategoriesAction(false));
      }
    }
  }
}

function* getTransactionStatisticsSaga({
  body,
}: {
  type: string;
  body: GetTransactionStatisticRequestType;
}) {
  try {
    if (body.showHUD) {
      yield* put(showHUDAction());
    } else if (body.getting) {
      if (body.type === TransactionCategorySegment.EXPENSE) {
        yield* put(updateIsGettingExpenseTransactionStatisticsAction(true));
      } else if (body.type === TransactionCategorySegment.INCOME) {
        yield* put(updateIsGettingIncomeTransactionStatisticsAction(true));
      }
    }
    const response = yield* apiProxy(getTransactionStatisticsApi, body);
    if (response.status === 200) {
      if (body.type === TransactionCategorySegment.EXPENSE) {
        const data = parseDataResponse(response);
        if (data.length > 0) {
          const expenses = parseTransactionStatistics(data);
          let totalExpense = 0;
          for (let i = 0; i < expenses.length; ++i) {
            if (!isNull(expenses[i].population)) {
              totalExpense += expenses[i].population ?? 0;
            }
          }
          yield* put(getTotalExpenseTransactionSuccessAction(totalExpense));
          yield* put(getExpenseTransactionStatisticsSuccessAction(expenses));
        }
      } else if (body.type === TransactionCategorySegment.INCOME) {
        const data = parseDataResponse(response);
        if (data.length > 0) {
          const incomes = parseTransactionStatistics(data);
          let totalIncome = 0;
          for (let i = 0; i < incomes.length; ++i) {
            if (!isNull(incomes[i].population)) {
              totalIncome += incomes[i].population ?? 0;
            }
          }
          yield* put(getTotalIncomeTransactionSuccessAction(totalIncome));
          yield* put(getIncomeTransactionStatisticsSuccessAction(incomes));
        }
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
    } else if (body.getting) {
      if (body.type === TransactionCategorySegment.EXPENSE) {
        yield* put(updateIsGettingExpenseTransactionStatisticsAction(false));
      } else if (body.type === TransactionCategorySegment.INCOME) {
        yield* put(updateIsGettingIncomeTransactionStatisticsAction(false));
      }
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
      DELETE_TRANSACTION_CATEGORY_REQUEST,
      deleteTransactionCategorySaga,
    ),
    takeEvery(GET_TRANSACTION_CATEGORIES_REQUEST, getTransactionCategoriesSaga),
    takeEvery(GET_TRANSACTION_STATISTICS_REQUEST, getTransactionStatisticsSaga),
  ]);
}
