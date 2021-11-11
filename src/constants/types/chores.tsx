import {PhotoType} from '@constants/types/albums';
//
// Enum
//
export enum ChoreStatus {
  DONE = 'DONE',
  IN_PROGRESS = 'IN_PROGRESS',
  EXPIRED = 'EXPIRED',
}

export enum RepeatType {
  NONE = 'NONE',
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
}

//
// Request
//
export type CreateChoreRequestType = {
  familyId?: number;
  status?: ChoreStatus;
  title?: string;
  description?: string;
  deadline?: string; // dd-mm-yyyy
  repeatType?: string;
  assigneeIds?: (number | undefined)[];
  photos?: (string | undefined)[]; // base64 string
};

export type UpdateChoreRequestType = {
  goBack?: boolean;
  choreId?: number;
  status?: ChoreStatus;
  title?: string;
  description?: string;
  deadline?: string; // dd-mm-yyyy
  repeatType?: string;
  assigneeIds?: (number | undefined)[];
  photos?: (string | undefined)[];
  deletePhotos?: number[];
};

export type DeleteChoreRequestType = {
  choreId?: number;
};

export type GetChoresRequestType = {
  showHUD?: boolean;
  refresh?: boolean;
  loadMore?: boolean;
  familyId?: number;
  assigneeIds?: (number | undefined)[];
  statuses?: ChoreStatus[];
  searchText?: string;
  sortBy?: string;
  from?: string; // dd-mm-yyyy
  page?: number;
  size?: number;
};

export type GetChorePhotosRequestType = {
  showHUD?: boolean;
  refresh?: boolean;
  loadMore?: boolean;
  choreId?: number;
  page?: number;
  size?: number;
};

export type GetChoreDetailRequestType = {
  choreId?: number;
};

//
// Response
//
export type AssigneeType = {
  id?: number;
  name?: string;
  avatar?: string;
  isHost?: boolean;
};
export type ChoreType = {
  id?: number;
  title?: string;
  status?: string;
  deadline?: string;
  repeatType?: string;
  description?: string;
  assignees?: AssigneeType[];
};
