import {
  UPDATE_TWILIO_ACCESS_TOKEN,
  UPDATE_TWILIO_ROOM_NAME,
} from '@store/actionTypes/interactions';
import {LOG_OUT} from '@store/actionTypes/signIn';
import {AnyAction} from 'redux';

export type InteractionsState = {
  twilioAccessToken?: string;
  twilioRoomName?: string;
};

const defaultState: InteractionsState = {
  twilioAccessToken: undefined,
  twilioRoomName: undefined,
};

export default function interactionsReducer(
  state = defaultState,
  action: AnyAction,
) {
  switch (action.type) {
    case UPDATE_TWILIO_ACCESS_TOKEN:
      return {
        ...state,
        twilioAccessToken: action.payload,
      };
    case UPDATE_TWILIO_ROOM_NAME:
      return {
        ...state,
        twilioRoomName: action.payload,
      };

    case LOG_OUT:
      return {
        ...state,
        twilioAccessToken: undefined,
        twilioRoomName: undefined,
      };
    default:
      return state;
  }
}
