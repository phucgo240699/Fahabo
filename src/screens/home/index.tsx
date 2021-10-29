import i18n from '@locales/index';
import fonts from '@themes/fonts';
import colors from '@themes/colors';
import {Platform, StyleSheet} from 'react-native';
import ChoresScreen from '@screens/chores';
import EventsScreen from '@screens/events';
import styled from 'styled-components/native';
import {Constants, ScreenName} from '@constants/Constants';
import React, {useCallback, useEffect, useState} from 'react';
import PrimaryHeader from '@components/PrimaryHeader';
import {SceneMap, TabView, TabBar} from 'react-native-tab-view';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {navigate} from '@navigators/index';
import {useDispatch, useSelector} from 'react-redux';
import {focusFamilySelector} from '@store/selectors/family';
import {getHomeScreenDataRequestAction} from '@store/actionTypes/screens';
import {getChoresRequestAction} from '@store/actionTypes/chores';
import {isNull} from '@utils/index';
import {MemberType} from '@constants/types/family';
import {ChoreStatus} from '@constants/types/chores';

interface Props {}

const HomeScreen: React.FC<Props> = () => {
  const [index, setIndex] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [submitSearchText, setSubmitSearchText] = useState('');
  const [selectedMember, setSelectedMember] = useState<MemberType | undefined>(
    undefined,
  );
  const [selectedStatus, setSelectedStatus] = useState<ChoreStatus | undefined>(
    undefined,
  );
  const [sortBy, setSortBy] = React.useState<'created_at' | 'deadline'>(
    'created_at',
  );

  const dispatch = useDispatch();
  const focusFamily = useSelector(focusFamilySelector);

  // Life Cycle
  useEffect(() => {
    dispatch(getHomeScreenDataRequestAction());
  }, []);

  // TabView
  const [routes] = useState([
    {key: 'chores', title: i18n.t('chores.chores')},
    {key: 'events', title: i18n.t('events.events')},
  ]);
  const renderScene = SceneMap({
    chores: () => (
      <ChoresScreen
        sortBy={sortBy}
        selectedMember={selectedMember}
        selectedStatus={selectedStatus}
        onChangeMember={onChangeMember}
        onChangeStatus={onChangeStatus}
        onPressLatestCreate={onPressLatestCreate}
        onPressLatestDeadline={onPressLatestDeadline}
      />
    ),
    events: () => <EventsScreen />,
  });
  const renderTabLabel = ({route, focused}: {route: any; focused: boolean}) => {
    return <TabTitle isFocus={focused}>{route.title}</TabTitle>;
  };

  const getChores = (
    _assignee?: MemberType,
    _status?: ChoreStatus,
    _sortBy?: string,
    _text?: string,
  ) => {
    if (!isNull(focusFamily?.id)) {
      dispatch(
        getChoresRequestAction({
          showHUD: true,
          familyId: focusFamily?.id,
          assigneeIds:
            isNull(_assignee) || isNull(_assignee?.id)
              ? []
              : [_assignee?.id ?? 0],
          statuses: isNull(_status) ? [] : [_status ?? ChoreStatus.IN_PROGRESS],
          sortBy: _sortBy,
          searchText: _text,
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
    getChores(selectedMember, selectedStatus, sortBy, text);
  };

  // Filter & Sort
  const onChangeMember = (member: MemberType) => {
    if (selectedMember?.id === member.id) {
      setSelectedMember(undefined);
      getChores(undefined, selectedStatus, sortBy, submitSearchText);
    } else {
      setSelectedMember(member);
      getChores(member, selectedStatus, sortBy, submitSearchText);
    }
  };
  const onChangeStatus = (status: ChoreStatus) => {
    if (selectedStatus === status) {
      setSelectedStatus(undefined);
      getChores(selectedMember, undefined, sortBy, submitSearchText);
    } else {
      setSelectedStatus(status);
      getChores(selectedMember, status, sortBy, submitSearchText);
    }
  };

  const onPressLatestCreate = () => {
    setSortBy('created_at');
    getChores(selectedMember, selectedStatus, 'created_at', submitSearchText);
  };

  const onPressLatestDeadline = () => {
    setSortBy('deadline');
    getChores(selectedMember, selectedStatus, 'created_at', submitSearchText);
  };

  // Creation
  const onPressPlusButton = () => {
    if (!isNull(focusFamily?.id)) {
      // Chore
      if (index === 0) {
        navigate(ScreenName.CreateChoreScreen, {familyId: focusFamily?.id});
      }
    }
  };

  return (
    <SafeView>
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
        translucent
      />
      <PrimaryHeader
        text={searchText}
        onChangeText={onChangeSearchText}
        onSubmitText={onSubmitSearchText}
        onPressPlus={onPressPlusButton}
      />
      <TabView
        renderTabBar={props => (
          <TabBar
            {...props}
            pressOpacity={1}
            pressColor={'transparent'}
            style={styles.tabBar}
            indicatorStyle={styles.indicator}
            renderLabel={renderTabLabel}
          />
        )}
        swipeEnabled={false}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: Constants.MAX_WIDTH}}
      />
    </SafeView>
  );
};

const SafeView = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.WHITE};
  margin-top: ${Platform.OS === 'android' ? getStatusBarHeight() : 0}px;
`;

const TabTitle = styled(fonts.PrimaryFontMediumSize14)<{isFocus?: boolean}>`
  text-align: center;
  align-items: center;
  justify-content: center;
  color: ${colors.THEME_COLOR_9};
  opacity: ${props => (props.isFocus ? 1 : 0.5)};
`;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.WHITE,
  },
  indicator: {height: 4, backgroundColor: colors.THEME_COLOR_4},
});

export default HomeScreen;
