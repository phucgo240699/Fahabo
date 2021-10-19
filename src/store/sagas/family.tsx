import {AnyAction} from 'redux';
import i18n from '@locales/index';
import {
  closeHUDAction,
  showHUDAction,
  showToastAction,
} from '@store/actionTypes/session';
import {apiProxy} from './apiProxy';
import {ToastType} from '@constants/types/session';
import {
  createFamilyApi,
  getFamilyMembersApi,
  getMyFamiliesApi,
  joinFamilyApi,
  leaveFamilyApi,
} from '@services/family';
import {all, put, takeLatest, takeLeading} from 'typed-redux-saga';
import {
  createFamilySuccessAction,
  CREATE_FAMILY_REQUEST,
  getFamiliesRequestAction,
  getFamiliesSuccessAction,
  getFamilyMembersSuccessAction,
  GET_FAMILIES_REQUEST,
  GET_FAMILY_MEMBERS_REQUEST,
  joinFamilySuccessAction,
  JOIN_FAMILY_REQUEST,
  LEAVE_FAMILY_REQUEST,
} from '@store/actionTypes/family';
import {
  CreateFamilyRequestType,
  GetFamilyMembersRequestType,
  JoinFamilyRequestType,
  LeaveFamilyRequestType,
} from '@constants/types/family';
import {parseFamilies, parseFamily, parseMembers} from '@utils/parsers/family';
import {navigateReset, navigationRef} from '@navigators/index';
import {StackName} from '@constants/Constants';
import {CommonActions} from '@react-navigation/native';

function* createFamilySaga({
  body,
}: {
  type: string;
  body: CreateFamilyRequestType;
}) {
  try {
    yield* put(showHUDAction());
    const response = yield* apiProxy(createFamilyApi, body);
    if (response.status === 200) {
      yield* put(
        createFamilySuccessAction(parseFamily(response.data.data.family)),
      );
      if (response.data.data.alreadyHadFamily !== true) {
        navigateReset(StackName.MainStack);
      }
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

function* joinFamilySaga({body}: {type: string; body: JoinFamilyRequestType}) {
  try {
    yield* put(showHUDAction());
    const response = yield* apiProxy(joinFamilyApi, body);
    if (response.status === 200) {
      yield* put(
        joinFamilySuccessAction(parseFamily(response.data.data.family)),
      );
      if (response.data.data.alreadyHadFamily == true) {
        navigationRef.current.dispatch(CommonActions.goBack());
      } else {
        navigateReset(StackName.MainStack);
      }
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

function* leaveFamilySaga({
  body,
}: {
  type: string;
  body: LeaveFamilyRequestType;
}) {
  try {
    yield* put(showHUDAction());
    const response = yield* apiProxy(leaveFamilyApi, body);
    if (response.status === 200) {
      yield* put(getFamiliesRequestAction());
      navigationRef.current.dispatch(CommonActions.goBack());
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

function* getFamiliesSaga(action: AnyAction) {
  try {
    const response = yield* apiProxy(getMyFamiliesApi);
    if (response.status === 200) {
      yield* put(getFamiliesSuccessAction(parseFamilies(response.data.data)));
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

function* getFamilyMembersSaga({
  body,
}: {
  type: string;
  body: GetFamilyMembersRequestType;
}) {
  try {
    const response = yield* apiProxy(getFamilyMembersApi, body);
    if (response.status === 200) {
      yield* put(
        getFamilyMembersSuccessAction(parseMembers(response.data.data)),
      );
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
    takeLeading(CREATE_FAMILY_REQUEST, createFamilySaga),
    takeLeading(JOIN_FAMILY_REQUEST, joinFamilySaga),
    takeLeading(LEAVE_FAMILY_REQUEST, leaveFamilySaga),
    takeLeading(GET_FAMILY_MEMBERS_REQUEST, getFamilyMembersSaga),
    takeLeading(GET_FAMILIES_REQUEST, getFamiliesSaga),
  ]);
}
