import {PhotoType} from '@constants/types/albums';
import {EventType} from '@constants/types/events';
import {
  CREATE_EVENT_SUCCESS,
  DELETE_EVENT_SUCCESS,
  GET_EVENT_PHOTOS_SUCCESS,
  GET_EVENTS_SUCCESS,
  UPDATE_EVENT_SUCCESS,
  GET_DATES_CONTAIN_EVENTS_SUCCESS,
  GET_EVENT_DETAIL_SUCCESS,
  UPDATE_CALENDAR_EVENT_RANGE_SUCCESS,
  UPDATE_IS_REFRESHING_EVENTS,
  UPDATE_IS_REFRESHING_EVENT_PHOTOS,
  UPDATE_IS_REFRESHING_DATES_CONTAIN_EVENTS,
  UPDATE_IS_LOADING_EVENTS,
  UPDATE_IS_LOADING_EVENT_PHOTOS,
} from '@store/actionTypes/events';
import {LOG_OUT} from '@store/actionTypes/signIn';
import {AnyAction} from 'redux';

export type EventsState = {
  events: EventType[];
  eventPhotos: PhotoType[];
  eventDetail?: EventType;
  calendarEventBegin?: string;
  calendarEventEnd?: string;
  datesContainEvents: string[];

  // Refresh
  isRefreshingEvents: boolean;
  isRefreshingEventPhotos: boolean;
  isRefreshingDatesContainEvents: boolean;

  // Load more
  isLoadingEvents: boolean;
  isLoadingEventPhotos: boolean;
};

const defaultState: EventsState = {
  events: [],
  eventPhotos: [],
  eventDetail: undefined,
  calendarEventBegin: undefined,
  calendarEventEnd: undefined,
  datesContainEvents: [],

  // Refresh
  isRefreshingEvents: false,
  isRefreshingEventPhotos: false,
  isRefreshingDatesContainEvents: false,

  // Load more
  isLoadingEvents: false,
  isLoadingEventPhotos: false,
};

export default function eventsReducer(state = defaultState, action: AnyAction) {
  switch (action.type) {
    case CREATE_EVENT_SUCCESS:
      return {
        ...state,
        events: [action.payload, ...state.events],
      };
    case UPDATE_EVENT_SUCCESS:
      return {
        ...state,
        events: state.events.map(item => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        }),
      };
    case DELETE_EVENT_SUCCESS:
      return {
        ...state,
        events: state.events.filter(item => {
          return item.id !== action.payload;
        }),
      };
    case GET_EVENTS_SUCCESS:
      return {
        ...state,
        events: action.payload,
      };
    case GET_EVENT_PHOTOS_SUCCESS:
      return {
        ...state,
        eventPhotos: action.payload,
      };
    case GET_EVENT_DETAIL_SUCCESS:
      return {
        ...state,
        eventDetail: action.payload,
      };
    case UPDATE_CALENDAR_EVENT_RANGE_SUCCESS:
      return {
        ...state,
        calendarEventBegin: action.payload.calendarEventBegin,
        calendarEventEnd: action.payload.calendarEventEnd,
      };
    case GET_DATES_CONTAIN_EVENTS_SUCCESS:
      return {
        ...state,
        datesContainEvents: action.payload,
      };

    // Refresh
    case UPDATE_IS_REFRESHING_EVENTS:
      return {
        ...state,
        isRefreshingEvents: action.payload,
      };
    case UPDATE_IS_REFRESHING_EVENT_PHOTOS:
      return {
        ...state,
        isRefreshingEventPhotos: action.payload,
      };
    case UPDATE_IS_REFRESHING_DATES_CONTAIN_EVENTS:
      return {
        ...state,
        isRefreshingDatesContainEvents: action.payload,
      };

    // Loading
    case UPDATE_IS_LOADING_EVENTS:
      return {
        ...state,
        isLoadingEvents: action.payload,
      };
    case UPDATE_IS_LOADING_EVENT_PHOTOS:
      return {
        ...state,
        isLoadingEventPhotos: action.payload,
      };
    case LOG_OUT:
      return {
        ...state,
        events: [],
        eventPhotos: [],
        eventDetail: undefined,
        calendarEventBegin: undefined,
        calendarEventEnd: undefined,
        datesContainEvents: [],

        // Refresh
        isRefreshingEvents: false,
        isRefreshingEventPhotos: false,
        isRefreshingDatesContainEvents: false,
        // Load More
        isLoadingEvents: false,
        isLoadingEventPhotos: false,
      };
    default:
      return state;
  }
}
