import React, {useEffect, useState} from 'react';
import colors from '@themes/colors';
import ChatHeader from '@components/ChatHeader';
import {useDispatch, useSelector} from 'react-redux';
import {focusFamilySelector} from '@store/selectors/family';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import styled from 'styled-components/native';
import {FlatList, KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
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
} from '@utils/parsers/interactions';
import { sendIcon } from '@constants/sources';
import { navigate } from '@navigators/index';
import { ScreenName } from '@constants/Constants';
import TextMessageItem from './shared/TextMessageItem';
import { Box, Input } from 'native-base';
import PrimaryButton from '@components/PrimaryButton';
import i18n from '@locales/index';
import SharedCuisinePostMessageItem from './shared/SharedCuisinePostMessageItem';
import { getCuisinePostDetailRequestAction } from '@store/actionTypes/cuisine';


function ChatScreen(props) {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const focusFamily = useSelector(focusFamilySelector);
  const [text, setText] = useState('')
  const [messages, setMessages] = useState([]);

  // Get Messages
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

  // Connect to Twilio
  useEffect(() => {
    if (props.route && props.route.params && props.route.params.selectedMembers) {
      if (!isNull(focusFamily?.id)) {
        dispatch(connectTwilioRequestActions({familyId: focusFamily?.id, participantIds: props.route.params.selectedMembers.map(item => {
          return item.id
        }) }));
      }
    }
  }, [props.route])

  // Video Call
  const onPressVideoCall = () => {
    if (!isNull(focusFamily?.id)) {
      navigate(ScreenName.MembersPickerScreen, { familyId: focusFamily?.id, fromConferenceCall: true })
    }
  };

  // Item
  const renderItem = ({item}) => {
    if (item.type == 'cuisine_post') {
      return <SharedCuisinePostMessageItem item={item} onPress={onPressCuisinePostItem} />
    }
    return <TextMessageItem item={item} />
  }

  const onPressCuisinePostItem = (item) => { 
    dispatch(getCuisinePostDetailRequestAction({ cuisinePostId: item.cuisinePost.id }))
  }

  // Change Text
  const onChangeText = (value) => {
    setText(value)
  }

  // Send
  const onPressSend = () => {
    if (!isNull(text)) {
      const today = new Date();
      dispatch(
        sendMessageRequestAction({
          _id: `${focusFamily?.id}_${user?.id}_${today.getTime()}`,
          familyId: focusFamily?.id,
          createdAt: getOriginDateTimeString(today),
          timeStamp: today.getTime().toString(),
          authorId: user?.id,
          authorName: user?.name,
          authorAvatar: user?.rawAvatarUrl,
          text: text,
          type: 'text'
        }),
      );
      setText('')
    }
  }

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
      <KeyboardAvoidingView keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500} behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.scrollView}>
      <FlatList inverted showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} data={messages} renderItem={renderItem} keyExtractor={(item, index) => index.toString()} contentContainerStyle={styles.list} />
      <Box borderRadius={10} borderTopWidth={2} borderColor={colors.CONCRETE} alignItems={'center'} flexDirection={'row'}>
        <Input flex={1} color={colors.TEXT} placeholder={i18n.t('interaction.typeAMessage')} placeholderTextColor={colors.CONCRETE} borderRadius={10} borderWidth={0} value={text} onChangeText={onChangeText} />
        <SendButton leftSource={sendIcon} leftTintColor={isNull(text) ? colors.SILVER : colors.ROYAL_BLUE} marginTop={4} marginLeft={10} marginRight={10} onPress={onPressSend} />
      </Box>
      </KeyboardAvoidingView>
    </SafeView>
  );
}

const SafeView = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.WHITE};
  margin-top: ${Platform.OS === 'android' ? getStatusBarHeight() : 0}px;
`;

const SendButton = styled(PrimaryButton)`
`

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  list: {
    paddingTop: 20
  }
})

export default ChatScreen;
