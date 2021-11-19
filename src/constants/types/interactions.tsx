export type MessageType = {
  id: number;
  text?: string;
  displayName?: string;
  avatar?: string;
};

export type SendMessageRequestType = {
  _id?: string;
  familyId?: number;
  text?: string;
  createdAt?: string;
  authorId?: number;
  timeStamp?: string;
  type: 'text' | 'video_call';
};

export type ConnectTwilioRequestType = {
  familyId?: number;
  roomCallId?: string;
  participantIds?: number[];
};

export type NotifyConferenceCallRequestType = {
  familyId?: number;
  participantIds?: number[];
  roomCallId?: string;
};
