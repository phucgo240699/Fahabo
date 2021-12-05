import {all, put, select, takeEvery, takeLeading} from 'typed-redux-saga';
import {showToastAction} from '@store/actionTypes/session';
import {ToastType} from '@constants/types/session';
import {apiProxy} from './apiProxy';
import i18n from '@locales/index';
import {parseDataResponse, parseErrorResponse} from '@utils/parsers';
import {
  clearInteractionBadgeSuccessAction,
  clearNotificationBadgeRequestAction,
  clearNotificationBadgeSuccessAction,
  CLEAR_INTERACTION_BADGE_REQUEST,
  CLEAR_NOTIFICATION_BADGE_REQUEST,
  clickNotificationSuccessAction,
  CLICK_NOTIFICATION_REQUEST,
  getBadgesSuccessAction,
  getInteractionBadgeSuccessAction,
  getNotificationBadgeSuccessAction,
  getNotificationsSuccessAction,
  GET_BADGES_REQUEST,
  GET_NOTIFICATIONS_REQUEST,
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
    yield* put(
      showToastAction(i18n.t('errorMessage.general'), ToastType.ERROR),
    );
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
    yield* put(
      showToastAction(i18n.t('errorMessage.general'), ToastType.ERROR),
    );
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
    yield* put(
      showToastAction(i18n.t('errorMessage.general'), ToastType.ERROR),
    );
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
  } catch (error) {
    console.log({error});
  }
}

export default function* () {
  yield* all([
    takeLeading(GET_NOTIFICATIONS_REQUEST, getNotificationsSaga),
    takeLeading(GET_BADGES_REQUEST, getBadgesSaga),
    takeLeading(CLEAR_NOTIFICATION_BADGE_REQUEST, clearNotificationBadgeSaga),
    takeLeading(CLEAR_INTERACTION_BADGE_REQUEST, clearInteractionBadgeSaga),
    takeLeading(CLICK_NOTIFICATION_REQUEST, clickNotificationSaga),
  ]);
}
