import {RootState} from '@store/index';

export const eventsSelector = (state: RootState) => state.events.events;

export const eventPhotosSelector = (state: RootState) =>
  state.events.eventPhotos;

export const eventDetailSelector = (state: RootState) =>
  state.events.eventDetail;

export const calendarEventBeginSelector = (state: RootState) =>
  state.events.calendarEventBegin;

export const calendarEventEndSelector = (state: RootState) =>
  state.events.calendarEventEnd;

export const datesContainEventsSelector = (state: RootState) =>
  state.events.datesContainEvents;
