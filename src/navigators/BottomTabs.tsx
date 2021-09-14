import React from 'react';
import i18n from '@locales/index';
import Colors from '@themes/colors';
import styled from 'styled-components/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import ProfileStack from './ProfileStack';
import {navigationOptions} from './index';
import {StackName} from '@constants/Constants';
import PrimaryIcon from '@components/PrimaryIcon';
import colors from '@themes/colors';

const TabbarTitle = styled.Text`
  font-family: ArialRoundedMTBold;
  font-size: 12px;
`;

const Tab = createBottomTabNavigator();

const homeIconSource = require('@assets/images/home_icon.png');
const selectedHomeIconSource = require('@assets/images/selected_home_icon.png');
const profileIconSource = require('@assets/images/profile_icon.png');
const selectedProfileIconSource = require('@assets/images/selected_profile_icon.png');

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, size}) => {
          let iconSource = homeIconSource;
          switch (route.name) {
            case StackName.HomeStack:
              iconSource = focused ? selectedHomeIconSource : homeIconSource;
              break;
            case StackName.ProfileStack:
              iconSource = focused
                ? selectedProfileIconSource
                : profileIconSource;
              break;
            default:
              break;
          }
          return (
            <PrimaryIcon
              width={size}
              height={size}
              tintColor={colors.THEME_COLOR_5}
              source={iconSource}
            />
          );
        },
        tabBarLabel: () => <></>,
        // tabBarLabel: ({focused}) => {
        //   let title = '';
        //   switch (route.name) {
        //     case StackName.HomeStack:
        //       title = i18n.t('home.home');
        //       break;
        //     case StackName.ProfileStack:
        //       title = i18n.t('profile.profile');
        //       break;
        //   }
        //   return (
        //     <TabbarTitle
        //       style={{
        //         color: focused ? Colors.TORY_BLUE : Colors.BLACK,
        //       }}>
        //       {title}
        //     </TabbarTitle>
        //   );
        // },
      })}>
      <Tab.Screen
        name={StackName.HomeStack}
        component={HomeStack}
        options={navigationOptions}
      />
      <Tab.Screen
        name={StackName.ProfileStack}
        component={ProfileStack}
        options={navigationOptions}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
