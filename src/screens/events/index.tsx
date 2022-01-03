import React, {useEffect, useState} from 'react';
import colors from '@themes/colors';
import {Platform, RefreshControl, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import HorizontalEventItem from './shared/HorizontalEventItem';
import {FlatList} from 'native-base';
import {DummyEvents} from '@constants/DummyData';
import {EventType} from '@constants/types/events';
import ProfileHeader from '@components/ProfileHeader';
import i18n from '@locales/index';
import ListEventsHeader from './shared/ListEventsHeader';
import {MemberType} from '@constants/types/family';
import VerticalEventItem from './shared/VerticalEventItem';
import {getOriginDateTimeString, isNull} from '@utils/index';
import {useDispatch, useSelector} from 'react-redux';
import {focusFamilySelector} from '@store/selectors/family';
import {
  deleteEventRequestAction,
  getEventDetailRequestAction,
  getEventsRequestAction,
  getEventsSuccessAction,
} from '@store/actionTypes/events';
import {eventsSelector} from '@store/selectors/events';
import {navigate} from '@navigators/index';
import {Pagination, ScreenName} from '@constants/Constants';
import {
  isLoadingEventsSelector,
  isRefreshingEventsSelector,
} from '@store/selectors/events';
import FooterLoadingIndicator from '@components/FooterLoadingIndicator';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';

interface Props {
  route?: any;
}

const EventsScreen: React.FC<Props> = ({route}) => {
  const dispatch = useDispatch();
  const focusFamily = useSelector(focusFamilySelector);
  const events = useSelector(eventsSelector);
  const isRefreshing = useSelector(isRefreshingEventsSelector);
  const isLoadingMore = useSelector(isLoadingEventsSelector);
  const [pageIndex, setPageIndex] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [submitSearchText, setSubmitSearchText] = useState('');
  const [selectedMember, setSelectedMember] = useState<MemberType[]>([]);
  const [sortBy, setSortBy] = React.useState<'created_at' | 'deadline'>(
    'created_at',
  );
  const [targetDateTime, setTargetDateTime] = useState<string | undefined>(
    undefined,
  );

  // Life Cycle
  useEffect(() => {
    dispatch(getEventsSuccessAction([]));
    if (
      !isNull(focusFamily?.id) &&
      route &&
      route.params &&
      route.params.targetDateTime
    ) {
      setTargetDateTime(route.params.targetDateTime);
      dispatch(
        getEventsRequestAction({
          showHUD: true,
          familyId: focusFamily?.id,
          from: `${route.params.targetDateTime} 00:00:00`,
          to: `${route.params.targetDateTime} 23:59:59`,
        }),
      );
    }
  }, []);

  // Refresh & Load More
  const onRefreshData = () => {
    if (
      isRefreshing === false &&
      !isNull(targetDateTime) &&
      !isNull(focusFamily?.id)
    ) {
      setPageIndex(0);
      setSearchText('');
      setSelectedMember([]);
      setSortBy('created_at');
      dispatch(
        getEventsRequestAction({
          refresh: true,
          familyId: focusFamily?.id,
          searchText: searchText,
          assigneeIds: selectedMember.map(item => {
            return item.id;
          }),
          sortBy: sortBy,
          from: `${route.params.targetDateTime} 00:00:00`,
          to: `${route.params.targetDateTime} 23:59:59`,
        }),
      );
    }
  };
  const onLoadMore = () => {
    if (
      isLoadingMore === false &&
      !isNull(targetDateTime) &&
      !isNull(focusFamily?.id) &&
      events.length >= Pagination.Events
    ) {
      dispatch(
        getEventsRequestAction({
          loadMore: true,
          familyId: focusFamily?.id,
          searchText: searchText,
          assigneeIds: selectedMember.map(item => {
            return item.id;
          }),
          sortBy: sortBy,
          from: `${route.params.targetDateTime} 00:00:00`,
          to: `${route.params.targetDateTime} 23:59:59`,
          page: pageIndex + 1,
        }),
      );
      setPageIndex(pageIndex + 1);
    }
  };

  const getEvents = (
    _assignee: MemberType[],
    _sortBy?: string,
    _text?: string,
  ) => {
    if (
      !isNull(focusFamily?.id) &&
      route &&
      route.params &&
      route.params.targetDateTime
    ) {
      dispatch(
        getEventsRequestAction({
          showHUD: true,
          familyId: focusFamily?.id,
          searchText: _text,
          assigneeIds: _assignee.map(item => {
            return item.id;
          }),
          sortBy: _sortBy,
          from: `${route.params.targetDateTime} 00:00:00`,
          to: `${route.params.targetDateTime} 23:59:59`,
        }),
      );
    }
  };

  // Search
  const onChangeSearchText = (text: string) => {
    setSearchText(text);
  };
  const onSubmitSearchText = (text: string) => {
    setSubmitSearchText(text);
    setPageIndex(0);
    getEvents(selectedMember, sortBy, text);
  };

  // Filter
  const onChangeMember = (member: MemberType) => {
    if (selectedMember.includes(member)) {
      setSelectedMember(
        selectedMember.filter(item => {
          return item.id !== member.id;
        }),
      );
      getEvents(
        selectedMember.filter(item => {
          return item.id !== member.id;
        }),
        sortBy,
        submitSearchText,
      );
    } else {
      setSelectedMember([...selectedMember, member]);
      getEvents([...selectedMember, member], sortBy, submitSearchText);
    }
  };

  // Sort
  const onPressLatestCreate = () => {
    setSortBy('created_at');
    getEvents(selectedMember, 'created_at', submitSearchText);
  };
  const onPressLatestDeadline = () => {
    setSortBy('deadline');
    getEvents(selectedMember, 'deadline', submitSearchText);
  };

  // Item
  const renderItem = ({item}: {item: any}) => {
    return (
      <HorizontalEventItem
        item={item}
        onPress={onPressItem}
        onPressUpdate={onPressUpdateItem}
        onPressUpdateRelated={onPressUpdateRelatedItem}
        onPressDelete={onPressDeleteItem}
        onPressDeleteRelated={onPressDeleteRelatedItem}
      />
    );
  };
  const onPressItem = (item: EventType) => {
    if (!isNull(item.id)) {
      dispatch(getEventDetailRequestAction({eventId: item.id}));
    }
  };
  const onPressUpdateItem = (item: EventType) => {
    navigate(ScreenName.CreateEventScreen, {
      oldEvent: item,
      isUpdateRelated: false,
    });
  };
  const onPressUpdateRelatedItem = (item: EventType) => {
    navigate(ScreenName.CreateEventScreen, {
      oldEvent: item,
      isUpdateRelated: true,
    });
  };
  const onPressDeleteItem = (item: EventType) => {
    dispatch(deleteEventRequestAction({eventId: item.id}));
  };
  const onPressDeleteRelatedItem = (item: EventType) => {
    dispatch(deleteEventRequestAction({eventId: item.id, deleteAll: true}));
  };

  return (
    <SafeView>
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
        translucent
      />
      <ProfileHeader title={i18n.t('events.events')} />
      <ListEventsHeader
        sortBy={sortBy}
        searchText={searchText}
        selectedMember={selectedMember}
        onChangeMember={onChangeMember}
        onPressLatestCreate={onPressLatestCreate}
        onPressLatestDeadline={onPressLatestDeadline}
        onChangeSearchText={onChangeSearchText}
        onSubmitSearchText={onSubmitSearchText}
      />
      <FlatList
        // numColumns={2}
        data={events}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefreshData} />
        }
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.list}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={<FooterLoadingIndicator loading={isLoadingMore} />}
      />
    </SafeView>
  );
};

const SafeView = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.WHITE};
  margin-top: ${Platform.OS === 'android' ? getStatusBarHeight() : 0}px;
`;

const styles = StyleSheet.create({
  list: {
    paddingBottom: 30,
    flexDirection: 'column',
  },
});

export default EventsScreen;
