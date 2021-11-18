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
};

export type ConnectTwilioRequestType = {
  familyId?: number;
  roomCallId?: string;
};

export type NotifyConferenceCallRequestType = {
  familyId?: number;
  participantIds?: number[];
  roomCallId?: string;
};
