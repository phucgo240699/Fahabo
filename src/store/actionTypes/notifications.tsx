import {
  ClearInteractionBadgeRequestType,
  ClickNotificationRequestType,
  GetBadgesRequestType,
  GetBadgesResponseType,
  GetNotificationsRequestType,
  NotificationType,
} from '@constants/types/notifications';

// Get Notifications
export const GET_NOTIFICATIONS_REQUEST = 'GET_NOTIFICATIONS_REQUEST';
export const getNotificationsRequestAction = (
  body: GetNotificationsRequestType,
) => ({
  type: GET_NOTIFICATIONS_REQUEST,
  body,
});
export const GET_NOTIFICATIONS_SUCCESS = 'GET_NOTIFICATIONS_SUCCESS';
export const getNotificationsSuccessAction = (payload: NotificationType[]) => ({
  type: GET_NOTIFICATIONS_SUCCESS,
  payload,
});

// Badges
export const GET_BADGES_REQUEST = 'GET_BADGES_REQUEST';
export const getBadgesRequestAction = (body: GetBadgesRequestType) => ({
  type: GET_BADGES_REQUEST,
  body,
});
export const GET_BADGES_SUCCESS = 'GET_BADGES_SUCCESS';
export const getBadgesSuccessAction = (payload: GetBadgesResponseType) => ({
  type: GET_BADGES_SUCCESS,
  payload,
});
export const GET_INTERACTION_BADGE_SUCCESS = 'GET_INTERACTION_BADGE_SUCCESS';
export const getInteractionBadgeSuccessAction = (payload: number) => ({
  type: GET_INTERACTION_BADGE_SUCCESS,
  payload,
});
export const GET_NOTIFICATION_BADGE_SUCCESS = 'GET_NOTIFICATION_BADGE_SUCCESS';
export const getNotificationBadgeSuccessAction = (payload: number) => ({
  type: GET_NOTIFICATION_BADGE_SUCCESS,
  payload,
});

// Clear Notification Badge
export const CLEAR_NOTIFICATION_BADGE_REQUEST =
  'CLEAR_NOTIFICATION_BADGE_REQUEST';
export const clearNotificationBadgeRequestAction = () => ({
  type: CLEAR_NOTIFICATION_BADGE_REQUEST,
});
export const CLEAR_NOTIFICATION_BADGE_SUCCESS =
  'CLEAR_NOTIFICATION_BADGE_SUCCESS';
export const clearNotificationBadgeSuccessAction = () => ({
  type: CLEAR_NOTIFICATION_BADGE_SUCCESS,
});

// Clear Interaction Badge
export const CLEAR_INTERACTION_BADGE_REQUEST =
  'CLEAR_INTERACTION_BADGE_REQUEST';
export const clearInteractionBadgeRequestAction = (
  body: ClearInteractionBadgeRequestType,
) => ({
  type: CLEAR_INTERACTION_BADGE_REQUEST,
  body,
});
export const CLEAR_INTERACTION_BADGE_SUCCESS =
  'CLEAR_INTERACTION_BADGE_SUCCESS';
export const clearInteractionBadgeSuccessAction = () => ({
  type: CLEAR_INTERACTION_BADGE_SUCCESS,
});

// Click notification
export const CLICK_NOTIFICATION_REQUEST = 'CLICK_NOTIFICATION_REQUEST';
export const clickNotificationRequestAction = (
  body: ClickNotificationRequestType,
) => ({
  type: CLICK_NOTIFICATION_REQUEST,
  body,
});
export const CLICK_NOTIFICATION_SUCCESS = 'CLICK_NOTIFICATION_SUCCESS';
export const clickNotificationSuccessAction = (payload?: number) => ({
  type: CLICK_NOTIFICATION_SUCCESS,
  payload,
});

// Handle
export const HANDLE_NOTIFICATION_IN_FOREGROUND =
  'HANDLE_NOTIFICATION_IN_FOREGROUND';
export const handleNotificationInForegroundAction = () => ({
  type: HANDLE_NOTIFICATION_IN_FOREGROUND,
});

export const HANDLE_NOTIFICATION_BADGES_WHEN_APP_FOCUS =
  'HANDLE_NOTIFICATION_BADGES_WHEN_APP_FOCUS';
export const handleNotificationWhenAppFocusAction = () => ({
  type: HANDLE_NOTIFICATION_BADGES_WHEN_APP_FOCUS,
});

// Session
export const UPDATE_IS_GETTING_NOTIFICATIONS =
  'UPDATE_IS_GETTING_NOTIFICATIONS';
export const updateIsGettingNotificationsAction = (payload: boolean) => ({
  type: UPDATE_IS_GETTING_NOTIFICATIONS,
  payload,
});
export const UPDATE_IS_REFRESHING_NOTIFICATIONS =
  'UPDATE_IS_REFRESHING_NOTIFICATIONS';
export const updateIsRefreshingNotificationsAction = (payload: boolean) => ({
  type: UPDATE_IS_REFRESHING_NOTIFICATIONS,
  payload,
});
export const UPDATE_IS_LOADING_MORE_NOTIFICATIONS =
  'UPDATE_IS_LOADING_MORE_NOTIFICATIONS';
export const updateIsLoadingMoreNotificationsAction = (payload: boolean) => ({
  type: UPDATE_IS_LOADING_MORE_NOTIFICATIONS,
  payload,
});
