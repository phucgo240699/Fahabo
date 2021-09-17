import {Box} from 'native-base';
import i18n from '@locales/index';
import colors from '@themes/colors';
import React, {useState} from 'react';
import ChoresScreen from '@screens/chores';
import EventsScreen from '@screens/events';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';
import {SceneMap, TabView, TabBar} from 'react-native-tab-view';
import styled from 'styled-components/native';
import {StyleSheet} from 'react-native';
import {Constants} from '@constants/Constants';
import fonts from '@themes/fonts';

interface Props {}

const HomeScreen: React.FC<Props> = () => {
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

  return (
    <Box flex={1} safeArea pt={4} bgColor={colors.WHITE}>
      {/* Status Bar */}
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
        translucent
      />
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

const TabTitle = styled(fonts.PrimaryFontRegularSize14)<{isFocus?: boolean}>`
  text-align: center;
  align-items: center;
  justify-content: center;
  padding: 15px 8px 8px 8px;
  color: ${colors.THEME_COLOR_9};
  opacity: ${props => (props.isFocus ? 1 : 0.6)};
`;

const styles = StyleSheet.create({
  tabbar: {
    backgroundColor: colors.WHITE,
  },
  indicator: {height: 4, backgroundColor: colors.THEME_COLOR_4},
});

export default HomeScreen;
