import {ScreenName} from '@constants/Constants';
import {
  CreateCuisinePostRequestType,
  DeleteCuisinePostRequestType,
  GetCuisinePostsRequestType,
  UpdateCuisinePostRequestType,
  VoteCuisinePostRequestType,
} from '@constants/types/cuisine';
import {ToastType} from '@constants/types/session';
import i18n from '@locales/index';
import {navigate} from '@navigators/index';
import {
  createCuisinePostApi,
  deleteCuisinePostApi,
  getCuisinePostsApi,
  updateCuisinePostApi,
  voteCuisinePostApi,
} from '@services/cuisine';
import {
  createCuisinePostSuccessAction,
  CREATE_CUISINE_POST_REQUEST,
  deleteCuisinePostSuccessAction,
  DELETE_CUISINE_POST_REQUEST,
  getCuisinePostsSuccessAction,
  GET_CUISINE_POSTS_REQUEST,
  updateCuisinePostSuccessAction,
  updateIsGettingCuisinePostsAction,
  updateIsLoadingCuisinePostsAction,
  updateIsRefreshingCuisinePostsAction,
  UPDATE_CUISINE_POST_REQUEST,
  VOTE_CUISINE_POST_REQUEST,
} from '@store/actionTypes/cuisine';
import {
  closeHUDAction,
  showHUDAction,
  showToastAction,
} from '@store/actionTypes/session';
import {cuisinePostsSelector} from '@store/selectors/cuisine';
import {mixCuisinePosts} from '@utils/cuisine';
import {parseDataResponse, parseErrorResponse} from '@utils/parsers';
import {parseCuisinePost, parseCuisinePosts} from '@utils/parsers/cuisine';
import {all, put, select, takeLatest, takeLeading} from 'typed-redux-saga';
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
      navigate(ScreenName.CuisinePostsScreen);
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
      navigate(ScreenName.CuisinePostsScreen);
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

function* voteCuisinePostSaga({
  body,
}: {
  type: string;
  body: VoteCuisinePostRequestType;
}) {
  try {
    const response = yield* apiProxy(voteCuisinePostApi, body);
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

export default function* () {
  yield* all([
    yield* takeLeading(CREATE_CUISINE_POST_REQUEST, createCuisinePostSaga),
    yield* takeLeading(UPDATE_CUISINE_POST_REQUEST, updateCuisinePostSaga),
    yield* takeLeading(DELETE_CUISINE_POST_REQUEST, deleteCuisinePostSaga),
    yield* takeLeading(GET_CUISINE_POSTS_REQUEST, getCuisinePostsSaga),
    yield* takeLatest(VOTE_CUISINE_POST_REQUEST, voteCuisinePostSaga),
  ]);
}
