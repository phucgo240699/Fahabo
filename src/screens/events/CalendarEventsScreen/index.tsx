import React, {useEffect} from 'react';
import colors from '@themes/colors';
import {Platform} from 'react-native';
import styled from 'styled-components/native';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import {Calendar} from 'react-native-calendars';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {
  getOriginDateString,
  getOriginDateStringFromYYYYMMDDString,
  getYYYYMMDDStringFromOriginDateString,
  isNull,
} from '@utils/index';
import {navigate} from '@navigators/index';
import {ScreenName} from '@constants/Constants';
import {DateData} from 'react-native-calendars/src/types';
import {useDispatch, useSelector} from 'react-redux';
import {focusFamilySelector} from '@store/selectors/family';
import PrimaryButton from '@components/PrimaryButton';
import {plusIcon} from '@constants/sources';
import {datesContainEventsSelector} from '@store/selectors/events';
import {getDatesContainEventsRequestAction} from '@store/actionTypes/events';

interface Props {}

const CalendarEventsScreen: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const focusFamily = useSelector(focusFamilySelector);
  const rawMarkedDateEvents = useSelector(datesContainEventsSelector);

  useEffect(() => {
    if (!isNull(focusFamily?.id)) {
      const dateNowString = getOriginDateString(new Date());
      const dateNowComponents = dateNowString.split('-');
      const month = dateNowComponents[1];
      const year = dateNowComponents[2];
      const from = `01-${month}-${year}`;
      const to = `31-${month}-${year}`;

      dispatch(
        getDatesContainEventsRequestAction({
          familyId: focusFamily?.id,
          from: from,
          to: to,
        }),
      );
    }
  }, []);

  // Month Change
  const onMonthsChange = (months: DateData[]) => {
    const dateComponents = months[0].dateString.split('-');
    const year = dateComponents[0];
    const month = dateComponents[1];
    const from = `01-${month}-${year}`;
    const to = `31-${month}-${year}`;
    if (!isNull(focusFamily?.id)) {
      dispatch(
        getDatesContainEventsRequestAction({
          familyId: focusFamily?.id,
          from: from,
          to: to,
        }),
      );
    }
  };

  // Creation
  const onPressCreateButton = () => {
    if (!isNull(focusFamily?.id)) {
      navigate(ScreenName.CreateEventScreen, {familyId: focusFamily?.id});
    }
  };

  // Press Item
  const onPressDate = (date: DateData) => {
    navigate(ScreenName.EventsScreen, {
      targetDateTime: getOriginDateStringFromYYYYMMDDString(
        date.dateString,
        '-',
      ),
    });
  };

  const markedDateEvents = (rawMarkedDateEvents ? rawMarkedDateEvents : [])
    .map(item => {
      return getYYYYMMDDStringFromOriginDateString(item, '-');
    })
    .reduce(
      (pre, cur) => ({
        ...pre,
        [cur]: {marked: true},
      }),
      {},
    );
  return (
    <SafeView>
      {/* Status Bar */}
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
        translucent
      />
      <Calendar
        markedDates={markedDateEvents}
        onVisibleMonthsChange={onMonthsChange}
        theme={{
          backgroundColor: colors.WHITE,
          calendarBackground: colors.WHITE,
          monthTextColor: colors.DARK_GRAY,
          textSectionTitleColor: colors.DANUBE,
          todayTextColor: colors.RED_1,
          dayTextColor: colors.DARK_GRAY,
          textDisabledColor: colors.SILVER,
        }}
        style={{backgroundColor: colors.WHITE}}
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
