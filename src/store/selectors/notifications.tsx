import {RootState} from '@store/index';

export const notificationsSelector = (state: RootState) =>
  state.notifications.notifications;

export const isGettingNotificationSelector = (state: RootState) =>
  state.notifications.isGetting;

export const isRefreshingNotificationSelector = (state: RootState) =>
  state.notifications.isRefreshing;

export const isLoadingMoreNotificationSelector = (state: RootState) =>
  state.notifications.isLoadingMore;

export const interactionBadgeSelector = (state: RootState) =>
  state.notifications.interactionBadge;

export const notificationBadgeSelector = (state: RootState) =>
  state.notifications.notificationBadge;
