import {ScreenName} from '@constants/Constants';
import {
  BookmarkCuisinePostRequestType,
  CreateCuisinePostRequestType,
  DeleteCuisinePostRequestType,
  GetCuisinePostDetailRequestType,
  GetCuisinePostsRequestType,
  GetMyBookmarkedCuisinePostsRequestType,
  GetMyCuisinePostsRequestType,
  UpdateCuisinePostRequestType,
  VoteCuisinePostRequestType,
} from '@constants/types/cuisine';
import {ToastType} from '@constants/types/session';
import i18n from '@locales/index';
import {navigate, navigationRef} from '@navigators/index';
import {CommonActions} from '@react-navigation/native';
import {
  bookmarkCuisinePostApi,
  createCuisinePostApi,
  deleteCuisinePostApi,
  getCuisinePostDetailApi,
  getCuisinePostsApi,
  getMyBookmarkedCuisinePostsApi,
  getMyCuisinePostsApi,
  updateCuisinePostApi,
  voteCuisinePostApi,
} from '@services/cuisine';
import {
  // bookmarkCuisinePostSuccessAction,
  BOOKMARK_CUISINE_POST_REQUEST,
  createCuisinePostSuccessAction,
  CREATE_CUISINE_POST_REQUEST,
  deleteCuisinePostSuccessAction,
  DELETE_CUISINE_POST_REQUEST,
  getCuisinePostDetailSuccessAction,
  getCuisinePostsSuccessAction,
  getMyBookmarkedCuisinePostsSuccessAction,
  getMyCuisinePostsSuccessAction,
  GET_CUISINE_POSTS_REQUEST,
  GET_CUISINE_POST_DETAIL_REQUEST,
  GET_MY_BOOKMARKED_CUISINE_POSTS_REQUEST,
  GET_MY_CUISINE_POSTS_REQUEST,
  updateCuisinePostSuccessAction,
  updateIsGettingCuisinePostsAction,
  updateIsGettingMyBookmarkedCuisinePostsAction,
  updateIsGettingMyCuisinePostsAction,
  updateIsLoadingCuisinePostsAction,
  updateIsLoadingMyBookmarkedCuisinePostsAction,
  updateIsLoadingMyCuisinePostsAction,
  updateIsRefreshingCuisinePostsAction,
  updateIsRefreshingMyBookmarkedCuisinePostsAction,
  updateIsRefreshingMyCuisinePostsAction,
  UPDATE_CUISINE_POST_REQUEST,
  VOTE_CUISINE_POST_REQUEST,
} from '@store/actionTypes/cuisine';
import {
  closeHUDAction,
  showHUDAction,
  showToastAction,
} from '@store/actionTypes/session';
import {
  cuisinePostsSelector,
  myBookmarkedCuisinePostsSelector,
  myCuisinePostsSelector,
} from '@store/selectors/cuisine';
import {mixCuisinePosts} from '@utils/cuisine';
import {parseDataResponse, parseErrorResponse} from '@utils/parsers';
import {parseCuisinePost, parseCuisinePosts} from '@utils/parsers/cuisine';
import {
  all,
  put,
  delay,
  select,
  takeLatest,
  takeLeading,
} from 'typed-redux-saga';
import {apiProxy} from './apiProxy';

