export type GetNotificationsRequestType = {
  getting?: boolean;
  refresh?: boolean;
  loadMore?: boolean;
  page?: number;
  size?: number;
};

export type GetBadgesRequestType = {
  familyId?: number;
  onlyInteraction?: boolean;
  onlyNotification?: boolean;
};

export type ClearInteractionBadgeRequestType = {
  familyId?: number;
};

export type ClickNotificationRequestType = {
  id?: number;
};

export type GetBadgesResponseType = {
  interactionBadge?: number;
  notificationBadge?: number;
};

export type NotificationDataType = {
  navigate?: string;
  id?: number;
  familyId?: number;
};

export type NotificationType = {
  id?: number;
  type?: 'CHORE' | 'EVENT' | 'VIDEO_CALL';
  title?: string;
  description?: string;
  data?: NotificationDataType;
  isClicked?: boolean;
  createdAt?: string;
};
