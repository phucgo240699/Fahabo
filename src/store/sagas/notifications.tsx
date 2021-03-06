import {all, put, select, takeEvery, takeLeading} from 'typed-redux-saga';
import {showToastAction} from '@store/actionTypes/session';
import {ToastType} from '@constants/types/session';
import {apiProxy} from './apiProxy';
import i18n from '@locales/index';
import {parseDataResponse, parseErrorResponse} from '@utils/parsers';
import {
  clearInteractionBadgeRequestAction,
  clearInteractionBadgeSuccessAction,
  clearNotificationBadgeRequestAction,
  clearNotificationBadgeSuccessAction,
  CLEAR_INTERACTION_BADGE_REQUEST,
  CLEAR_NOTIFICATION_BADGE_REQUEST,
  clickNotificationSuccessAction,
  CLICK_NOTIFICATION_REQUEST,
  getBadgesRequestAction,
  getBadgesSuccessAction,
  getInteractionBadgeSuccessAction,
  getNotificationBadgeSuccessAction,
  getNotificationsRequestAction,
  getNotificationsSuccessAction,
  GET_BADGES_REQUEST,
  GET_NOTIFICATIONS_REQUEST,
  HANDLE_NOTIFICATION_BADGES_WHEN_APP_FOCUS,
  HANDLE_NOTIFICATION_IN_FOREGROUND,
  updateIsGettingNotificationsAction,
  updateIsLoadingMoreNotificationsAction,
  updateIsRefreshingNotificationsAction,
} from '@store/actionTypes/notifications';
import {
  ClearInteractionBadgeRequestType,
  ClickNotificationRequestType,
  GetBadgesRequestType,
  GetNotificationsRequestType,
} from '@constants/types/notifications';
import {
  clearInteractionBadgeApi,
  clearNotificationBadgeApi,
  clickNotificationApi,
  getBadgesApi,
  getNotificationsApi,
} from '@services/notifications';
import {parseNotifications} from '@utils/parsers/notifications';
import {notificationsSelector} from '@store/selectors/notifications';
import {mixNotifications} from '@utils/notifications';
import {AnyAction} from 'redux';
import {isNull} from '@utils/index';
import {focusFamilySelector} from '@store/selectors/family';
import {routeNameSelector} from '@store/selectors/session';
import {StackName} from '@constants/Constants';

