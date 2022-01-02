export type MessageType = {
  _id?: string;
  createdAt?: Date;
  timeStamp?: string;
  user?: {
    _id?: number;
    name?: string;
    avatar?: string;
  };
  text?: string;
  cuisinePost?: {
    id: number;
    title?: string;
    thumbnail?: string;
  };
  type: 'text' | 'cuisine_post';
};

export type SendMessageRequestType = {
  _id?: string;
  familyId?: number;
  createdAt?: string;
  timeStamp?: string;
  authorId?: number;
  authorName?: string;
  authorAvatar?: string;
  cuisinePostId?: number;
  cuisinePostTitle?: string;
  cuisinePostThumbnail?: string;
  text?: string;
  type: 'text' | 'cuisine_post';
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
