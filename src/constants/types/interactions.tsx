export type MessageType = {
  _id?: string;
  text?: string;
  createdAt?: Date;
  user?: {
    _id?: number;
    name?: string;
    avatar?: string;
  };
  timeStamp?: string;
  type: 'text' | 'cuisine_post';
};

export type SendMessageRequestType = {
  _id?: string;
  text?: string;
  familyId?: number;
  createdAt?: string;
  timeStamp?: string;
  type: 'text' | 'cuisine_post';
  authorId?: number;
  authorName?: string;
  authorAvatar?: string;
};

export type NotifyNewMessageRequestType = {
  familyId?: number;
};

export type ConnectTwilioRequestType = {
  familyId?: number;
  roomCallId?: string; // is roomName
  participantIds?: number[];
};

export type NotifyConferenceCallRequestType = {
  familyId?: number;
  participantIds?: number[];
  roomCallId?: string;
};
