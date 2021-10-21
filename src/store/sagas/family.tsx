import {AnyAction} from 'redux';
import i18n from '@locales/index';
import {
  closeHUDAction,
  showHUDAction,
  showToastAction,
  updateIsLoadingFamiliesAction,
  updateIsLoadingFamilyMembersAction,
  updateIsRefreshingFamiliesAction,
  updateIsRefreshingFamilyDetailAction,
  updateIsRefreshingFamilyMembersAction,
} from '@store/actionTypes/session';
import {apiProxy} from './apiProxy';
import {ToastType} from '@constants/types/session';
import {
  createFamilyApi,
  getFamilyDetailApi,
  getFamilyMembersApi,
  getMyFamiliesApi,
  joinFamilyApi,
  kickFamilyMemberApi,
  leaveFamilyApi,
  updateFamilyInfoApi,
  updateFamilyThumbnailApi,
} from '@services/family';
import {all, put, select, takeLeading} from 'typed-redux-saga';
import {
  createFamilySuccessAction,
  CREATE_FAMILY_REQUEST,
  getFamiliesRequestAction,
  getFamiliesSuccessAction,
  getFamilyDetailSuccessAction,
  getFamilyMembersRequestAction,
  getFamilyMembersSuccessAction,
  GET_FAMILIES_REQUEST,
  GET_FAMILY_DETAIL_REQUEST,
  GET_FAMILY_MEMBERS_REQUEST,
  GET_REFRESH_FAMILIES_REQUEST,
  GET_REFRESH_FAMILY_DETAIL_REQUEST,
  GET_REFRESH_FAMILY_MEMBERS_REQUEST,
  joinFamilySuccessAction,
  JOIN_FAMILY_REQUEST,
  KICK_FAMILY_MEMBER_REQUEST,
  LEAVE_FAMILY_REQUEST,
  updateFamilyInfoSuccessAction,
  updateFamilyThumbnailSuccessAction,
  UPDATE_FAMILY_INFO_REQUEST,
  UPDATE_FAMILY_THUMBNAIL_REQUEST,
} from '@store/actionTypes/family';
import {
  CreateFamilyRequestType,
  GetFamilyDetailRequestType,
  GetFamilyMembersRequestType,
  GetMyFamiliesRequestType,
  JoinFamilyRequestType,
  KickFamilyMemberRequestType,
  LeaveFamilyRequestType,
  UpdateFamilyInfoRequestType,
  UpdateFamilyThumbnailRequestType,
} from '@constants/types/family';
import {parseFamilies, parseFamily, parseMembers} from '@utils/parsers/family';
import {navigate, navigateReset, navigationRef} from '@navigators/index';
import {ScreenName, StackName} from '@constants/Constants';
import {CommonActions} from '@react-navigation/native';
import {
  membersInFamilySelector,
  familiesSelector,
} from '@store/selectors/family';
import {parseDataResponse, parseErrorResponse} from '@utils/parsers';

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
        createFamilySuccessAction(
          parseFamily(parseDataResponse(response).family),
        ),
      );
      if (parseDataResponse(response).alreadyHadFamily !== true) {
        navigateReset(StackName.MainStack);
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

function* joinFamilySaga({body}: {type: string; body: JoinFamilyRequestType}) {
  try {
    yield* put(showHUDAction());
    const response = yield* apiProxy(joinFamilyApi, body);
    if (response.status === 200) {
      yield* put(
        joinFamilySuccessAction(
          parseFamily(parseDataResponse(response).family),
        ),
      );
      if (parseDataResponse(response).alreadyHadFamily == true) {
        navigationRef.current.dispatch(CommonActions.goBack());
      } else {
        navigateReset(StackName.MainStack);
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
      yield* put(getFamiliesRequestAction({}));
      navigationRef.current.dispatch(CommonActions.goBack());
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

function* kickFamilyMemberSaga({
  body,
}: {
  type: string;
  body: KickFamilyMemberRequestType;
}) {
  try {
    const response = yield* apiProxy(kickFamilyMemberApi, body);
    console.log({response: response.data});
    if (response.status === 200) {
      yield* put(getFamilyMembersRequestAction({familyId: body.familyId}));
    } else {
      yield* put(
        showToastAction(
          i18n.t(`backend.${parseErrorResponse(response)}`),
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

function* updateFamilyThumbnailSaga({
  body,
}: {
  type: string;
  body: UpdateFamilyThumbnailRequestType;
}) {
  try {
    yield* put(showHUDAction());
    const response = yield* apiProxy(updateFamilyThumbnailApi, body);
    if (response.status === 200) {
      yield* put(
        showToastAction(
          i18n.t('successMessage.updateFamilyInfo'),
          ToastType.SUCCESS,
        ),
      );
      yield* put(
        updateFamilyThumbnailSuccessAction(
          parseFamily(parseDataResponse(response)),
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

function* updateFamilyInfoSaga({
  body,
}: {
  type: string;
  body: UpdateFamilyInfoRequestType;
}) {
  try {
    yield* put(showHUDAction());
    const response = yield* apiProxy(updateFamilyInfoApi, body);
    if (response.status === 200) {
      yield* put(
        showToastAction(
          i18n.t('successMessage.updateFamilyInfo'),
          ToastType.SUCCESS,
        ),
      );
      yield* put(
        updateFamilyInfoSuccessAction(parseFamily(parseDataResponse(response))),
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

function* getFamiliesSaga({
  body,
}: {
  type: string;
  body: GetMyFamiliesRequestType;
}) {
  try {
    if (body.showHUD === true) {
      yield* put(showHUDAction());
    }
    yield* put(updateIsLoadingFamiliesAction(true));
    const response = yield* apiProxy(getMyFamiliesApi, body);
    if (response.status === 200) {
      if (body.page && body.page > 0) {
        const oldData = yield* select(familiesSelector);
        yield* put(
          getFamiliesSuccessAction([
            ...oldData,
            ...parseFamilies(parseDataResponse(response)),
          ]),
        );
      } else {
        yield* put(
          getFamiliesSuccessAction(parseFamilies(parseDataResponse(response))),
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
    yield* put(updateIsLoadingFamiliesAction(false));
  }
}

function* getRefreshFamiliesSaga(action: AnyAction) {
  try {
    yield* put(updateIsRefreshingFamiliesAction(true));
    const response = yield* apiProxy(getMyFamiliesApi);
    if (response.status === 200) {
      yield* put(
        getFamiliesSuccessAction(parseFamilies(parseDataResponse(response))),
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
    yield* put(updateIsRefreshingFamiliesAction(false));
  }
}

function* getFamilyDetailSage({
  body,
}: {
  type: string;
  body: GetFamilyDetailRequestType;
}) {
  try {
    yield* put(showHUDAction());
    const response = yield* apiProxy(getFamilyDetailApi, body);

    if (response.status === 200) {
      yield* put(
        getFamilyDetailSuccessAction(parseFamily(parseDataResponse(response))),
      );
      navigate(ScreenName.FamilyDetailScreen);
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

function* getRefreshFamilyDetailSage({
  body,
}: {
  type: string;
  body: GetFamilyDetailRequestType;
}) {
  try {
    yield* put(updateIsRefreshingFamilyDetailAction(true));
    const response = yield* apiProxy(getFamilyDetailApi, body);

    if (response.status === 200) {
      yield* put(
        getFamilyDetailSuccessAction(parseFamily(parseDataResponse(response))),
      );
      navigate(ScreenName.FamilyDetailScreen);
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
    yield* put(updateIsRefreshingFamilyDetailAction(false));
  }
}

function* getFamilyMembersSaga({
  body,
}: {
  type: string;
  body: GetFamilyMembersRequestType;
}) {
  try {
    if (body.showHUD === true) {
      yield* put(showHUDAction());
    }
    yield* put(updateIsLoadingFamilyMembersAction(true));
    const response = yield* apiProxy(getFamilyMembersApi, body);
    if (response.status === 200) {
      if (body.page && body.page > 0) {
        const oldData = yield* select(membersInFamilySelector);
        yield* put(
          getFamilyMembersSuccessAction([
            ...oldData,
            ...parseMembers(parseDataResponse(response)),
          ]),
        );
      } else {
        yield* put(
          getFamilyMembersSuccessAction(
            parseMembers(parseDataResponse(response)),
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
    yield* put(updateIsLoadingFamilyMembersAction(false));
  }
}

function* getRefreshFamilyMembersSaga({
  body,
}: {
  type: string;
  body: GetFamilyMembersRequestType;
}) {
  try {
    yield* put(updateIsRefreshingFamilyMembersAction(true));
    const response = yield* apiProxy(getFamilyMembersApi, body);
    if (response.status === 200) {
      yield* put(
        getFamilyMembersSuccessAction(
          parseMembers(parseDataResponse(response)),
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
    yield* put(updateIsRefreshingFamilyMembersAction(false));
  }
}

export default function* () {
  yield* all([
    takeLeading(CREATE_FAMILY_REQUEST, createFamilySaga),
    takeLeading(JOIN_FAMILY_REQUEST, joinFamilySaga),
    takeLeading(LEAVE_FAMILY_REQUEST, leaveFamilySaga),
    takeLeading(KICK_FAMILY_MEMBER_REQUEST, kickFamilyMemberSaga),
    takeLeading(UPDATE_FAMILY_INFO_REQUEST, updateFamilyInfoSaga),
    takeLeading(UPDATE_FAMILY_THUMBNAIL_REQUEST, updateFamilyThumbnailSaga),
    takeLeading(GET_FAMILIES_REQUEST, getFamiliesSaga),
    takeLeading(GET_REFRESH_FAMILIES_REQUEST, getRefreshFamiliesSaga),
    takeLeading(GET_FAMILY_DETAIL_REQUEST, getFamilyDetailSage),
    takeLeading(GET_REFRESH_FAMILY_DETAIL_REQUEST, getRefreshFamilyDetailSage),
    takeLeading(GET_FAMILY_MEMBERS_REQUEST, getFamilyMembersSaga),
    takeLeading(
      GET_REFRESH_FAMILY_MEMBERS_REQUEST,
      getRefreshFamilyMembersSaga,
    ),
  ]);
}
