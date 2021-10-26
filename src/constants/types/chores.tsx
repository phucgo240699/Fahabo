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
  assigneeIds?: (number | undefined)[];
  photos?: (string | undefined)[]; // base64 string
};

export type UpdateChoreRequestType = {
  choreId?: number;
  status?: ChoreStatus;
  title?: string;
  description?: string;
  deadline?: string; // dd-mm-yyyy
  assigneeIds?: number[];
  photos?: string[];
};

export type DeleteChoreRequestType = {
  choreId: number;
};

export type GetChoresRequestType = {
  showHUD?: boolean;
  refresh?: boolean;
  loadMore?: boolean;
  familyId?: number;
  assigneeIds?: number;
  statuses?: ChoreStatus;
  searchText?: string;
  sortBy?: string;
  from?: string; // dd-mm-yyyy
  page?: number;
  size?: number;
};

export type GetChorePhotosRequestType = {
  choreId: number;
};

//
// Response
//
export type AssigneeType = {
  memberId?: number;
  name?: string;
  avatar?: string;
};
export type ChoreType = {
  id?: number;
  title?: string;
  description?: string;
  status?: string;
  deadline?: string;
  assignees?: AssigneeType[];
};
