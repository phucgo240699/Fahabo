import {BASE_URL, Pagination} from '@constants/Constants';
import {
  CreateEventRequestType,
  DeleteEventRequestType,
  GetDatesContainEventsRequestType,
  GetEventDetailRequestType,
  GetEventPhotosRequestType,
  GetEventsRequestType,
  UpdateEventRequestType,
} from '@constants/types/events';
import {isNull} from '@utils/index';
import {apiProvider} from './apiProvider';

export function createEventApi(
  accessToken?: string,
  body?: CreateEventRequestType,
) {
  return new apiProvider(accessToken).post(
    `${BASE_URL}/events/new_event`,
    body,
  );
}

export function updateEventApi(
  accessToken?: string,
  body?: UpdateEventRequestType,
) {
  return new apiProvider(accessToken).post(
    `${BASE_URL}/events/update_event`,
    body,
  );
}

export function deleteEventApi(
  accessToken?: string,
  body?: DeleteEventRequestType,
) {
  return new apiProvider(accessToken).post(
    `${BASE_URL}/events/delete_event`,
    body,
  );
}

export function getEventsApi(
  accessToken?: string,
  body?: GetEventsRequestType,
) {
  let page = 0;
  let size = Pagination.Events;
  if (!isNull(body)) {
    if (!isNull(body?.page)) {
      page = body?.page ?? 0;
    }
    if (!isNull(body?.size)) {
      size = body?.size ?? Pagination.Events;
    }
  }
  return new apiProvider(accessToken).post(
    `${BASE_URL}/events?page=${page}&size=${size}`,
    body,
  );
}

export function getEventPhotosApi(
  accessToken?: string,
  body?: GetEventPhotosRequestType,
) {
  let page = 0;
  let size = Pagination.EventPhotos;
  if (!isNull(body)) {
    if (!isNull(body?.page)) {
      page = body?.page ?? 0;
    }
    if (!isNull(body?.size)) {
      size = body?.size ?? Pagination.EventPhotos;
    }
  }
  return new apiProvider(accessToken).post(
    `${BASE_URL}/events/get_event_photos?page=${page}&size=${size}`,
    body,
  );
}

export function getEventDetailApi(
  accessToken?: string,
  body?: GetEventDetailRequestType,
) {
  return new apiProvider(accessToken).post(`${BASE_URL}/events/detail`, body);
}

export function getDatesContainEventsApi(
  accessToken?: string,
  body?: GetDatesContainEventsRequestType,
) {
  return new apiProvider(accessToken).post(
    `${BASE_URL}/events/dates_contain_events`,
    body,
  );
}
