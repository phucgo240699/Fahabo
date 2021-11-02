import {ToastType} from '@constants/types/session';
import i18n from '@locales/index';
import {getChoresApi} from '@services/chores';
import {getFamilyMembersApi, getMyFamiliesApi} from '@services/family';
import {getChoresSuccessAction} from '@store/actionTypes/chores';
import {
  getChoreFilterMembersSuccessAction,
  getFamiliesSuccessAction,
  getFamilyMembersSuccessAction,
  updateFocusFamilySuccessAction,
} from '@store/actionTypes/family';
import {GET_HOME_SCREEN_DATA} from '@store/actionTypes/screens';
import {
  closeHUDAction,
  showHUDAction,
  showToastAction,
} from '@store/actionTypes/session';
import {logOutAction} from '@store/actionTypes/signIn';
import {focusFamilySelector} from '@store/selectors/family';
import {isNull} from '@utils/index';
import {
  parseDataResponse,
  parseErrorResponse,
  parseErrorsResponse,
} from '@utils/parsers';
import {parseChores} from '@utils/parsers/chores';
import {parseFamilies, parseMembers} from '@utils/parsers/family';
import {AnyAction} from 'redux';
import {all, put, select, takeLeading} from 'typed-redux-saga';
import {apiProxy} from './apiProxy';

function* getHomeScreenDataSaga(action: AnyAction) {
  try {
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
          yield* put(logOutAction());
        }
      }
    }

    if (!isNull(focusFamily)) {
      const [choresResponse, membersResponse] = yield* all([
        apiProxy(getChoresApi, {familyId: focusFamily?.id}),
        apiProxy(getFamilyMembersApi, {familyId: focusFamily?.id}),
      ]);
      if (
        (choresResponse as any).status === 200 &&
        (membersResponse as any).status === 200
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