function* createCuisinePostSaga({
  body,
}: {
  type: string;
  body: CreateCuisinePostRequestType;
}) {
  try {
    yield* put(showHUDAction());
    const response = yield* apiProxy(createCuisinePostApi, body);
    if (response.status === 200) {
      yield* put(
        createCuisinePostSuccessAction(
          parseCuisinePost(parseDataResponse(response)),
        ),
      );
      yield* put(
        showToastAction(
          i18n.t('successMessage.createCuisinePost'),
          ToastType.SUCCESS,
        ),
      );
      // navigate(ScreenName.CuisinePostsScreen);
      navigationRef.current?.dispatch(CommonActions.goBack());
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

function* updateCuisinePostSaga({
  body,
}: {
  type: string;
  body: UpdateCuisinePostRequestType;
}) {
  try {
    yield* put(showHUDAction());
    const response = yield* apiProxy(updateCuisinePostApi, body);
    if (response.status === 200) {
      yield* put(
        updateCuisinePostSuccessAction(
          parseCuisinePost(parseDataResponse(response)),
        ),
      );
      yield* put(
        showToastAction(
          i18n.t('successMessage.updateCuisinePost'),
          ToastType.SUCCESS,
        ),
      );
      // navigate(ScreenName.CuisinePostsScreen);
      navigationRef.current?.dispatch(CommonActions.goBack());
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

function* deleteCuisinePostSaga({
  body,
}: {
  type: string;
  body: DeleteCuisinePostRequestType;
}) {
  try {
    const response = yield* apiProxy(deleteCuisinePostApi, body);
    if (response.status === 200) {
      yield* put(
        deleteCuisinePostSuccessAction(
          parseCuisinePost(parseDataResponse(response)),
        ),
      );
      yield* put(
        showToastAction(
          i18n.t('successMessage.deleteCuisinePost'),
          ToastType.SUCCESS,
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
  }
}

function* getCuisinePostsSaga({
  body,
}: {
  type: string;
  body: GetCuisinePostsRequestType;
}) {
  try {
    if (body.showHUD) {
      yield* put(showHUDAction());
    } else if (body.getting) {
      yield* put(updateIsGettingCuisinePostsAction(true));
    } else if (body.loading) {
      yield* put(updateIsLoadingCuisinePostsAction(true));
    } else if (body.refreshing) {
      yield* put(updateIsRefreshingCuisinePostsAction(true));
    }
    const response = yield* apiProxy(getCuisinePostsApi, body);
    if (response.status === 200) {
      if (body.page && body.page > 0) {
        const newData = parseCuisinePosts(parseDataResponse(response));
        if (newData.length > 0) {
          const oldData = yield* select(cuisinePostsSelector);
          yield* put(
            getCuisinePostsSuccessAction(mixCuisinePosts(oldData, newData)),
          );
        }
      } else {
        yield* put(
          getCuisinePostsSuccessAction(
            parseCuisinePosts(parseDataResponse(response)),
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
    } else if (body.getting) {
      yield* put(updateIsGettingCuisinePostsAction(false));
    } else if (body.loading) {
      yield* put(updateIsLoadingCuisinePostsAction(false));
    } else if (body.refreshing) {
      yield* put(updateIsRefreshingCuisinePostsAction(false));
    }
  }
}

function* getCuisinePostDetailSaga({
  body,
}: {
  type: string;
  body: GetCuisinePostDetailRequestType;
}) {
  try {
    yield* put(showHUDAction());
    const response = yield* apiProxy(getCuisinePostDetailApi, body);
    if (response.status === 200) {
      yield* put(
        getCuisinePostDetailSuccessAction(
          parseCuisinePost(parseDataResponse(response)),
        ),
      );
      navigate(ScreenName.CuisinePostDetailScreen);
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

function* voteCuisinePostSaga({
  body,
}: {
  type: string;
  body: VoteCuisinePostRequestType;
}) {
  try {
    const response = yield* apiProxy(voteCuisinePostApi, body);
    if (response.status === 200) {
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

function* bookmarkCuisinePostSaga({
  body,
}: {
  type: string;
  body: BookmarkCuisinePostRequestType;
}) {
  try {
    const response = yield* apiProxy(bookmarkCuisinePostApi, body);
    if (response.status === 200) {
      // yield* put(
      //   updateCuisinePostSuccessAction(
      //     parseCuisinePost(parseDataResponse(response)),
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

function* getMyCuisinePostsSaga({
  body,
}: {
  type: string;
  body: GetMyCuisinePostsRequestType;
}) {
  try {
    if (body.showHUD) {
      yield* put(showHUDAction());
    } else if (body.getting) {
      yield* put(updateIsGettingMyCuisinePostsAction(true));
    } else if (body.loading) {
      yield* put(updateIsLoadingMyCuisinePostsAction(true));
    } else if (body.refreshing) {
      yield* put(updateIsRefreshingMyCuisinePostsAction(true));
    }
    const response = yield* apiProxy(getMyCuisinePostsApi, body);
    if (response.status === 200) {
      if (body.page && body.page > 0) {
        const newData = parseCuisinePosts(parseDataResponse(response));
        if (newData.length > 0) {
          const oldData = yield* select(myCuisinePostsSelector);
          yield* put(
            getMyCuisinePostsSuccessAction(mixCuisinePosts(oldData, newData)),
          );
        }
      } else {
        yield* put(
          getMyCuisinePostsSuccessAction(
            parseCuisinePosts(parseDataResponse(response)),
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
    } else if (body.getting) {
      yield* put(updateIsGettingMyCuisinePostsAction(false));
    } else if (body.loading) {
      yield* put(updateIsLoadingMyCuisinePostsAction(false));
    } else if (body.refreshing) {
      yield* put(updateIsRefreshingMyCuisinePostsAction(false));
    }
  }
}

function* getMyBookmarkedCuisinePostsSaga({
  body,
}: {
  type: string;
  body: GetMyBookmarkedCuisinePostsRequestType;
}) {
  try {
    if (body.showHUD) {
      yield* put(showHUDAction());
    } else if (body.getting) {
      yield* put(updateIsGettingMyBookmarkedCuisinePostsAction(true));
    } else if (body.loading) {
      yield* put(updateIsLoadingMyBookmarkedCuisinePostsAction(true));
    } else if (body.refreshing) {
      yield* put(updateIsRefreshingMyBookmarkedCuisinePostsAction(true));
    }
    const response = yield* apiProxy(getMyBookmarkedCuisinePostsApi, body);
    if (response.status === 200) {
      if (body.page && body.page > 0) {
        const newData = parseCuisinePosts(parseDataResponse(response));
        if (newData.length > 0) {
          const oldData = yield* select(myBookmarkedCuisinePostsSelector);
          yield* put(
            getMyBookmarkedCuisinePostsSuccessAction(
              mixCuisinePosts(oldData, newData),
            ),
          );
        }
      } else {
        yield* put(
          getMyBookmarkedCuisinePostsSuccessAction(
            parseCuisinePosts(parseDataResponse(response)),
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
    } else if (body.getting) {
      yield* put(updateIsGettingMyBookmarkedCuisinePostsAction(false));
    } else if (body.loading) {
      yield* put(updateIsLoadingMyBookmarkedCuisinePostsAction(false));
    } else if (body.refreshing) {
      yield* put(updateIsRefreshingMyBookmarkedCuisinePostsAction(false));
    }
  }
}

export default function* () {
  yield* all([
    yield* takeLeading(CREATE_CUISINE_POST_REQUEST, createCuisinePostSaga),
    yield* takeLeading(UPDATE_CUISINE_POST_REQUEST, updateCuisinePostSaga),
    yield* takeLeading(DELETE_CUISINE_POST_REQUEST, deleteCuisinePostSaga),
    yield* takeLeading(GET_CUISINE_POSTS_REQUEST, getCuisinePostsSaga),
    yield* takeLeading(GET_MY_CUISINE_POSTS_REQUEST, getMyCuisinePostsSaga),
    yield* takeLeading(
      GET_MY_BOOKMARKED_CUISINE_POSTS_REQUEST,
      getMyBookmarkedCuisinePostsSaga,
    ),
    yield* takeLeading(
      GET_CUISINE_POST_DETAIL_REQUEST,
      getCuisinePostDetailSaga,
    ),
    yield* takeLatest(VOTE_CUISINE_POST_REQUEST, voteCuisinePostSaga),
    yield* takeLatest(BOOKMARK_CUISINE_POST_REQUEST, bookmarkCuisinePostSaga),
  ]);
}
