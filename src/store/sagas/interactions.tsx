import i18n from '@locales/index';
import {
  connectTwilioApi,
  notifyConferenceCallApi,
  notifyNewMessageApi,
} from '@services/interactions';
import {all, delay, put, select, takeLeading} from 'typed-redux-saga';
import {ScreenName} from '@constants/Constants';
import {navigate, navigationRef} from '@navigators/index';
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
  SEND_MESSAGE_REQUEST,
  NOTIFY_NEW_MESSAGE_REQUEST,
  notifyNewMessageRequestAction,
} from '@store/actionTypes/interactions';
import {
  ConnectTwilioRequestType,
  NotifyConferenceCallRequestType,
  NotifyNewMessageRequestType,
  SendMessageRequestType,
} from '@constants/types/interactions';
import {isNull} from '@utils/index';
import firestore from '@react-native-firebase/firestore';

function* sendMessageSaga({
  body,
}: {
  type: string;
  body: SendMessageRequestType;
}) {
  try {
    if (!isNull(body.authorId)) {
      if (!isNull(body.familyId)) {
        const message: SendMessageRequestType = body;

        // Send message to firebase store
        firestore()
          .collection('Messages')
          .add(message)
          .then(() => {});
        yield* delay(3000);
        yield* put(notifyNewMessageRequestAction({familyId: body.familyId}));
      }
    }
  } catch (error) {
    yield* put(
      showToastAction(i18n.t('errorMessage.general'), ToastType.ERROR),
    );
  }
}

function* notifyNewMessageSaga({
  body,
}: {
  type: string;
  body: NotifyNewMessageRequestType;
}) {
  try {
    yield* apiProxy(notifyNewMessageApi, body);
  } catch (error) {}
}

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
        navigate(ScreenName.ConferenceCallScreen, {
          participantIds: body.participantIds,
        });
      } else {
        yield* put(updateTwilioRoomNameAction(data.roomCallId));
        navigate(ScreenName.ConferenceCallScreen, {
          isHost: true,
          participantIds: body.participantIds,
        });
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
    takeLeading(SEND_MESSAGE_REQUEST, sendMessageSaga),
    takeLeading(NOTIFY_NEW_MESSAGE_REQUEST, notifyNewMessageSaga),
    takeLeading(CONNECT_TWILIO_REQUEST, connectTwilioSaga),
    takeLeading(NOTIFY_CONFERENCE_CALL_REQUEST, notifyConferenceCallSaga),
  ]);
}
