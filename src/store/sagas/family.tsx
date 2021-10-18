import {AnyAction} from 'redux';
import i18n from '@locales/index';
import {
  closeHUDAction,
  showHUDAction,
  showToastAction,
} from '@store/actionTypes/session';
import {apiProxy} from './apiProxy';
import {ToastType} from '@constants/types/session';
import {createFamilyApi, getMyFamiliesApi} from '@services/family';
import {all, put, select, takeLatest, takeLeading} from 'typed-redux-saga';
import {
  createFamilySuccessAction,
  CREATE_FAMILY_REQUEST,
  CREATE_FAMILY_SUCCESS,
  getFamiliesSuccessAction,
  GET_FAMILIES_REQUEST,
} from '@store/actionTypes/family';
import {CreateFamilyRequestType, FamilyType} from '@constants/types/family';
import {parseFamilies, parseFamily} from '@utils/parsers/family';
import {navigateReset} from '@navigators/index';
import {StackName} from '@constants/Constants';
import {userSelector} from '@store/selectors/authentication';
import {isNull} from '@utils/index';

function* createFamilyRequestSaga({
  body,
}: {
  type: string;
  body: CreateFamilyRequestType;
}) {
  try {
    yield* put(showHUDAction());
    const response = yield* apiProxy(createFamilyApi, body);
    if (response.status === 200) {
      yield* put(createFamilySuccessAction(parseFamily(response.data.data)));
    } else {
      yield* put(
        showToastAction(
          i18n.t(`backend.${response.data.errors[0]}`),
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

function* createFamilySuccessSaga(action: AnyAction) {
  const user = yield* select(state => userSelector(state));
  if (isNull(user?.totalFamilies) || user?.totalFamilies === 0) {
    navigateReset(StackName.MainStack);
  }
}

function* joinFamilyRequestSaga({
  body,
}: {
  type: string;
  body: CreateFamilyRequestType;
}) {
  try {
    put(showHUDAction());
    const response = yield* apiProxy(createFamilyApi, body);
    if (response.status === 200) {
      yield* put(createFamilySuccessAction(parseFamily(response.data.data)));
    } else {
      yield* put(
        showToastAction(
          i18n.t(`backend.${response.data.errors[0]}`),
          ToastType.ERROR,
        ),
      );
    }
  } catch (error) {
    yield* put(
      showToastAction(i18n.t('errorMessage.general'), ToastType.ERROR),
    );
  } finally {
    put(closeHUDAction());
  }
}

function* joinFamilySuccessSaga(action: AnyAction) {
  const user = yield* select(state => userSelector(state));
  if (isNull(user?.totalFamilies) || user?.totalFamilies === 0) {
    navigateReset(StackName.MainStack);
  }
}

function* getFamiliesSaga(action: AnyAction) {
  try {
    const response = yield* apiProxy(getMyFamiliesApi);
    if (response.status === 200) {
      yield* put(getFamiliesSuccessAction(parseFamilies(response.data.data)));
      console.log(response.data.data);
    } else {
      yield* put(
        showToastAction(
          i18n.t(`backend.${response.data.errors[0]}`),
          ToastType.ERROR,
        ),
      );
    }
  } catch (error) {
    console.log({error});
    yield* put(
      showToastAction(i18n.t('errorMessage.general'), ToastType.ERROR),
    );
  }
}

export default function* () {
  yield* all([
    takeLatest(CREATE_FAMILY_REQUEST, createFamilyRequestSaga),
    takeLatest(CREATE_FAMILY_SUCCESS, createFamilySuccessSaga),
    takeLatest(GET_FAMILIES_REQUEST, getFamiliesSaga),
  ]);
}
