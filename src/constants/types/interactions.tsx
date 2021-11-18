export type MessageType = {
  id: number;
  text?: string;
  displayName?: string;
  avatar?: string;
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
