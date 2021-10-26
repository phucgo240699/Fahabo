import {ToastType} from '@constants/types/session';
import i18n from '@locales/index';
import {getFamilyMembersApi, getMyFamiliesApi} from '@services/family';
import {
  getFamiliesSuccessAction,
  getFamilyMembersSuccessAction,
  updateFocusFamilyAction,
} from '@store/actionTypes/family';
import {GET_HOME_SCREEN_DATA} from '@store/actionTypes/screens';
import {
  closeHUDAction,
  showHUDAction,
  showToastAction,
} from '@store/actionTypes/session';
import {isNull} from '@utils/index';
import {parseDataResponse, parseErrorResponse} from '@utils/parsers';
import {parseFamilies, parseMembers} from '@utils/parsers/family';
import {AnyAction} from 'redux';
import {all, put, takeLeading} from 'typed-redux-saga';
import {apiProxy} from './apiProxy';

function* getHomeScreenDataSaga(action: AnyAction) {
  try {
    yield* put(showHUDAction());
    const familyResponse = yield* apiProxy(getMyFamiliesApi, {});
    if (familyResponse.status === 200) {
      const families = parseFamilies(parseDataResponse(familyResponse));
      yield* put(getFamiliesSuccessAction(families));
      if (families.length > 0 && !isNull(families[0].id)) {
        yield* put(updateFocusFamilyAction(families[0]));
        const membersResponse = yield* apiProxy(getFamilyMembersApi, {
          familyId: families[0].id,
        });
        if (membersResponse.status === 200) {
          yield* put(
            getFamilyMembersSuccessAction(
              parseMembers(parseDataResponse(membersResponse)),
            ),
          );
        } else {
          yield* put(
            showToastAction(
              i18n.t(`backend.${parseErrorResponse(membersResponse)}`),
              ToastType.ERROR,
            ),
          );
        }
      }
    } else {
      yield* put(
        showToastAction(
          i18n.t(`backend.${parseErrorResponse(familyResponse)}`),
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
  yield* all([takeLeading(GET_HOME_SCREEN_DATA, getHomeScreenDataSaga)]);
}
