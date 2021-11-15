import i18n from '@locales/index';
import {
  connectTwilioApi,
  notifyConferenceCallApi,
} from '@services/interactions';
import {all, put, takeLeading} from 'typed-redux-saga';
import {ScreenName} from '@constants/Constants';
import {navigate} from '@navigators/index';
import {ToastType} from '@constants/types/session';
import {
  closeHUDAction,
  showHUDAction,
  showToastAction,
} from '@store/actionTypes/session';
import {parseDataResponse, parseErrorResponse} from '@utils/parsers';
import {apiProxy} from './apiProxy';
import {
  updateTwilioAccessTokenAction,
  CONNECT_TWILIO_REQUEST,
  NOTIFY_CONFERENCE_CALL_REQUEST,
  updateTwilioRoomNameAction,
} from '@store/actionTypes/interactions';
import {
  ConnectTwilioRequestType,
  NotifyConferenceCallRequestType,
} from '@constants/types/interactions';
import {isNull} from '@utils/index';

function* connectTwilioSaga({
  body,
}: {
  type: string;
  body: ConnectTwilioRequestType;
}) {
  try {
    yield* put(showHUDAction());
    const response = yield* apiProxy(connectTwilioApi, body);
    if (response.status === 200) {
      const data = parseDataResponse(response);
      yield* put(updateTwilioAccessTokenAction(data.twilioAccessToken));
      if (!isNull(body.roomCallId)) {
        yield* put(updateTwilioRoomNameAction(data.roomCallId));
        navigate(ScreenName.ConferenceCallScreen);
      } else {
        yield* put(updateTwilioRoomNameAction(data.roomCallId));
        navigate(ScreenName.ConferenceCallScreen, {isHost: true});
      }
    } else {
      yield* put(
        showToastAction(
          i18n.t(`backend.${parseErrorResponse(response)}`),
          ToastType.ERROR,
        ),
      );
    }
  } catch (error) {
    yield* put(
      showToastAction(i18n.t('errorMessage.general'), ToastType.ERROR),
    );
  } finally {
    yield* put(closeHUDAction());
  }
}

function* notifyConferenceCallSaga({
  body,
}: {
  type: string;
  body: NotifyConferenceCallRequestType;
}) {
  try {
    const response = yield* apiProxy(notifyConferenceCallApi, body);
    if (response.status === 200) {
    } else {
      yield* put(
        showToastAction(
          i18n.t(`backend.${parseErrorResponse(response)}`),
          ToastType.ERROR,
        ),
      );
    }
  } catch (error) {
    yield* put(
      showToastAction(i18n.t('errorMessage.general'), ToastType.ERROR),
    );
  }
}

export default function* () {
  yield* all([
    takeLeading(CONNECT_TWILIO_REQUEST, connectTwilioSaga),
    takeLeading(NOTIFY_CONFERENCE_CALL_REQUEST, notifyConferenceCallSaga),
  ]);
}
