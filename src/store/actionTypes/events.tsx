import {PhotoType} from '@constants/types/albums';
import {
  CreateEventRequestType,
  DeleteEventRequestType,
  EventType,
  GetDatesContainEventsRequestType,
  GetEventPhotosRequestType,
  GetEventsRequestType,
  UpdateEventRequestType,
} from '@constants/types/events';

// Create
export const CREATE_EVENT_REQUEST = 'CREATE_EVENT_REQUEST';
export const createEventRequestAction = (body: CreateEventRequestType) => ({
  type: CREATE_EVENT_REQUEST,
  body,
});
export const CREATE_EVENT_SUCCESS = 'CREATE_EVENT_SUCCESS';
export const createEventSuccessAction = (payload: EventType) => ({
  type: CREATE_EVENT_SUCCESS,
  payload,
});

// Update
export const UPDATE_EVENT_REQUEST = 'UPDATE_EVENT_REQUEST';
export const updateEventRequestAction = (body: UpdateEventRequestType) => ({
  type: UPDATE_EVENT_REQUEST,
  body,
});
export const UPDATE_EVENT_SUCCESS = 'UPDATE_EVENT_SUCCESS';
export const updateEventSuccessAction = (payload: EventType) => ({
  type: UPDATE_EVENT_SUCCESS,
  payload,
});

// Delete
export const DELETE_EVENT_REQUEST = 'DELETE_EVENT_REQUEST';
export const deleteEventRequestAction = (body: DeleteEventRequestType) => ({
  type: DELETE_EVENT_REQUEST,
  body,
});
export const DELETE_EVENT_SUCCESS = 'DELETE_EVENT_SUCCESS';
export const deleteEventSuccessAction = (payload: number) => ({
  type: DELETE_EVENT_SUCCESS,
  payload,
});

// Get Events
export const GET_EVENTS_REQUEST = 'GET_EVENTS_REQUEST';
export const getEventsRequestAction = (body: GetEventsRequestType) => ({
  type: GET_EVENTS_REQUEST,
  body,
});
export const GET_EVENTS_SUCCESS = 'GET_EVENTS_SUCCESS';
export const getEventsSuccessAction = (payload: EventType[]) => ({
  type: GET_EVENTS_SUCCESS,
  payload,
});

// Get Event Photos
export const GET_EVENT_PHOTOS_REQUEST = 'GET_EVENT_PHOTOS_REQUEST';
export const getEventPhotosRequestAction = (
  body: GetEventPhotosRequestType,
) => ({
  type: GET_EVENT_PHOTOS_REQUEST,
  body,
});
export const GET_EVENT_PHOTOS_SUCCESS = 'GET_EVENT_PHOTOS_SUCCESS';
export const getEventPhotosSuccessAction = (payload: PhotoType[]) => ({
  type: GET_EVENT_PHOTOS_SUCCESS,
  payload,
});

// Get Dates
export const GET_DATES_CONTAIN_EVENTS_REQUEST =
  'GET_DATES_CONTAIN_EVENTS_REQUEST';
export const getDatesContainEventsRequestAction = (
  body: GetDatesContainEventsRequestType,
) => ({
  type: GET_DATES_CONTAIN_EVENTS_REQUEST,
  body,
});
export const GET_DATES_CONTAIN_EVENTS_SUCCESS =
  'GET_DATES_CONTAIN_EVENTS_REQUEST';
export const getDatesContainEventsSuccessAction = (payload: string[]) => ({
  type: GET_DATES_CONTAIN_EVENTS_SUCCESS,
  payload,
});
