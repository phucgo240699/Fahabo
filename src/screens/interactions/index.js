import React, {useCallback, useEffect, useState} from 'react';
import colors from '@themes/colors';
import ChatHeader from '@components/ChatHeader';
import {useDispatch, useSelector} from 'react-redux';
import {focusFamilySelector} from '@store/selectors/family';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import {GiftedChat, InputToolbar, Send} from 'react-native-gifted-chat';
import styled from 'styled-components/native';
import {Image, Platform, StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {
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
import { sendIcon } from '@constants/sources';
import { navigate } from '@navigators/index';
import { ScreenName } from '@constants/Constants';

function ChatScreen(props) {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const focusFamily = useSelector(focusFamilySelector);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('Messages')
      .where('familyId', '==', focusFamily?.id)
      .limit(100)
      .onSnapshot(querySnapShot => {
        if (!isNull(querySnapShot)) {
          setMessages(
            querySnapShot.docs.map(item => {
              return convertFireStoreMessageToUIMessage(item);
            }).sort((pre, cur) => {
              return cur.timeStamp > pre.timeStamp
            }),
          );
        }
      });
      return () => subscriber();
  }, []);

  useEffect(() => {
    if (props.route && props.route.params && props.route.params.selectedMembers) {
      if (!isNull(focusFamily?.id)) {
        dispatch(connectTwilioRequestActions({familyId: focusFamily?.id}));
      }
    }
  }, [props.route])

  // Video Call
  const onPressVideoCall = () => {
    if (!isNull(focusFamily?.id)) {
      navigate(ScreenName.MembersPickerScreen, { familyId: focusFamily?.id, fromConferenceCall: true })
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

  // Refactoring UI
  const renderInputToolbar = (props) => (
    <InputToolbar
      {...props}
      containerStyle={styles.input}
    />
  )

  const renderSend = (props) => (
    <Send
      {...props}
      disabled={!props.text}
      containerStyle={styles.sendBtn}
    >
      <SendIcon
        source={sendIcon}
      />
    </Send>
  );

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
        renderSend={renderSend}
        renderInputToolbar={renderInputToolbar}
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

const SendIcon = styled.Image`
  width: 32px;
  height: 32px;
`

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.SILVER,
  },
  sendBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  }
})

export default ChatScreen;