function* getNotificationsSaga({
  body,
}: {
  type: string;
  body: GetNotificationsRequestType;
}) {
  try {
    if (body.getting) {
      yield* put(updateIsGettingNotificationsAction(true));
    }
    if (body.refresh) {
      yield* put(updateIsRefreshingNotificationsAction(true));
    }
    if (body.loadMore) {
      yield* put(updateIsLoadingMoreNotificationsAction(true));
    }
    const response = yield* apiProxy(getNotificationsApi, body);
    if (response.status === 200) {
      if (body.page && body.page > 0) {
        const newData = parseNotifications(parseDataResponse(response));
        if (newData.length > 0) {
          const oldData = yield* select(notificationsSelector);
          yield* put(
            getNotificationsSuccessAction(mixNotifications(oldData, newData)),
          );
        }
      } else {
        yield* put(
          getNotificationsSuccessAction(
            parseNotifications(parseDataResponse(response)),
          ),
        );
      }
      if (body.refresh) {
        yield* put(clearNotificationBadgeRequestAction());
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
    if (body.getting) {
      yield* put(updateIsGettingNotificationsAction(false));
    }
    if (body.refresh) {
      yield* put(updateIsRefreshingNotificationsAction(false));
    }
    if (body.loadMore) {
      yield* put(updateIsLoadingMoreNotificationsAction(false));
    }
  }
}

function* getBadgesSaga({body}: {type: string; body: GetBadgesRequestType}) {
  try {
    const response = yield* apiProxy(getBadgesApi, body);
    if (response.status === 200) {
      if (body.onlyInteraction === true) {
        yield* put(
          getInteractionBadgeSuccessAction(
            parseDataResponse(response).countChat,
          ),
        );
      } else if (body.onlyNotification === true) {
        yield* put(
          getNotificationBadgeSuccessAction(
            parseDataResponse(response).countNoti,
          ),
        );
      } else {
        yield* put(getBadgesSuccessAction(parseDataResponse(response)));
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
  }
}

function* clearNotificationBadgeSaga(action: AnyAction) {
  try {
    const response = yield* apiProxy(clearNotificationBadgeApi);
    if (response.status === 200) {
      yield* put(clearNotificationBadgeSuccessAction());
    } else {
      yield* put(
        showToastAction(
          i18n.t(`backend.${parseErrorResponse(response)}`),
          ToastType.ERROR,
        ),
      );
    }
  } catch (error) {
  }
}

function* clearInteractionBadgeSaga({
  body,
}: {
  type: string;
  body: ClearInteractionBadgeRequestType;
}) {
  try {
    const response = yield* apiProxy(clearInteractionBadgeApi, body);
    if (response.status === 200) {
      yield* put(clearInteractionBadgeSuccessAction());
    } else {
      yield* put(
        showToastAction(
          i18n.t(`backend.${parseErrorResponse(response)}`),
          ToastType.ERROR,
        ),
      );
    }
  } catch (error) {
  }
}

function* clickNotificationSaga({
  body,
}: {
  type: string;
  body: ClickNotificationRequestType;
}) {
  try {
    const response = yield* apiProxy(clickNotificationApi, body);
    if (response.status === 200) {
      yield* put(clickNotificationSuccessAction(body.id));
    }
  } catch (error) {}
}

function* handleNotificationInForegroundSaga(action: AnyAction) {
  const focusFamily = yield* select(focusFamilySelector);
  if (!isNull(focusFamily?.id)) {
    const routeName = yield* select(routeNameSelector);
    switch (routeName) {
      case StackName.InteractionsStack:
        yield* all([
          put(clearInteractionBadgeRequestAction({familyId: focusFamily?.id})),
          put(
            getBadgesRequestAction({
              familyId: focusFamily?.id,
              onlyNotification: true,
            }),
          ),
        ]);
        break;
      case StackName.NotificationsStack:
        yield* all([
          put(clearNotificationBadgeRequestAction()),
          put(
            getBadgesRequestAction({
              familyId: focusFamily?.id,
              onlyInteraction: true,
            }),
          ),
          put(getNotificationsRequestAction({getting: true})),
        ]);
        break;
      default:
        yield* put(getBadgesRequestAction({familyId: focusFamily?.id}));
        break;
    }
  }
}

function* handleNotificationWhenAppFocusSaga(action: AnyAction) {
  try {
    const focusFamily = yield* select(focusFamilySelector);
    if (!isNull(focusFamily?.id)) {
      const routeName = yield* select(routeNameSelector);
      switch (routeName) {
        case StackName.HomeStack:
          if (!isNull(focusFamily?.id)) {
            yield* put(getBadgesRequestAction({familyId: focusFamily?.id}));
          }
          break;
        case StackName.InteractionsStack:
          if (!isNull(focusFamily?.id)) {
            yield* all([
              put(
                clearInteractionBadgeRequestAction({familyId: focusFamily?.id}),
              ),
              put(
                getBadgesRequestAction({
                  familyId: focusFamily?.id,
                  onlyNotification: true,
                }),
              ),
            ]);
          }
          break;
        case StackName.FamilyStack:
          yield* put(getBadgesRequestAction({familyId: focusFamily?.id}));
          break;
        case StackName.NotificationsStack:
          if (!isNull(focusFamily?.id)) {
            yield* all([
              put(clearNotificationBadgeRequestAction()),
              put(
                getBadgesRequestAction({
                  familyId: focusFamily?.id,
                  onlyInteraction: true,
                }),
              ),
              put(getNotificationsRequestAction({})),
            ]);
          }
          break;
        case StackName.ProfileStack:
          yield* put(getBadgesRequestAction({familyId: focusFamily?.id}));
          break;
        default:
          break;
      }
    }
  } catch (error) {}
}

export default function* () {
  yield* all([
    takeLeading(GET_NOTIFICATIONS_REQUEST, getNotificationsSaga),
    takeLeading(GET_BADGES_REQUEST, getBadgesSaga),
    takeLeading(CLEAR_NOTIFICATION_BADGE_REQUEST, clearNotificationBadgeSaga),
    takeLeading(CLEAR_INTERACTION_BADGE_REQUEST, clearInteractionBadgeSaga),
    takeLeading(CLICK_NOTIFICATION_REQUEST, clickNotificationSaga),
    takeEvery(
      HANDLE_NOTIFICATION_IN_FOREGROUND,
      handleNotificationInForegroundSaga,
    ),
    takeEvery(
      HANDLE_NOTIFICATION_BADGES_WHEN_APP_FOCUS,
      handleNotificationWhenAppFocusSaga,
    ),
  ]);
}
