import {
  ConnectTwilioRequestType,
  NotifyConferenceCallRequestType,
} from '@constants/types/interactions';

export const CONNECT_TWILIO_REQUEST = 'CONNECT_TWILIO_REQUEST';
export const connectTwilioRequestActions = (
  body: ConnectTwilioRequestType,
) => ({
  type: CONNECT_TWILIO_REQUEST,
  body,
});
export const UPDATE_TWILIO_ACCESS_TOKEN = 'UPDATE_TWILIO_ACCESS_TOKEN';
export const updateTwilioAccessTokenAction = (payload: string) => ({
  type: UPDATE_TWILIO_ACCESS_TOKEN,
  payload,
});
export const UPDATE_TWILIO_ROOM_NAME = 'UPDATE_TWILIO_ROOM_NAME';
export const updateTwilioRoomNameAction = (payload?: string) => ({
  type: UPDATE_TWILIO_ROOM_NAME,
  payload,
});

export const NOTIFY_CONFERENCE_CALL_REQUEST = 'NOTIFY_CONFERENCE_CALL_REQUEST';
export const notifyConferenceCallRequestActions = (
  body: NotifyConferenceCallRequestType,
) => ({
  type: NOTIFY_CONFERENCE_CALL_REQUEST,
  body,
});
