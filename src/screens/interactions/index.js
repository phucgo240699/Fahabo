import React, {useCallback, useEffect, useState} from 'react';
import colors from '@themes/colors';
import ChatHeader from '@components/ChatHeader';
import {useDispatch, useSelector} from 'react-redux';
import {focusFamilySelector} from '@store/selectors/family';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import {DummyAuthorMessage} from '@constants/DummyData';
import {GiftedChat, Message, MessageText, Time} from 'react-native-gifted-chat';
import styled from 'styled-components/native';
import {Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {
  convertOriginDateTimeStringToDate,
  getOriginDateTimeString,
  isNull,
} from '@utils/index';
import {
  connectTwilioRequestActions,
  sendMessageRequestAction,
} from '@store/actionTypes/interactions';
import firestore from '@react-native-firebase/firestore';
import {userSelector} from '@store/selectors/authentication';
import {
  convertFireStoreMessageToUIMessage,
  convertUserDatabaseToUserUIMessage,
} from '@utils/parsers/interactions';

function ChatScreen() {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const focusFamily = useSelector(focusFamilySelector);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('Messages')
      .where('familyId', '==', focusFamily?.id)
      .orderBy('timeStamp', 'desc')
      .onSnapshot(querySnapShot => {
        if (!isNull(querySnapShot)) {
          // console.log(
          //   Platform.OS === 'android' ? 'android' : 'ios',
          //   querySnapShot.docs,
          // );
          setMessages(
            querySnapShot.docs.map(item => {
              return convertFireStoreMessageToUIMessage(item);
            }),
          );
        }
      });
      return () => subscriber();
  }, []);

  // Video Call
  const onPressVideoCall = () => {
    if (!isNull(focusFamily?.id)) {
      dispatch(connectTwilioRequestActions({familyId: focusFamily?.id}));
    }
  };

  // Send message
  const onSend = useCallback((messages = []) => {
    const message = messages[0];
    const today = new Date();
    dispatch(
      sendMessageRequestAction({
        _id: `${focusFamily?.id}_${user?.id}_${today.getTime()}`,
        familyId: focusFamily?.id,
        text: message.text,
        createdAt: getOriginDateTimeString(message.createdAt),
        timeStamp: today.getTime().toString(),
        authorId: user?.id,
      }),
    );
  }, []);

  return (
    <SafeView>
      <FocusAwareStatusBar
        translucent
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
      />
      <ChatHeader
        title={focusFamily?.name}
        onPressVideoCall={onPressVideoCall}
      />
      <GiftedChat
        messages={messages}
        user={convertUserDatabaseToUserUIMessage(user)}
        onSend={messages => onSend(messages)}
      />
    </SafeView>
  );
}

const SafeView = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.WHITE};
  margin-top: ${Platform.OS === 'android' ? getStatusBarHeight() : 0}px;
`;

export default ChatScreen;
