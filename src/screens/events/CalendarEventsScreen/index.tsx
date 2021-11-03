import React from 'react';
import colors from '@themes/colors';
import {Platform} from 'react-native';
import styled from 'styled-components/native';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import {Calendar} from 'react-native-calendars';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {getOriginDateStringFromYYYYMMDDString, isNull} from '@utils/index';
import {navigate} from '@navigators/index';
import {ScreenName} from '@constants/Constants';
import {DateData} from 'react-native-calendars/src/types';
import {useSelector} from 'react-redux';
import {focusFamilySelector} from '@store/selectors/family';
import PrimaryButton from '@components/PrimaryButton';
import {plusIcon} from '@constants/sources';

interface Props {}

const CalendarEventsScreen: React.FC<Props> = () => {
  const focusFamily = useSelector(focusFamilySelector);

  const onPressDate = (date: DateData) => {
    navigate(ScreenName.EventsScreen, {
      targetDate: getOriginDateStringFromYYYYMMDDString(date.dateString, '-'),
    });
  };

  // Creation
  const onPressCreateButton = () => {
    if (!isNull(focusFamily?.id)) {
      navigate(ScreenName.CreateEventScreen, {familyId: focusFamily?.id});
    }
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
        onDayPress={onPressDate}
      />
      <CreateButton
        padding={14}
        leftSource={plusIcon}
        leftTintColor={colors.WHITE}
        onPress={onPressCreateButton}
      />
    </SafeView>
  );
};

const SafeView = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.WHITE};
  margin-top: ${Platform.OS === 'android' ? getStatusBarHeight() : 0}px;
`;

const CreateButton = styled(PrimaryButton)`
  right: 14px;
  bottom: 14px;
  position: absolute;
  border-radius: 40px;
  background-color: ${colors.DANUBE};
`;

export default CalendarEventsScreen;
