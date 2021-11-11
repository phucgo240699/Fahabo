import {NotificationModalType} from '@constants/types/modals';

export const SHOW_RESET_PASSWORD_LINK_MODAL = 'SHOW_RESET_PASSWORD_LINK_MODAL';
export const showResetPasswordLinkModalAction = (payload: string) => ({
  type: SHOW_RESET_PASSWORD_LINK_MODAL,
  payload,
});

export const CLOSE_RESET_PASSWORD_LINK_MODAL =
  'CLOSE_RESET_PASSWORD_LINK_MODAL';
export const closeResetPasswordLinkModalAction = () => ({
  type: CLOSE_RESET_PASSWORD_LINK_MODAL,
});

export const SHOW_NOTIFICATION_MODAL = 'SHOW_NOTIFICATION_MODAL';
export const showNotificationModalAction = (
  payload: NotificationModalType,
) => ({
  type: SHOW_NOTIFICATION_MODAL,
  payload,
});

export const CLOSE_NOTIFICATION_MODAL = 'CLOSE_NOTIFICATION_MODAL';
export const closeNotificationModalAction = () => ({
  type: CLOSE_NOTIFICATION_MODAL,
});
