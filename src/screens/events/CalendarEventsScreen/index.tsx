import React, {useEffect} from 'react';
import colors from '@themes/colors';
import {RefreshControl} from 'react-native';
import styled from 'styled-components/native';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import {Calendar} from 'react-native-calendars';
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
import {
  calendarEventBeginSelector,
  calendarEventEndSelector,
  datesContainEventsSelector,
} from '@store/selectors/events';
import {
  getDatesContainEventsRequestAction,
  updateCalendarEventRangeSuccessAction,
} from '@store/actionTypes/events';
import {isRefreshingDatesContainEventsSelector} from '@store/selectors/events';
import {ScrollView} from 'native-base';

interface Props {
  route?: any;
}

const CalendarEventsScreen: React.FC<Props> = ({route}) => {
  const dispatch = useDispatch();
  const focusFamily = useSelector(focusFamilySelector);
  const isRefreshing = useSelector(isRefreshingDatesContainEventsSelector);
  const calendarEventBegin = useSelector(calendarEventBeginSelector);
  const calendarEventEnd = useSelector(calendarEventEndSelector);
  const rawMarkedDateEvents = useSelector(datesContainEventsSelector);

  useEffect(() => {
    if (!isNull(focusFamily?.id)) {
      adaptMarkedDates(getOriginDateString(new Date()));
    }
  }, []);

  // Refresh
  const onRefreshData = () => {
    if (isRefreshing === false && !isNull(focusFamily?.id)) {
      dispatch(
        getDatesContainEventsRequestAction({
          familyId: focusFamily?.id,
          from: calendarEventBegin,
          to: calendarEventEnd,
        }),
      );
    }
  };

  const adaptMarkedDates = (dateString: string) => {
    if (!isNull(focusFamily?.id)) {
      const dateNowComponents = dateString.split('-');
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
      dispatch(
        updateCalendarEventRangeSuccessAction({
          calendarEventBegin: from,
          calendarEventEnd: to,
        }),
      );
    }
  };

  // Month Change
  const onMonthsChange = (months: DateData[]) => {
    adaptMarkedDates(months[0].dateString);
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
      <ScrollView
        flex={1}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefreshData} />
        }>
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
      </ScrollView>

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
`;

const CreateButton = styled(PrimaryButton)`
  right: 14px;
  bottom: 14px;
  position: absolute;
  border-radius: 40px;
  background-color: ${colors.THEME_COLOR_6};
`;

export default CalendarEventsScreen;
