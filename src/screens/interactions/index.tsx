import React, {useState} from 'react';
import colors from '@themes/colors';
import ChatHeader from '@components/ChatHeader';
import {useDispatch, useSelector} from 'react-redux';
import {focusFamilySelector} from '@store/selectors/family';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import {DummyAuthorMessage, DummyMessages} from '@constants/DummyData';
import styled from 'styled-components/native';
import {Platform} from 'react-native';
import {isNull} from '@utils/index';
import {Chat, MessageType, defaultTheme} from '@flyerhq/react-native-chat-ui';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {connectTwilioRequestActions} from '@store/actionTypes/interactions';

const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.floor(Math.random() * 16);
    const v = c === 'x' ? r : (r % 4) + 8;
    return v.toString(16);
  });
};

interface Props {}

const InteractionsScreen: React.FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const focusFamily = useSelector(focusFamilySelector);

  const [messages, setMessages] = useState<MessageType.Any[]>(DummyMessages);

  // Video Call
  const onPressVideoCall = () => {
    if (!isNull(focusFamily?.id)) {
      dispatch(connectTwilioRequestActions({familyId: focusFamily?.id}));
    }
  };

  // Send message
  const addMessage = (message: MessageType.Any) => {
    setMessages([message, ...messages]);
  };

  const handleSendPress = (message: MessageType.PartialText) => {
    const textMessage: MessageType.Text = {
      author: DummyAuthorMessage,
      createdAt: Date.now(),
      id: uuidv4(),
      text: message.text,
      type: 'text',
    };
    addMessage(textMessage);
  };

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
      <Chat
        theme={{
          ...defaultTheme,
          colors: {
            ...defaultTheme.colors,
            inputBackground: colors.WHITE,
            inputText: colors.TEXT,
          },
        }}
        messages={messages}
        onSendPress={handleSendPress}
        user={DummyAuthorMessage}
      />
    </SafeView>
  );
};

const SafeView = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.WHITE};
  margin-top: ${Platform.OS === 'android' ? getStatusBarHeight() : 0}px;
`;

export default InteractionsScreen;
