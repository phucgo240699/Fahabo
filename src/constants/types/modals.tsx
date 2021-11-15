export enum NotificationNavigationType {
  FAMILY_DETAIL = 'FAMILY_DETAIL',
  CHORE_DETAIL = 'CHORE_DETAIL',
  EVENT_DETAIL = 'EVENT_DETAIL',
  VIDEO_CALL = 'VIDEO_CALL',
}

export type NotificationModalType = {
  title?: string;
  description?: string;
  navigate?: string;
  id?: string;
  familyId?: string;
};
