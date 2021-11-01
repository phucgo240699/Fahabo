import React, {memo} from 'react';
import i18n from '@locales/index';
import colors from '@themes/colors';
import {Keyboard, Platform} from 'react-native';
import {Box, Text} from 'native-base';
import styled from 'styled-components/native';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import {Calendar} from 'react-native-calendars';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {getOriginDateStringFromYYYYMMDDString} from '@utils/index';

interface Props {}

const EventsScreen: React.FC<Props> = () => {
  const onDismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <SafeView>
      {/* Status Bar */}
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
        translucent
      />
      <Calendar
        markedDates={{
          '2021-11-02': {marked: true},
          '2021-11-08': {marked: true},
          '2021-11-13': {marked: true},
          '2021-11-17': {marked: true},
          '2021-11-29': {marked: true},
          '2021-11-30': {marked: true},
        }}
        onDayPress={date => {
          console.log({
            date: getOriginDateStringFromYYYYMMDDString(date.dateString, '-'),
          });
        }}
      />
      {/* <Touch onPress={onDismissKeyboard}>
        <Container>
          <Text color={colors.BLACK}>Events</Text>
        </Container>
      </Touch> */}
    </SafeView>
  );
};

const SafeView = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.WHITE};
  margin-top: ${Platform.OS === 'android' ? getStatusBarHeight() : 0}px;
`;

const Touch = styled.TouchableWithoutFeedback``;

const Container = styled.View`
  flex: 1;
`;

export default memo(EventsScreen);
