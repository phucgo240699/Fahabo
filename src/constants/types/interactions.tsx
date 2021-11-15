export type ConnectTwilioRequestType = {
  familyId?: number;
  roomCallId?: string;
};

export type NotifyConferenceCallRequestType = {
  familyId?: number;
  participantIds?: number[];
  roomCallId?: string;
};
