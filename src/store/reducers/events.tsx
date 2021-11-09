import {PhotoType} from '@constants/types/albums';
import {EventType} from '@constants/types/events';
import {
  CREATE_EVENT_SUCCESS,
  DELETE_EVENT_SUCCESS,
  GET_EVENT_PHOTOS_SUCCESS,
  GET_EVENTS_SUCCESS,
  UPDATE_EVENT_SUCCESS,
  GET_DATES_CONTAIN_EVENTS_SUCCESS,
} from '@store/actionTypes/events';
import {LOG_OUT} from '@store/actionTypes/signIn';
import {AnyAction} from 'redux';

export type EventsState = {
  events: EventType[];
  eventPhotos: PhotoType[];
  datesContainEvents: string[];
};

const defaultState: EventsState = {
  events: [],
  eventPhotos: [],
  datesContainEvents: [],
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
    case GET_DATES_CONTAIN_EVENTS_SUCCESS:
      return {
        ...state,
        datesContainEvents: action.payload,
      };
    case LOG_OUT:
      return {
        ...state,
        events: [],
        eventPhotos: [],
        datesContainEvents: [],
      };
    default:
      return state;
  }
}
