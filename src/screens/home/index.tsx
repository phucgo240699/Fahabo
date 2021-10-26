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
import {familiesSelector} from '@store/selectors/family';
import {getHomeScreenDataRequestAction} from '@store/actionTypes/screens';

interface Props {}

const HomeScreen: React.FC<Props> = () => {
  const [index, setIndex] = useState(0);
  const [searchText, setSearchText] = useState('');

  const dispatch = useDispatch();
  const families = useSelector(familiesSelector);

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
    chores: () => <ChoresScreen />,
    events: () => <EventsScreen />,
  });
  const renderTabLabel = ({route, focused}: {route: any; focused: boolean}) => {
    return <TabTitle isFocus={focused}>{route.title}</TabTitle>;
  };

  // Search
  const onChangeSearchText = useCallback((text: string) => {
    setSearchText(text);
  }, []);

  // Creation
  const onPressPlusButton = () => {
    if (families.length > 0) {
      // Chore
      if (index === 0) {
        navigate(ScreenName.CreateChoreScreen, {familyId: families[0]});
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
        onChangeText={onChangeSearchText}
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
