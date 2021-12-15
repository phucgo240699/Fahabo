import {StackName} from '@constants/Constants';
import {ToastType} from '@constants/types/session';
import i18n from '@locales/index';
import {navigateReset} from '@navigators/index';
import {getChoresApi} from '@services/chores';
import {getCuisinePostsApi} from '@services/cuisine';
import {getFamilyMembersApi, getMyFamiliesApi} from '@services/family';
import {getTransactionsApi} from '@services/transactions';
import {getChoresSuccessAction} from '@store/actionTypes/chores';
import {getCuisinePostsSuccessAction} from '@store/actionTypes/cuisine';
import {
  getChoreFilterMembersSuccessAction,
  getFamiliesSuccessAction,
  getFamilyMembersSuccessAction,
  updateFocusFamilySuccessAction,
} from '@store/actionTypes/family';
import {getBadgesRequestAction} from '@store/actionTypes/notifications';
import {GET_HOME_SCREEN_DATA} from '@store/actionTypes/screens';
import {
  closeHUDAction,
  showHUDAction,
  showToastAction,
  updateRouteNameAction,
} from '@store/actionTypes/session';
import {logOutRequestAction} from '@store/actionTypes/signIn';
import {getTransactionsSuccessAction} from '@store/actionTypes/transactions';
import {focusFamilySelector} from '@store/selectors/family';
import {
  getOriginDateStringWithMaximumDate,
  getOriginDateStringWithMinimumDate,
  isNull,
} from '@utils/index';
import {
  parseDataResponse,
  parseErrorResponse,
  parseErrorsResponse,
} from '@utils/parsers';
import {parseChores} from '@utils/parsers/chores';
import {parseCuisinePosts} from '@utils/parsers/cuisine';
import {parseFamilies, parseMembers} from '@utils/parsers/family';
import {parseTransactions} from '@utils/parsers/transactions';
import {AnyAction} from 'redux';
import {all, delay, put, select, takeLeading} from 'typed-redux-saga';
import {apiProxy} from './apiProxy';

function* getHomeScreenDataSaga(action: AnyAction) {
  try {
    navigateReset(StackName.MainStack);
    yield* delay(100);
    yield* put(showHUDAction());
    let focusFamily = yield* select(focusFamilySelector);

    if (isNull(focusFamily)) {
      const familyResponse = yield* apiProxy(getMyFamiliesApi, {});
      if (familyResponse.status === 200) {
        const families = parseFamilies(parseDataResponse(familyResponse));
        yield* put(getFamiliesSuccessAction(families));
        if (
          families.length > 0 &&
          !isNull(families[0]) &&
          !isNull(families[0].id)
        ) {
          yield* put(updateFocusFamilySuccessAction(families[0]));
          focusFamily = yield* select(focusFamilySelector);
        } else {
          yield* put(
            showToastAction(
              i18n.t('warningMessage.notJoiningFamilyNow'),
              ToastType.WARNING,
            ),
          );
          yield* put(logOutRequestAction());
        }
      }
    }

    if (!isNull(focusFamily)) {
      const today = new Date();
      const [
        choresResponse,
        membersResponse,
        transactionsResponse,
        cuisineResponse,
        badgeResponse,
      ] = yield* all([
        apiProxy(getChoresApi, {familyId: focusFamily?.id}),
        apiProxy(getFamilyMembersApi, {familyId: focusFamily?.id}),
        apiProxy(getTransactionsApi, {
          familyId: focusFamily?.id,
          from: `${getOriginDateStringWithMinimumDate(today)} 00:00:00`,
          to: `${getOriginDateStringWithMaximumDate(today)} 23:59:59`,
        }),
        apiProxy(getCuisinePostsApi, {searchText: ''}),
        put(getBadgesRequestAction({familyId: focusFamily?.id})),
      ]);
      if (
        (choresResponse as any).status === 200 &&
        (membersResponse as any).status === 200 &&
        (transactionsResponse as any).status === 200 &&
        (cuisineResponse as any).status
      ) {
        yield* all([
          put(
            getChoresSuccessAction(
              parseChores(parseDataResponse(choresResponse)),
            ),
          ),
          put(
            getFamilyMembersSuccessAction(
              parseMembers(parseDataResponse(membersResponse)),
            ),
          ),
          put(
            getChoreFilterMembersSuccessAction(
              parseMembers(parseDataResponse(membersResponse)),
            ),
          ),
          put(
            getTransactionsSuccessAction(
              parseTransactions(parseDataResponse(transactionsResponse)),
            ),
          ),
          put(
            getCuisinePostsSuccessAction(
              parseCuisinePosts(parseDataResponse(cuisineResponse)),
            ),
          ),
          put(updateRouteNameAction(StackName.HomeStack)),
        ]);
      } else {
        if (parseErrorsResponse(choresResponse).length > 0) {
          yield* put(
            showToastAction(
              i18n.t(`backend.${parseErrorResponse(choresResponse)}`),
              ToastType.ERROR,
            ),
          );
        } else if (parseErrorsResponse(membersResponse).length > 0) {
          yield* put(
            showToastAction(
              i18n.t(`backend.${parseErrorResponse(membersResponse)}`),
              ToastType.ERROR,
            ),
          );
        } else if (parseErrorsResponse(transactionsResponse).length > 0) {
          yield* put(
            showToastAction(
              i18n.t(`backend.${parseErrorResponse(transactionsResponse)}`),
              ToastType.ERROR,
            ),
          );
        } else if (parseErrorsResponse(cuisineResponse).length > 0) {
          yield* put(
            showToastAction(
              i18n.t(`backend.${parseErrorResponse(cuisineResponse)}`),
              ToastType.ERROR,
            ),
          );
        } else {
          yield* put(
            showToastAction(i18n.t('errorMessage.general'), ToastType.ERROR),
          );
        }
      }
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
  yield* all([takeLeading(GET_HOME_SCREEN_DATA, getHomeScreenDataSaga)]);
}
