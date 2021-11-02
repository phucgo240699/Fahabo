//
// Request

import {AssigneeType} from './chores';

//
export type CreateEventRequestType = {
  familyId?: number;
  title?: string;
  description?: string;
  from?: string; // dd-mm-yyyy
  to?: string; // dd-mm-yyyy
  repeatType?: string;
  assigneeIds?: (number | undefined)[];
  photos?: (string | undefined)[]; // base64 string
};

export type UpdateEventRequestType = {
  goBack?: boolean;
  eventId?: number;
  isDone?: boolean;
  title?: string;
  description?: string;
  from?: string; // dd-mm-yyyy
  to?: string; // dd-mm-yyyy
  repeatType?: string;
  assigneeIds?: (number | undefined)[];
  photos?: (string | undefined)[];
  deletePhotos?: number[];
};

export type DeleteEventRequestType = {
  eventId?: number;
};

export type GetEventsRequestType = {
  showHUD?: boolean;
  refresh?: boolean;
  loadMore?: boolean;
  familyId?: number;
  searchText?: string;
  assigneeIds?: (number | undefined)[];
  sortBy?: string;
  from?: string; // dd-mm-yyyy
  to?: string; // dd-mm-yyyy
  page?: number;
  size?: number;
};

export type GetEventPhotosRequestType = {
  showHUD?: boolean;
  refresh?: boolean;
  loadMore?: boolean;
  eventId?: number;
  page?: number;
  size?: number;
};

//
// Response
//
export type EventType = {
  id?: number;
  title?: string;
  description?: string;
  from?: string; // dd-mm-yyyy
  to?: string; // dd-mm-yyyy
  repeatType?: string;
  assignees?: AssigneeType[];
};
