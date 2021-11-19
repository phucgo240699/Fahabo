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
  getFamilyMembersForCallApi,
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
  getChoreFilterMembersSuccessAction,
  getEventFilterMembersSuccessAction,
  getFamiliesSuccessAction,
  getFamilyDetailSuccessAction,
  getFamilyMembersRequestAction,
  getFamilyMembersSuccessAction,
  GET_CHORE_FILTER_MEMBERS_REQUEST,
  GET_FAMILIES_REQUEST,
  GET_FAMILY_DETAIL_REQUEST,
  GET_FAMILY_MEMBERS_FOR_CALL_REQUEST,
  GET_FAMILY_MEMBERS_REQUEST,
  GET_REFRESH_FAMILY_DETAIL_REQUEST,
  joinFamilySuccessAction,
  JOIN_FAMILY_REQUEST,
  KICK_FAMILY_MEMBER_REQUEST,
  leaveFamilySuccessAction,
  LEAVE_FAMILY_REQUEST,
  updateFamilyInfoSuccessAction,
  updateFamilyThumbnailSuccessAction,
  updateFocusFamilyRequestAction,
  updateFocusFamilySuccessAction,
  UPDATE_FAMILY_INFO_REQUEST,
  UPDATE_FAMILY_THUMBNAIL_REQUEST,
  UPDATE_FOCUS_FAMILY_REQUEST,
} from '@store/actionTypes/family';
import {
  CreateFamilyRequestType,
  FamilyType,
  GetChoreFilterMembersRequestType,
  GetEventFilterMembersRequestType,
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
import {navigate, navigateReset, navigationRef, push} from '@navigators/index';
import {ScreenName, StackName} from '@constants/Constants';
import {CommonActions} from '@react-navigation/native';
import {
  membersInFamilySelector,
  familiesSelector,
  focusFamilySelector,
} from '@store/selectors/family';
import {parseDataResponse, parseErrorResponse} from '@utils/parsers';
import {mixFamily} from '@utils/family';
import {getHomeScreenDataRequestAction} from '@store/actionTypes/screens';

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
      yield* put(leaveFamilySuccessAction(body.familyId));
      const focusFamily = yield* select(focusFamilySelector);
      navigationRef.current.dispatch(CommonActions.goBack());
      if (body.familyId === focusFamily?.id) {
        yield* put(updateFocusFamilyRequestAction(undefined));
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
    if (body.refresh === true) {
      yield* put(updateIsRefreshingFamiliesAction(true));
    }
    if (body.loadMore === true) {
      yield* put(updateIsLoadingFamiliesAction(true));
    }
    const response = yield* apiProxy(getMyFamiliesApi, body);
    if (response.status === 200) {
      if (body.page && body.page > 0) {
        const newData = parseFamilies(parseDataResponse(response));
        if (newData.length > 0) {
          const oldData = yield* select(familiesSelector);
          yield* put(getFamiliesSuccessAction(mixFamily(oldData, newData)));
        }
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
    if (body.showHUD === true) {
      yield* put(closeHUDAction());
    }
    if (body.refresh === true) {
      yield* put(updateIsRefreshingFamiliesAction(false));
    }
    if (body.loadMore === true) {
      yield* put(updateIsLoadingFamiliesAction(false));
    }
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
      push(ScreenName.FamilyDetailScreen);
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
    if (body.refresh === true) {
      yield* put(updateIsRefreshingFamilyMembersAction(true));
    }
    if (body.loadMore === true) {
      yield* put(updateIsLoadingFamilyMembersAction(true));
    }
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
    if (body.showHUD === true) {
      yield* put(closeHUDAction());
    }
    if (body.refresh === true) {
      yield* put(updateIsRefreshingFamilyMembersAction(false));
    }
    if (body.loadMore === true) {
      yield* put(updateIsLoadingFamilyMembersAction(false));
    }
  }
}

function* getFamilyMembersForCallSaga({
  body,
}: {
  type: string;
  body: GetFamilyMembersRequestType;
}) {
  try {
    if (body.showHUD === true) {
      yield* put(showHUDAction());
    }
    if (body.refresh === true) {
      yield* put(updateIsRefreshingFamilyMembersAction(true));
    }
    if (body.loadMore === true) {
      yield* put(updateIsLoadingFamilyMembersAction(true));
    }
    const response = yield* apiProxy(getFamilyMembersForCallApi, body);
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
    if (body.showHUD === true) {
      yield* put(closeHUDAction());
    }
    if (body.refresh === true) {
      yield* put(updateIsRefreshingFamilyMembersAction(false));
    }
    if (body.loadMore === true) {
      yield* put(updateIsLoadingFamilyMembersAction(false));
    }
  }
}

function* getChoreFilterMembersSaga({
  body,
}: {
  type: string;
  body: GetChoreFilterMembersRequestType;
}) {
  try {
    if (body.showHUD === true) {
      yield* put(showHUDAction());
    }
    const response = yield* apiProxy(getFamilyMembersApi, body);
    if (response.status === 200) {
      yield* put(
        getChoreFilterMembersSuccessAction(
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
    if (body.showHUD === true) {
      yield* put(closeHUDAction());
    }
  }
}

function* getEventFilterMembersSaga({
  body,
}: {
  type: string;
  body: GetEventFilterMembersRequestType;
}) {
  try {
    if (body.showHUD === true) {
      yield* put(showHUDAction());
    }
    const response = yield* apiProxy(getFamilyMembersApi, body);
    if (response.status === 200) {
      yield* put(
        getEventFilterMembersSuccessAction(
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
    if (body.showHUD === true) {
      yield* put(closeHUDAction());
    }
  }
}

function* updateFocusFamilySaga({
  body,
}: {
  type: string;
  body: FamilyType | undefined;
}) {
  try {
    yield* put(updateFocusFamilySuccessAction(body));
    yield* put(getHomeScreenDataRequestAction());
  } catch (error) {
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
    takeLeading(KICK_FAMILY_MEMBER_REQUEST, kickFamilyMemberSaga),
    takeLeading(UPDATE_FAMILY_INFO_REQUEST, updateFamilyInfoSaga),
    takeLeading(UPDATE_FAMILY_THUMBNAIL_REQUEST, updateFamilyThumbnailSaga),
    takeLeading(GET_FAMILIES_REQUEST, getFamiliesSaga),
    takeLeading(GET_FAMILY_DETAIL_REQUEST, getFamilyDetailSage),
    takeLeading(GET_REFRESH_FAMILY_DETAIL_REQUEST, getRefreshFamilyDetailSage),
    takeLeading(GET_FAMILY_MEMBERS_REQUEST, getFamilyMembersSaga),
    takeLeading(
      GET_FAMILY_MEMBERS_FOR_CALL_REQUEST,
      getFamilyMembersForCallSaga,
    ),
    takeLeading(GET_CHORE_FILTER_MEMBERS_REQUEST, getChoreFilterMembersSaga),
    takeLeading(GET_CHORE_FILTER_MEMBERS_REQUEST, getEventFilterMembersSaga),
    takeLeading(UPDATE_FOCUS_FAMILY_REQUEST, updateFocusFamilySaga),
  ]);
}
