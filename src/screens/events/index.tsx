import React, {useState} from 'react';
import colors from '@themes/colors';
import {Platform, StyleSheet} from 'react-native';
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
import {isNull} from '@utils/index';
import {useDispatch, useSelector} from 'react-redux';
import {focusFamilySelector} from '@store/selectors/family';
import {getEventsRequestAction} from '@store/actionTypes/events';

interface Props {
  route?: any;
}

const EventsScreen: React.FC<Props> = ({route}) => {
  const dispatch = useDispatch();
  const focusFamily = useSelector(focusFamilySelector);
  const [searchText, setSearchText] = useState('');
  const [submitSearchText, setSubmitSearchText] = useState('');
  const [selectedMember, setSelectedMember] = useState<MemberType[]>([]);
  const [sortBy, setSortBy] = React.useState<'created_at' | 'deadline'>(
    'created_at',
  );

  const renderItem = ({item}: {item: any}) => {
    return <VerticalEventItem item={item} onPress={onPressItem} />;
  };
  const onPressItem = (item: EventType) => {
    console.log({item});
    if (route && route.params && route.params.targetDate) {
      console.log({targetDate: route.params.targetDate});
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
      route.params.targetDate
    ) {
      console.log({
        showHUD: true,
        familyId: focusFamily?.id,
        searchText: _text,
        assigneeIds: _assignee.map(item => {
          return item.id;
        }),
        sortBy: _sortBy,
        from: route.params.targetDate,
        to: route.params.targetDate,
      });
      // dispatch(getEventsRequestAction({
      //   showHUD: true,
      //   familyId: focusFamily?.id,
      //   searchText: _text,
      //   assigneeIds: _assignee.map(item => { return item.id }),
      //   sortBy: _sortBy,
      //   from: route.params.targetDate,
      //   to: route.params.targetDate
      // }))
    }
  };

  // Search
  const onChangeSearchText = (text: string) => {
    setSearchText(text);
  };
  const onSubmitSearchText = (text: string) => {
    setSubmitSearchText(text);
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
    console.log('created_at');
    setSortBy('created_at');
    getEvents(selectedMember, 'created_at', submitSearchText);
  };
  const onPressLatestDeadline = () => {
    console.log('deadline');
    setSortBy('deadline');
    getEvents(selectedMember, 'deadline', submitSearchText);
  };

  return (
    <SafeView>
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
        numColumns={2}
        data={DummyEvents}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        keyExtractor={(item, index) => index.toString()}
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
    paddingLeft: 10,
    flexDirection: 'column',
  },
});

export default EventsScreen;
