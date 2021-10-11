import {Box} from 'native-base';
import i18n from '@locales/index';
import fonts from '@themes/fonts';
import colors from '@themes/colors';
import {Animated, StyleSheet} from 'react-native';
import ChoresScreen from '@screens/chores';
import EventsScreen from '@screens/events';
import styled from 'styled-components/native';
import {Constants} from '@constants/Constants';
import React, {useCallback, useState} from 'react';
import PrimaryHeader, {headerHeight} from '@components/PrimaryHeader';
import {SceneMap, TabView, TabBar} from 'react-native-tab-view';
import FocusAwareStatusBar from '@components/FocusAwareStatusBar';

interface Props {}

const HomeScreen: React.FC<Props> = () => {
  const scrollY = new Animated.Value(0);
  const [searchText, setSearchText] = useState('');
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'chores', title: i18n.t('chores.chores')},
    {key: 'events', title: i18n.t('events.events')},
  ]);

  const renderScene = SceneMap({
    chores: () => (
      <ChoresScreen
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {
            useNativeDriver: false,
          },
        )}
      />
    ),
    events: () => <EventsScreen />,
  });

  const renderTabLabel = ({route, focused}: {route: any; focused: boolean}) => {
    return <TabTitle isFocus={focused}>{route.title}</TabTitle>;
  };

  const onChangeSearchText = useCallback((text: string) => {
    setSearchText(text);
  }, []);

  return (
    <Box flex={1} safeArea pt={2} bgColor={colors.WHITE}>
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
        translucent
      />
      <PrimaryHeader scrollY={scrollY} onChangeText={onChangeSearchText} />
      <TabView
        renderTabBar={props => (
          <TabBar
            {...props}
            pressOpacity={1}
            pressColor={'transparent'}
            style={{
              marginTop: headerHeight - 6,
              backgroundColor: colors.WHITE,
            }}
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
  color: ${colors.THEME_COLOR_9};
  opacity: ${props => (props.isFocus ? 1 : 0.5)};
`;

const styles = StyleSheet.create({
  indicator: {height: 4, backgroundColor: colors.THEME_COLOR_4},
});

export default HomeScreen;
