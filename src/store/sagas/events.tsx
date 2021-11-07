import {
  CreateEventRequestType,
  DeleteEventRequestType,
  GetEventPhotosRequestType,
  GetEventsRequestType,
  UpdateEventRequestType,
} from '@constants/types/events';
import {ToastType} from '@constants/types/session';
import i18n from '@locales/index';
import {
  createEventApi,
  deleteEventApi,
  getEventPhotosApi,
  getEventsApi,
  updateEventApi,
} from '@services/events';
import {
  createEventSuccessAction,
  CREATE_EVENT_REQUEST,
  deleteEventSuccessAction,
  DELETE_EVENT_REQUEST,
  getEventPhotosSuccessAction,
  getEventsRequestAction,
  getEventsSuccessAction,
  GET_EVENTS_REQUEST,
  GET_EVENT_PHOTOS_REQUEST,
  updateEventSuccessAction,
  UPDATE_EVENT_REQUEST,
} from '@store/actionTypes/events';
import {
  closeHUDAction,
  showHUDAction,
  showToastAction,
  updateIsLoadingEventPhotosAction,
  updateIsLoadingEventsAction,
  updateIsRefreshingEventPhotosAction,
  updateIsRefreshingEventsAction,
} from '@store/actionTypes/session';
import {eventPhotosSelector, eventsSelector} from '@store/selectors/events';
import {mixPhotos} from '@utils/albums';
import {mixEvents} from '@utils/events';
import {parseDataResponse, parseErrorResponse} from '@utils/parsers';
import {parsePhotos} from '@utils/parsers/albums';
import {parseEvent, parseEvents} from '@utils/parsers/events';
import {all, put, select, takeLeading} from 'typed-redux-saga';
import {apiProxy} from './apiProxy';
import {navigate, navigationRef} from '@navigators/index';
import {CommonActions} from '@react-navigation/native';
import {focusFamilySelector} from '@store/selectors/family';
import {isNull} from '@utils/index';
import {ScreenName} from '@constants/Constants';

function* createEventSaga({
  body,
}: {
  type: string;
  body: CreateEventRequestType;
}) {
  try {
    yield* put(showHUDAction());
    const response = yield* apiProxy(createEventApi, body);
    if (response.status === 200) {
      yield* put(
        createEventSuccessAction(parseEvent(parseDataResponse(response))),
      );
      yield* put(
        showToastAction(
          i18n.t('successMessage.createEvent'),
          ToastType.SUCCESS,
        ),
      );
      navigationRef.current?.dispatch(CommonActions.goBack());
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

function* updateEventSaga({
  body,
}: {
  type: string;
  body: UpdateEventRequestType;
}) {
  try {
    yield* put(showHUDAction());
    const response = yield* apiProxy(updateEventApi, body);
    if (response.status === 200) {
      // yield* put(
      //   updateEventSuccessAction(parseEvent(parseDataResponse(response))),
      // );

      yield* put(
        showToastAction(
          i18n.t('successMessage.updateEvent'),
          ToastType.SUCCESS,
        ),
      );
      navigationRef.current?.dispatch(CommonActions.goBack());
      navigationRef.current?.dispatch(CommonActions.goBack());
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

function* deleteEventSaga({
  body,
}: {
  type: string;
  body: DeleteEventRequestType;
}) {
  try {
    yield* put(showHUDAction());
    const response = yield* apiProxy(deleteEventApi, body);
    if (response.status === 200) {
      // yield* put(deleteEventSuccessAction(parseDataResponse(response)));

      yield* put(
        showToastAction(
          i18n.t('successMessage.deleteEvent'),
          ToastType.SUCCESS,
        ),
      );
      navigationRef.current?.dispatch(CommonActions.goBack());
      // navigationRef.current?.dispatch(CommonActions.goBack());
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

function* getEventsSaga({body}: {type: string; body: GetEventsRequestType}) {
  try {
    if (body.showHUD) {
      yield* put(showHUDAction());
    }
    if (body.refresh) {
      yield* put(updateIsRefreshingEventsAction(true));
    }
    if (body.loadMore) {
      yield* put(updateIsLoadingEventsAction(true));
    }
    const response = yield* apiProxy(getEventsApi, body);
    if (response.status === 200) {
      if (body.page && body.page > 0) {
        const newData = parseEvents(parseDataResponse(response));
        if (newData.length > 0) {
          const oldData = yield* select(eventsSelector);
          yield* put(getEventsSuccessAction(mixEvents(oldData, newData)));
        }
      } else {
        yield* put(
          getEventsSuccessAction(parseEvents(parseDataResponse(response))),
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
    }
    if (body.refresh) {
      yield* put(updateIsRefreshingEventsAction(false));
    }
    if (body.loadMore) {
      yield* put(updateIsLoadingEventsAction(false));
    }
  }
}

function* getEventPhotosSaga({
  body,
}: {
  type: string;
  body: GetEventPhotosRequestType;
}) {
  try {
    if (body.showHUD) {
      yield* put(showHUDAction());
    }
    if (body.refresh) {
      yield* put(updateIsRefreshingEventPhotosAction(true));
    }
    if (body.loadMore) {
      yield* put(updateIsLoadingEventPhotosAction(true));
    }
    const response = yield* apiProxy(getEventPhotosApi, body);
    if (response.status === 200) {
      if (body.page && body.page > 0) {
        const newData = parsePhotos(parseDataResponse(response));
        if (newData.length > 0) {
          const oldData = yield* select(eventPhotosSelector);
          yield* put(getEventPhotosSuccessAction(mixPhotos(oldData, newData)));
        }
      } else {
        yield* put(
          getEventPhotosSuccessAction(parsePhotos(parseDataResponse(response))),
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
    }
    if (body.refresh) {
      yield* put(updateIsRefreshingEventPhotosAction(false));
    }
    if (body.loadMore) {
      yield* put(updateIsLoadingEventPhotosAction(false));
    }
  }
}

export default function* () {
  yield* all([
    takeLeading(CREATE_EVENT_REQUEST, createEventSaga),
    takeLeading(UPDATE_EVENT_REQUEST, updateEventSaga),
    takeLeading(DELETE_EVENT_REQUEST, deleteEventSaga),
    takeLeading(GET_EVENTS_REQUEST, getEventsSaga),
    takeLeading(GET_EVENT_PHOTOS_REQUEST, getEventPhotosSaga),
  ]);
}
