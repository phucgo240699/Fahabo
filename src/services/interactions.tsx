import {apiProvider} from './apiProvider';
import {BASE_URL} from '@constants/Constants';
import {
  ConnectTwilioRequestType,
  NotifyConferenceCallRequestType,
  NotifyNewMessageRequestType,
} from '@constants/types/interactions';

export function notifyNewMessageApi(
  accessToken?: string,
  body?: NotifyNewMessageRequestType,
) {
  return new apiProvider(accessToken).post(`${BASE_URL}/chat`, body);
}

export function connectTwilioApi(
  accessToken?: string,
  body?: ConnectTwilioRequestType,
) {
  return new apiProvider(accessToken).post(
    `${BASE_URL}/communication_access_token`,
    body,
  );
}

export function notifyConferenceCallApi(
  accessToken?: string,
  body?: NotifyConferenceCallRequestType,
) {
  return new apiProvider(accessToken).post(
    `${BASE_URL}/users/make_video_call`,
    body,
  );
}
