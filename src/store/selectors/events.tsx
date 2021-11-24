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

//
// Refresh
//
export const isRefreshingEventsSelector = (state: RootState) =>
  state.events.isRefreshingEvents;

export const isRefreshingEventPhotosSelector = (state: RootState) =>
  state.events.isRefreshingEventPhotos;

export const isRefreshingDatesContainEventsSelector = (state: RootState) =>
  state.events.isRefreshingDatesContainEvents;

//
// Load More
//
export const isLoadingEventsSelector = (state: RootState) =>
  state.events.isLoadingEvents;

export const isLoadingEventPhotosSelector = (state: RootState) =>
  state.events.isLoadingEventPhotos;
