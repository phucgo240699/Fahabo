import i18n from '@locales/index';
import fonts from '@themes/fonts';
import colors from '@themes/colors';
import {Box, Text} from 'native-base';
import {StyleSheet} from 'react-native';
import ChoresScreen from '@screens/chores';
import EventsScreen from '@screens/events';
import styled from 'styled-components/native';
import {Constants} from '@constants/Constants';
import React, {useCallback, useState} from 'react';
import PrimarySearchBar from '@components/PrimarySearchBar';
import {SceneMap, TabView, TabBar} from 'react-native-tab-view';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';

interface Props {}

const HomeScreen: React.FC<Props> = () => {
  const [searchText, setSearchText] = useState('');
  const [index, setIndex] = useState(0);
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

  const onChangeSearchText = useCallback((text: string) => {
    setSearchText(text);
  }, []);

  return (
    <Box flex={1} safeArea pt={4} bgColor={colors.WHITE}>
      {/* Status Bar */}
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
        translucent
      />

      <PrimarySearchBar onChangeText={onChangeSearchText} />

      <TabView
        renderTabBar={props => (
          <TabBar
            {...props}
            pressOpacity={1}
            pressColor={'transparent'}
            style={styles.tabbar}
            indicatorStyle={styles.indicator}
            renderLabel={renderTabLabel}
          />
        )}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: Constants.MAX_WIDTH}}
      />
    </Box>
  );
};

const TabTitle = styled(fonts.PrimaryFontMediumSize14)<{isFocus?: boolean}>`
  text-align: center;
  align-items: center;
  justify-content: center;
  padding: 15px 8px 8px 8px;
  color: ${colors.THEME_COLOR_9};
  opacity: ${props => (props.isFocus ? 1 : 0.5)};
`;

const styles = StyleSheet.create({
  tabbar: {
    backgroundColor: colors.WHITE,
  },
  indicator: {height: 4, backgroundColor: colors.THEME_COLOR_4},
});

export default HomeScreen;
